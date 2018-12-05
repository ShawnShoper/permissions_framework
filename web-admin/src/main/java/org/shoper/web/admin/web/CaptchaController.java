package org.shoper.web.admin.web;

import org.shoper.commons.captcha.CaptchaBufferImage;
import org.shoper.commons.captcha.exception.CaptchaException;
import org.shoper.web.consts.CaptchaConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * Created by ShawnShoper on 2017/3/2.
 */
@Controller
public class CaptchaController {
    @Autowired
    CaptchaBufferImage captchaBufferImage;
    @Autowired
    RedisTemplate<String, String> redisTemplate;

    @RequestMapping(value = "/captcha")
    public ResponseEntity<byte[]> getCaptcha(String random, HttpServletRequest request) throws IOException, CaptchaException {
        String key = CaptchaConst.CAPTCHA_VALUE + ":" + request.getRemoteAddr() + ":" + random;
        ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();
        CaptchaBufferImage captchaBufferImage = this.captchaBufferImage.generateCaptcha();
        BufferedImage bufferedImage = captchaBufferImage.getBufferedImage();
        redisTemplate.opsForValue().set(key, captchaBufferImage.getCode(), 120, TimeUnit.SECONDS);
        ImageIO.write(bufferedImage, "png", jpegOutputStream);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", "captcha.png");
        headers.setContentLength(jpegOutputStream.size());
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<>(jpegOutputStream.toByteArray(),
                headers, HttpStatus.CREATED);
    }
}
