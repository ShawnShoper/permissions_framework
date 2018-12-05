package org.shoper.web.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class User implements java.io.Serializable {
    private Integer id;
    private String name; //用户名
    private String email;//用户邮箱
    private String userName;//名称
    @JsonIgnore
    private String password;//用户密码
    private int enabled;//用户是否启用
    private Date createTime;//时间
    private int errCount;//登录错误次数
    @JsonInclude(value = JsonInclude.Include.NON_EMPTY)
    private Set<Role> roles = null;// 所对应的角色集合

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public int getErrCount() {
        return errCount;
    }

    public void setErrCount(int errCount) {
        this.errCount = errCount;
    }

    public User() {
    }

    public User(String name, String email, String userName, String password, int enabled, Date dob, int errCount) {
        this.name = name;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.enabled = enabled;
        this.createTime = dob;
        this.errCount = errCount;
    }

    public User(String name, String email, String password, Date dob, Set<Role> roles) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createTime = dob;
        this.roles = roles;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Set<Role> getRoles() {
        return this.roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}  