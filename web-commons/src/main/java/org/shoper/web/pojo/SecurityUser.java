package org.shoper.web.pojo;

import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class SecurityUser extends User implements UserDetails, CredentialsContainer {
    private static final long serialVersionUID = 1L;
    private  List<Resource> res;

    public  List<Resource> getRes() {
        return res;
    }

    public SecurityUser(User user, List<Resource> res) {
        if (user != null) {
            this.setId(user.getId());
            this.setName(user.getName());
            this.setUserName(user.getUserName());
            this.setEmail(user.getEmail());
            this.setPassword(user.getPassword());
            this.setCreateTime(user.getCreateTime());
            this.setRoles(user.getRoles());
            this.res = res;
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        Set<Role> userRoles = this.getRoles();
        if (userRoles != null) {
            for (Role role : userRoles) {
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.getCode());
                authorities.add(authority);
            }
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return super.getPassword();
    }

    @Override
    public String getUsername() {
        return super.getName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public void eraseCredentials() {

    }
}