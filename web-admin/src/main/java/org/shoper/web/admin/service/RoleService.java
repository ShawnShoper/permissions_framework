package org.shoper.web.admin.service;

import org.shoper.commons.core.NumberUtil;
import org.shoper.commons.core.StringUtil;
import org.shoper.web.exception.SystemException;
import org.shoper.web.mapper.RoleMapper;
import org.shoper.web.pojo.Role;
import org.shoper.web.security.filter.CustomInvocationSecurityMetadataSourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by ShawnShoper on 2017/3/15.
 */
@Service
public class RoleService {
    @Autowired
    RoleMapper roleMapper;
    @Autowired
    ResourceService resourceService;
    //    ResourceMapper resourceMapper;
    @Autowired
    CustomInvocationSecurityMetadataSourceService customInvocationSecurityMetadataSourceService;

    public boolean isExists(Integer roleId) {
        return roleMapper.isExists(roleId) > 0 ? true : false;
    }

    public List<Role> findAll() {
        return roleMapper.findAll();
    }

    public Set<Integer> getRoleIdByUserName(String userName) {
        return roleMapper.getRoleIdByUserName(userName);
    }

    public Integer unbindRoleById(Integer id) {
        return roleMapper.unbindRoleById(id);
    }

    public Role getRoleByCode(String code) throws SystemException {
        if (Objects.isNull(code)) throw new SystemException(302);
        Role role = roleMapper.getRoleByCode(code);
        if (Objects.isNull(role))
            throw new SystemException(302);
        return role;
    }

    public Role getRoleById(String id) throws SystemException {
        Integer rid = NumberUtil.parseNumber(id);
        if (Objects.isNull(rid)) throw new SystemException(302);
        Role role = roleMapper.getRoleById(rid);
        if (Objects.isNull(role))
            throw new SystemException(302);
        return role;
    }

    @Transactional(rollbackFor = Exception.class)
    public void modifyRole(String code, String name, String[] privileges) throws SystemException {
        //check role是否存在
        Role role = getRoleByCode(code);
        if (Objects.isNull(role))
            throw new SystemException(302);
        //更新role 基本信息
        if (roleMapper.modifyRole(role.getId(), name) != 1)
            throw new SystemException(306);
        //获取role之前的权限
        Set<Integer> oResources = resourceService.findResourceIdByRoleId(role.getId());
        Integer[] resourcesId = NumberUtil.parseNumber(privileges);
        List<Integer> collect = Arrays.stream(resourcesId).collect(Collectors.toList());
        //筛选做修改的权限表进行CRUD
        //获取新增的角色
        Set<Integer> diff_in = collect.stream().filter(i -> !oResources.contains(i)).collect(Collectors.toSet());
        //获取删除的角色
        Set<Integer> diff_out = oResources.stream().filter(i -> !collect.contains(i)).collect(Collectors.toSet());
        //新增用户新增的权限
        {
            long count = diff_in.stream().map(i -> roleMapper.bindPrivilege(role.getId(), i)).filter(r -> r == 1).count();
            if (diff_in.size() != count)
                throw new SystemException(303);
        }
        {
            //删除用户新增的权限
            long count = diff_out.stream().map(i -> roleMapper.unbindPrivilegeByResId(role.getId(), i)).filter(r -> r == 1).count();
            if (diff_out.size() != count)
                throw new SystemException(303);
        }
        customInvocationSecurityMetadataSourceService.loadResourceDefine();
    }

    @Transactional(rollbackFor = Exception.class)
    public void delRole(String ids) throws SystemException {
        String[] split = ids.split("-");
        Integer[] rid = NumberUtil.parseNumber(split);
        if (Objects.isNull(rid))
            throw new SystemException(302);
        for (Integer id : rid) {
            //检查id是否有用户绑定
            if(roleMapper.checkUserBind(id)>0)throw new SystemException(309);
            //接触资源绑定
            if (roleMapper.unbindPrivilege(id) == 0) throw new SystemException(307);
            //删除角色
            if (roleMapper.delRole(id) != 1) throw new SystemException(308);
        }
        customInvocationSecurityMetadataSourceService.loadResourceDefine();
    }

    public int getRoleSize() {
        return roleMapper.getRoleSize();
    }

    public List<Map<String, Object>> getRoles(Integer page, Integer limit) throws SystemException {
        if (Objects.isNull(page) || Objects.isNull(limit) || page < 1 || limit < 1)
            throw new SystemException(103);
        List<Map<String, Object>> roles = roleMapper.getRoles((page - 1) * limit, limit);
        for (Map<String, Object> role : roles) {
            Integer id = (Integer) role.get("id");
            Set<Integer> resIds = resourceService.findResourceIdByRoleId(id);
            role.put("permissions", resIds);
        }
        return roles;
    }

    @Transactional(rollbackFor = Exception.class)
    public void addRole(String name, String code, String[] permissions) throws SystemException {
        if (StringUtil.isAnyEmpty(name, code))
            throw new SystemException(104);
        List<Integer> rids = Arrays.stream(permissions).filter(NumberUtil::isNumber).map(NumberUtil::parseNumber).collect(Collectors.toList());
        for (Integer pid : rids)
            if (!resourceService.isExists(pid))
                throw new SystemException(304);
        Role pojo = new Role(name, code);
        if (roleMapper.addRole(pojo) != 1)
            throw new SystemException(305);
        for (Integer pid : rids)
            roleMapper.bindPrivilege(pojo.getId(), pid);
        customInvocationSecurityMetadataSourceService.loadResourceDefine();
    }
}
