package org.shoper.web.admin.web;

import org.shoper.commons.responseentity.BaseResponse;
import org.shoper.commons.responseentity.ResponseBuilder;
import org.shoper.web.admin.service.UserService;
import org.shoper.web.exception.SystemException;
import org.shoper.web.pojo.SecurityUser;
import org.shoper.web.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by ShawnShoper on 2017/3/1.
 */
@RestController
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    private AuthenticationManager myAuthenticationManager;

    @GetMapping("/me")
    public User me(@AuthenticationPrincipal User user) {
        return user;
    }


    @PostMapping(value = "/user/login", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse login(String username, String password, String token, String captcha, HttpServletRequest request) {
        String remoteAddr = request.getRemoteAddr();
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            userService.checkValidateCode(captcha, token, remoteAddr);
        } catch (SystemException e) {
            return custom.failed(e.getLocalizedMessage(), e.getCode()).build();
        }
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
        try {
            Authentication authentication = myAuthenticationManager.authenticate(authRequest); //调用loadUserByUsername
            SecurityContextHolder.getContext().setAuthentication(authentication);
            HttpSession session = request.getSession();
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext()); // 这个非常重要，否则验证后将无法登陆
            SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            session.setAttribute("USER_TAG", securityUser);
        } catch (AuthenticationException e) {
            custom.failed("用户名密码错误", 103);
        }

        return custom.build();
    }

    /**
     * 获取用户列表
     *
     * @param page
     * @param limit
     * @return
     */
    @GetMapping(value = "/user_mgr/user", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse getUsers(Integer page, Integer limit) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            List<User> users = userService.getUsers(page, limit);
            int total = userService.getUserSize();
            custom.data(users).currPage(page).pageSize(limit).totalCount(total);
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }

    /**
     * 获取用户列表
     *
     * @return
     */
    @GetMapping(value = "/user_mgr/user/{username}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse getUser(@PathVariable("username") String userName) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            User user = userService.getUsers(userName);
            custom.data(user);
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }

    /**
     * 新增用户根据ID
     *
     * @return shawn
     * shoper
     */
    @PostMapping(value = "/user_mgr/user", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse addUser(String username, String[] roles, String email, String name) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            userService.addUser(username, name, email, roles);
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }

    /**
     * 更新用户根据ID
     *
     * @return
     */
    @PutMapping("/user_mgr/user/{userName}")
    public BaseResponse modifyUser(@PathVariable("userName") String userName, String[] roles, String email, String name) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            userService.modifyUser(userName, name, email, roles);
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }

    /**
     * 删除用户根据username
     *
     * @return
     */
    @DeleteMapping("/user_mgr/user/{ids}")
    public BaseResponse removeUser(@PathVariable("ids") String ids) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            userService.remove(ids);
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }

    @GetMapping(value = "/user/resources", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse getResource(String menu) {
        ResponseBuilder custom = ResponseBuilder.custom();
        try {
            custom.data(userService.getResource(menu));
        } catch (SystemException e) {
            custom.failed(e.getMessage(), e.getCode());
        }
        return custom.build();
    }

    @GetMapping(value = "/user/menu", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public BaseResponse getMenu() {
        ResponseBuilder custom = ResponseBuilder.custom();
        custom.data(userService.getMenu());
        return custom.build();
    }
}
