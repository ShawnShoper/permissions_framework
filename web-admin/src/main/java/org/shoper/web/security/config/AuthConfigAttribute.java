package org.shoper.web.security.config;

import org.springframework.security.access.SecurityConfig;

/**
 * Created by ShawnShoper on 2017/3/28.
 */
public class AuthConfigAttribute extends SecurityConfig {
    private String method;
    public AuthConfigAttribute(String config,String method) {
        super(config);
        this.method = method;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }
}
