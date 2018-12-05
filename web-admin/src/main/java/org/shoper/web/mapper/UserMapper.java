package org.shoper.web.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.shoper.web.pojo.Resource;
import org.shoper.web.pojo.Role;
import org.shoper.web.pojo.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Created by Administrator on 2017/1/24 0024.
 */
@Mapper
public interface UserMapper {
    User getUserByUserName(@Param("username") String username);

    Set<Role> findRoleByUserId(@Param("id")Integer id);

    List<User> getUsers(@Param("offset") Integer offset, @Param("limit") Integer limit);

    int getUserSize();

    int addUser(User user);

    Integer bindRoles(@Param("uid") Integer uid, @Param("rid") Integer rid);

    Integer modifyUserById(@Param("id") Integer id, @Param("name") String name, @Param("email") String email);


    Integer remove(@Param("id")Integer id);

    User getUserById(@Param("id")Integer id);

    Integer unbindRoles(@Param("uid") Integer uid, @Param("rid")Integer rid);

}
