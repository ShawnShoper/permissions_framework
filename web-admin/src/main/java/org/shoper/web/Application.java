package org.shoper.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.io.IOException;

/**
 * Created by ShawnShoper on 2017/3/1.
 */
@EnableTransactionManagement
@EnableRedisHttpSession
@EnableAuthorizationServer
@SpringBootApplication
public class Application {
    public static void main(String[] args) throws IOException {
        SpringApplication.run(Application.class,args);
    }
}
