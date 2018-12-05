package org.shoper.web.admin.web;

import org.shoper.commons.responseentity.BaseResponse;
import org.shoper.commons.responseentity.ResponseBuilder;
import org.shoper.web.admin.service.RoleService;
import org.shoper.web.exception.SystemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * Created by ShawnShoper on 2017/3/15.
 */
@RestController
public class RoleController {
    @Autowired
    RoleService roleService;

    @PostMapping(value = "/role", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse addRole(String name, String code, String[] permissions) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            roleService.addRole(name, code, permissions);
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }

    @PostMapping(value = "/roles", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse getAllRoles() {
        return ResponseBuilder.custom().data(roleService.findAll()).build();
    }

    /**
     * 列表数据
     * @param page
     * @param limit
     * @return
     */
    @GetMapping(value = "/getRoles", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse getRoles(Integer page, Integer limit) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            custom.data(roleService.getRoles(page, limit)).pageSize(limit).currPage(page).totalCount(roleService.getRoleSize()).build();
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }

    @GetMapping(value = "/role/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse getRole(@PathVariable("id") String id) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            custom.data(roleService.getRoleById(id));
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }

    @PutMapping(value = "/role/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse modifyRole(@PathVariable("id") String code, String name, String[] permissions) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            roleService.modifyRole(code, name, permissions);
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }

    @DeleteMapping(value = "/role/{ids}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse delRole(@PathVariable("ids")  String id) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            roleService.delRole(id);
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }
}
