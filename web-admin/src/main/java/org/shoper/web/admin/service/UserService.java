package org.shoper.web.admin.service;

import org.shoper.commons.core.NumberUtil;
import org.shoper.commons.core.StringUtil;
import org.shoper.web.consts.CaptchaConst;
import org.shoper.web.exception.SystemException;
import org.shoper.web.mapper.ResourceMapper;
import org.shoper.web.mapper.UserMapper;
import org.shoper.web.pojo.Resource;
import org.shoper.web.pojo.ResourceType;
import org.shoper.web.pojo.SecurityUser;
import org.shoper.web.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by ShawnShoper on 2017/3/9.
 */
@Service
public class UserService {
    @Autowired
    RedisTemplate<String, String> redisTemplate;
    @Autowired
    UserMapper userMapper;
    @Autowired
    RoleService roleService;
    @Autowired
    ResourceMapper resourceMapper;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public void checkValidateCode(String captcha, String token, String remoteAddr) throws SystemException {
        String key = CaptchaConst.CAPTCHA_VALUE + ":" + remoteAddr + ":" + token;
        String captcha_value = redisTemplate.opsForValue().get(key);
        redisTemplate.delete(key);
        if (StringUtil.isEmpty(captcha_value))
            throw new SystemException(101);
        if (!captcha_value.equalsIgnoreCase(captcha))
            throw new SystemException(102);

    }

    public List<User> getUsers(Integer page, Integer limit) throws SystemException {
        if (Objects.isNull(page) || Objects.isNull(limit) || page < 1 || limit < 1)
            throw new SystemException(103);
        return userMapper.getUsers((page - 1) * limit, limit);
    }

    public int getUserSize() {
        return userMapper.getUserSize();
    }

    @Transactional(rollbackFor = SystemException.class)
    public void addUser(String username, String name, String email, String[] roles) throws SystemException {
        User ouser = userMapper.getUserByUserName(username);
        if (Objects.nonNull(ouser))
            throw new SystemException(201);
        User user = new User(name, email, username, bCryptPasswordEncoder.encode("123456"), 0, new Date(), 0);
        Set<Integer> rids = Arrays.stream(roles).filter(NumberUtil::isNumber).map(NumberUtil::parseNumber).collect(Collectors.toSet());
        //检查role是否存在
        if (Objects.isNull(roles) || rids.stream().filter(Objects::nonNull).filter(roleService::isExists).count() != roles.length)
            throw new SystemException(202);
        userMapper.addUser(user);
        //检查是否全部保存成功...
        long count = rids.stream().map(role -> userMapper.bindRoles(user.getId(), role)).filter(r -> r == 1).count();
        if (roles.length != count)
            throw new SystemException(202);
    }

    /**
     * 修改用户资料以及权限
     *
     * @param userName
     * @param name
     * @param email
     * @param roles
     * @throws SystemException
     */
    @Transactional(rollbackFor = SystemException.class)
    public void modifyUser(String userName, String name, String email, String[] roles) throws SystemException {
        //检查传过来的权限列表是否符合
        //检查用户是否存在
        User user = userMapper.getUserByUserName(userName);
        if (Objects.isNull(user))
            throw new SystemException(203);
        Set<Integer> roleIds = Arrays.stream(roles).filter(NumberUtil::isNumber).map(NumberUtil::parseNumber).collect(Collectors.toSet());
        //检查选择权限是否存在,与传入进来的roles作比较，因为null不能存在set里，如果与roleids做比较就会出统计问题
        if (Objects.isNull(roles) || roleIds.stream().filter(Objects::nonNull).filter(roleService::isExists).count() != roles.length)
            throw new SystemException(202);
        //检测是否保存成功
        if (userMapper.modifyUserById(user.getId(), name, email) != 1)
            throw new SystemException(204);
        //获取该用户的权限列表
        Set<Integer> oroleIds = roleService.getRoleIdByUserName(userName);
        //获取新增的角色
        Set<Integer> diff_in = roleIds.stream().filter(id -> !oroleIds.contains(id)).collect(Collectors.toSet());
        //获取删除的角色
        Set<Integer> diff_out = oroleIds.stream().filter(id -> !roleIds.contains(id)).collect(Collectors.toSet());
        //新增用户新增的权限
        {
            long count = diff_in.stream().map(rid -> userMapper.bindRoles(user.getId(), rid)).filter(r -> r == 1).count();
            if (diff_in.size() != count)
                throw new SystemException(202);
        }
        {
            //删除用户新增的权限
            long count = diff_out.stream().map(rid -> userMapper.unbindRoles(user.getId(), rid)).filter(r -> r == 1).count();
            if (diff_out.size() != count)
                throw new SystemException(202);
        }
    }

    /**
     * 获取用户信息包含权限
     *
     * @param userName
     * @return
     * @throws SystemException
     */
    public User getUsers(String userName) throws SystemException {
        if (Objects.isNull(userName))
            throw new SystemException(203);
        User user = userMapper.getUserByUserName(userName);
        if (Objects.isNull(user))
            throw new SystemException(203);
        user.setRoles(userMapper.findRoleByUserId(user.getId()));
        return user;
    }

    /**
     * 删除用户,根据username
     *
     * @param ids
     */
    @Transactional(rollbackFor = SystemException.class)
    public void remove(String ids) throws SystemException {
        String[] split = ids.split("-");
        //检查该用户是否存在
        Set<Integer> roleIds = Arrays.stream(split).filter(NumberUtil::isNumber).map(NumberUtil::parseNumber).collect(Collectors.toSet());
        //检查用户是否存在,ids，因为null不能存在set里

        if (Objects.isNull(ids) || roleIds.stream().filter(Objects::nonNull).map(userMapper::getUserById).filter(Objects::nonNull).count() != split.length)
            throw new SystemException(202);
        System.out.println(roleIds.stream()
                .map(u -> {
                    roleService.unbindRoleById(u);
                    return u;
                }).map(userMapper::remove).count());
    }

    public List<String> getResource(String menu) throws SystemException {
        List<String> resources = new ArrayList<>();
        SecurityUser principal = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Resource> res = principal.getRes();
        if (Objects.nonNull(menu)) {
            Optional<Resource> first = res.stream().filter(e -> menu.equals(e.getCode())).findFirst();
            if (first.isPresent()) {
                Resource pres = first.get();
                resources = res.stream().filter(e -> ResourceType.OPERATION == e.getType()).filter(e -> e.getPid() == pres.getId()).map(Resource::getCode).collect(Collectors.toList());
            }
        } else {
            resources = res.stream().filter(e -> ResourceType.MENU == e.getType()).map(Resource::getCode).collect(Collectors.toList());
        }
        return resources;
    }

    public List<String> getMenu() {
        SecurityUser principal = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getRes().stream().filter(e -> e.getType() == ResourceType.MENU).map(Resource::getCode).collect(Collectors.toList());
    }
}
