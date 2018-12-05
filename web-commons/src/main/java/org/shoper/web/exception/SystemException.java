package org.shoper.web.exception;

import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.Properties;

/**
 * Created by ShawnShoper on 2017/3/9.
 */
public class SystemException extends Exception {
    private int code;
    static Properties properties = new Properties();
    static {
        try {
            ClassPathResource resource = new ClassPathResource("exceptions.properties");
            properties.load(resource.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public SystemException(int code, String message) {
        super(message);
        this.code = code;
    }

    public SystemException(int code) {
        super( properties.getProperty(String.valueOf(code)));
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
