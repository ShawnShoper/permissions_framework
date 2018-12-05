package org.shoper.web.admin.service;

import org.shoper.web.exception.SystemException;
import org.shoper.web.mapper.ResourceMapper;
import org.shoper.web.mapper.UserMapper;
import org.shoper.web.pojo.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by ShawnShoper on 2017/3/10.
 */
@Service
public class ResourceService {
    @Autowired
    ResourceMapper resourceMapper;

    public List<Resource> getResource(Integer page, Integer limit) throws SystemException {
        if (Objects.isNull(page) || Objects.isNull(limit) || page < 1 || limit < 1)
            throw new SystemException(500, "分页参数不合法.");
        return resourceMapper.findByPage((page - 1) * limit, limit);
    }


    public int getResourceSize() throws SystemException {
        return resourceMapper.getResourceSize();
    }

    public Set<Integer> findResourceIdByRoleId(Integer rid) throws SystemException {
        if (Objects.isNull(rid))
            throw new SystemException(302);
        return resourceMapper.findResourceIdByRoleId(rid);
    }

    public boolean isExists(Integer pid) {
        return resourceMapper.isExists(pid) > 0 ? true : false;
    }

    public List<Map<String, Object>> getResourceTree() {
        List<Map<String, Object>> resourceTree = resourceMapper.findAll();
        List<Map<String, Object>> collect = resourceTree.stream().map(rt -> {
                    rt.put("pId", rt.get("pid"));
                    return rt;
                }
        ).map(rt -> {
            int id = Integer.valueOf(String.valueOf(rt.get("id")));
            for (Map<String, Object> value : resourceTree) {
                if (Integer.valueOf(String.valueOf(value.get("pid"))) == id) {
                    rt.put("isParent", true);
                    break;
                }
                rt.put("isParent", false);
            }
            return rt;
        }).collect(Collectors.toList());
        return collect;
    }
}
