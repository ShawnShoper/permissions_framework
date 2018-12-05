package org.shoper.web.security.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.approval.JdbcApprovalStore;
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.redis.RedisTokenStore;

import javax.sql.DataSource;

@Configuration
public class AuthorizationServerConfigruation extends AuthorizationServerConfigurerAdapter {


    @Autowired
    private TokenStore tokenStore;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcApprovalStore jdbcApprovalStore;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints)
            throws Exception {
        // @formatter:off
        endpoints
                .tokenStore(this.tokenStore)
                .authenticationManager(authenticationManager)
                .approvalStore(jdbcApprovalStore);

        // @formatter:on
    }


    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.jdbc(dataSource);
    }


    @Bean
    public JdbcApprovalStore jdbcApprovalStore() {
        return new JdbcApprovalStore(dataSource);
    }


    @Bean
    @Primary
    public DefaultTokenServices tokenServices() {
        DefaultTokenServices tokenServices = new DefaultTokenServices();
        tokenServices.setSupportRefreshToken(true);
        tokenServices.setTokenStore(this.tokenStore);
        //token有效期 30天
//        tokenServices.setAccessTokenValiditySeconds(30 * 24 * 60 * 60);
        return tokenServices;
    }


    @Bean
    public ClientDetailsService jdbcClientDetailsService(DataSource dataSource) {
        return new JdbcClientDetailsService(dataSource);
    }

    @Bean
    public TokenStore tokenStore(RedisConnectionFactory redisConnectionFactory) {
        return new RedisTokenStore(redisConnectionFactory);
    }
}
