package org.shoper.web.security.filter;

import org.shoper.web.mapper.ResourceMapper;
import org.shoper.web.mapper.UserMapper;
import org.shoper.web.pojo.Resource;
import org.shoper.web.pojo.Role;
import org.shoper.web.pojo.SecurityUser;
import org.shoper.web.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FilenameFilter;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired  //业务服务类
    private UserMapper userService;
    @Autowired
    private ResourceMapper resourceMapper;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        //SysUser对应数据库中的用户表，是最终存储用户和密码的表，可自定义
        //本例使用SysUser中的name作为用户名:
        User user = userService.getUserByUserName(userName);
        if (Objects.isNull(user))
            throw new UsernameNotFoundException("UserName " + userName + " not found");
        // SecurityUser实现UserDetails并将SysUser的name映射为username
        //把用户全选读出来
        user.setRoles(userService.findRoleByUserId(user.getId()));
        //把用户资源表读出来...
        List<Resource> resources = new ArrayList<>();
        for (Role role : user.getRoles())
            resources.addAll(resourceMapper.findByRoleId(role.getId()));
//        List<String> codeSet = resources.stream().map(Resource::getCode).collect(toList());

        //获取所有资源
//        Set<Resource> resource = resourceMapper.getResource();
//        List<String> collect1 = resource.stream().map(Resource::getCode).collect(toList());
//        Map<String, Integer> map = new HashMap<>();
//        for (Resource res : resource) {
//            map.put(res.getCode(), 0);
//        }
//        map.keySet().stream().filter(codeSet::contains).forEach(e -> map.put(e, 1));
//       //按照resourcesType分组
//       Map<ResourceType, List<Resource>> collect = resources.stream().collect(groupingBy(Resource::getType));
        //.distinct().collect(Collectors.groupingBy(Resource::getResourceType));
        SecurityUser seu = new SecurityUser(user, resources);
        return seu;
    }
}