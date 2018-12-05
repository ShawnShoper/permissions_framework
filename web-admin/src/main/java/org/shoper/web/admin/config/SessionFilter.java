package org.shoper.web.admin.config;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.filter.GenericFilterBean;

import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

//@Component
public class SessionFilter extends GenericFilterBean {
    @Resource(name = "objectRedis")
    RedisTemplate redisTemplate;
    final String SESSION = "SESSION";
    final String SPRING_SESSION = "spring:session:sessions:";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        Cookie[] cookies = ((HttpServletRequest) request).getCookies();
        Optional<Cookie> first = Arrays.stream(cookies).filter(c -> c.getName().equals(SESSION)).findFirst();
        if (first.isPresent()) {
            //当前用户的sessionId
            String sessionId = first.get().getValue();
        //TODO
            SecurityContext boundHashOperations = (SecurityContext) redisTemplate.opsForHash().get("spring:session:sessions:1bd67e71-1872-4598-b395-c0fac3db8714", "sessionAttr:SPRING_SECURITY_CONTEXT");
            System.out.println(boundHashOperations);
        }
        chain.doFilter(request, response);
    }
}