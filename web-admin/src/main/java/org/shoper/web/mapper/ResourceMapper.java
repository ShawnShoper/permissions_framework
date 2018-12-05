package org.shoper.web.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.shoper.web.pojo.Resource;
import org.shoper.web.pojo.Role;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by Administrator on 2017/2/9 0009.
 */
@Mapper
public interface ResourceMapper {
    List<Resource> findByRoleName(String roleName);
    List<Resource> findByPage(@Param("offset") int offset, @Param("limit")int limit);
    int getResourceSize();
    Set<Resource> findByRoleId(Integer rid);
    Set<Resource> getResource();
    Set<Integer> findResourceIdByRoleId(Integer rid);

    Integer isExists(Integer pid);

    List<Map<String,Object>> findAll();
}
