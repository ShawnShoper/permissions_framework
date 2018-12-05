package org.shoper.web.admin.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.dialect.IDialect;
import org.thymeleaf.extras.springsecurity4.dialect.SpringSecurityDialect;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by ShawnShoper on 2017/3/12.
 */
@Configuration
public class ThymeleafConfig {
    @Autowired
    TemplateEngine templateEngine;

    @Bean
    public TemplateEngine getSpringTemplateEngine(SpringSecurityDialect springSecurityDialect) {
        Set<IDialect> dialectSet = new HashSet<>();
        dialectSet.add(springSecurityDialect);
        templateEngine.setAdditionalDialects(dialectSet);
        return templateEngine;
    }

    @Bean
    public SpringSecurityDialect springSecurityDialect() {
        return new SpringSecurityDialect();
    }
}
