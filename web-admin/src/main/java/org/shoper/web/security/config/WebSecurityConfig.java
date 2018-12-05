package org.shoper.web.security.config;

import org.shoper.web.security.filter.CustomUserDetailsService;
import org.shoper.web.security.filter.MySecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Autowired
    private MySecurityFilter mySecurityFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .addFilterBefore(mySecurityFilter, FilterSecurityInterceptor.class)
                .headers().frameOptions().sameOrigin().and()
                .authorizeRequests()
                .antMatchers("/captcha/**", "/user/login", "/css/**", "/images/**", "/js/**", "/laydate/**", "/layer/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .permitAll()
                .successHandler(loginSuccessHandler())//code3
                .and()
                .logout().invalidateHttpSession(true).logoutUrl("/logout")
                .logoutSuccessHandler(logoutSuccessHandler())
                .logoutSuccessUrl("/login")
                .and()
                .rememberMe()
                .tokenValiditySeconds(1209600)
                .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
    }

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
//                .inMemoryAuthentication()
//                .withUser("user").password("password").roles("USER");
        auth.eraseCredentials(false);
    }

    public static void main(String[] args) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(4);
        System.out.println(bCryptPasswordEncoder.encode("123456"));
        //$2a$04$cplzOCrvR4rtsdIxpEiJ6OQ8sFm5WPZD2G8t.5UXWp325/Khqc5ry
        //$2a$04$tayDEgjitXcNdwgBM9wyi.lG2JATLw/FiDE/FtH7KBh3YYkD5V2mG
        System.out.println(bCryptPasswordEncoder.matches("123456", "$2a$04$d0TMBPNSPkHQiu7d0RpHJuUssz.G.MNF2ZvkYwhKbg2ksxLwvte6m"));
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder(4);
    }

    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler();
    }

    @Bean
    LogoutSuccessHandler logoutSuccessHandler() {
        return new LogoutSuccessHandler();
    }
}