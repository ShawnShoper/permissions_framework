package org.shoper.web.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.shoper.web.pojo.Role;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by ShawnShoper on 2017/2/9 0009.
 */
@Mapper
public interface RoleMapper {
    List<Role> findAll();

    Integer isExists(Integer roleId);

    Set<Integer> getRoleIdByUserName(String userName);

    Integer unbindRoleById(Integer id);

    Role getRoleById(Integer id);

    Integer modifyRole(Integer id, String name);

    Integer bindPrivilege(Integer rid, Integer resId);

    Integer unbindPrivilegeByResId(Integer rid, Integer resId);

    Integer unbindPrivilege(Integer id);

    Integer delRole(Integer rid);

    int getRoleSize();

    List<Map<String,Object>> getRoles(@Param("offset") Integer offset, @Param("limit") Integer limit);

    Integer addRole(Role role);

    Role getRoleByCode(String code);

    Integer checkUserBind(Integer id);
}
