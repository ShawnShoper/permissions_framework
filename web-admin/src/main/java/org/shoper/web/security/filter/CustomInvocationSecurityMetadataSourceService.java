package org.shoper.web.security.filter;

import org.shoper.web.mapper.ResourceMapper;
import org.shoper.web.mapper.RoleMapper;
import org.shoper.web.pojo.Resource;
import org.shoper.web.pojo.Role;
import org.shoper.web.security.config.AuthConfigAttribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class CustomInvocationSecurityMetadataSourceService implements
        FilterInvocationSecurityMetadataSource {

    @Autowired
    private ResourceMapper sResourceVODao;

    @Autowired
    private RoleMapper sRoleVODao;
    private ConcurrentMap<String, Collection<ConfigAttribute>> resourceMap = null;

    /*public CustomInvocationSecurityMetadataSourceService(SResourceService sres,SRoleService sR) {
        this.sResourceService = sres;
        this.sRoleService = sR;
        loadResourceDefine();
    }*/
    @PostConstruct
//<span style="font-family: Helvetica, Tahoma, Arial, sans-serif; font-size: 14px; line-height: 25.1875px;">  </span><span style="font-family: Helvetica, Tahoma, Arial, sans-serif; line-height: 25.1875px;"><span style="font-size:10px;">被@PostConstruct修饰的方法会在服务器加载Servle的时候运行，并且只会被服务器执行一次。PostConstruct在构造函数之后执行,init()方法之前执行。</span></span></span>
    public void loadResourceDefine() { //一定要加上<span style="font-family: Arial, Helvetica, sans-serif;">@PostConstruct注解</span></span>
        // 在Web服务器启动时，提取系统中的所有权限。
        List<Role> list = sRoleVODao.findAll();
        List<String> query = new ArrayList<>();
        if (list != null && list.size() > 0) {
            for (Role role : list) {
//               String name = sr.get("name")
//                Object value = role.getName();
//                String name = String.valueOf(value);
                query.add(role.getCode());
            }
        }
        /*
         * 应当是资源为key， 权限为value。 资源通常为url， 权限就是那些以ROLE_为前缀的角色。 一个资源可以由多个权限来访问。
         * sparta
         */
        ConcurrentMap<String, Collection<ConfigAttribute>> resourceMap = new ConcurrentHashMap<>();

        for (String auth : query) {
//            ConfigAttribute ca = new SecurityConfig(auth);
            //List<Map<String,Object>> query1 = sResourceVODao.findByRoleName(auth);
//            List<String> query1 = new ArrayList<>();
            List<Resource> query1 = sResourceVODao.findByRoleName(auth);
//            if (list1 != null && list1.size() > 0) {
//                for (Resource resource : list1) {
//                    Object value = resource.getUrl();
//                    String url = String.valueOf(value);
//                    query1.add(url);
//                }
//            }
            for (Resource res : query1) {
                String url = res.getUrl();
                /*
                 * 判断资源文件和权限的对应关系，如果已经存在相关的资源url，则要通过该url为key提取出权限集合，将权限增加到权限集合中。
                 * sparta
                 */
                //检查url是否带有|如果有说明是多个组合。
                String urls[] = new String[1];
                if (url.contains("|")) {
                    urls = url.split("\\|");
                } else {
                    urls[0] = url;
                }
                //检查method是否带有|如果有说明根据url相对应
                String methodName = res.getMethodName();
                String[] methods = new String[urls.length];
                if (methodName.contains("|"))
                    methods = methodName.split("\\|");
                else
                    for (int i = 0; i < urls.length; i++)
                        methods[i] = methodName;
                for (int i = 0; i < urls.length; i++) {
                    if (resourceMap.containsKey(urls[i])) {
                        Collection<ConfigAttribute> value = resourceMap.get(urls[i]);
                        value.add(new AuthConfigAttribute(auth, methods[i]));
                        resourceMap.put(urls[i], value);
                    } else {
                        Collection<ConfigAttribute> atts = new ArrayList<>();
                        atts.add(new AuthConfigAttribute(auth, methods[i]));
                        resourceMap.put(urls[i], atts);
                    }
                }
            }
        }
        this.resourceMap = resourceMap;
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return new ArrayList<>();
    }

    // 根据URL，找到相关的权限配置。</span>
    @Override
    public Collection<ConfigAttribute> getAttributes(Object object)
            throws IllegalArgumentException {
        // object 是一个URL，被用户请求的url。</span>
        FilterInvocation filterInvocation = (FilterInvocation) object;
        if (resourceMap == null) {
            loadResourceDefine();
        }
        Iterator<String> ite = resourceMap.keySet().iterator();
        while (ite.hasNext()) {
            String resURL = ite.next();
            RequestMatcher requestMatcher = new AntPathRequestMatcher(resURL);
            //这里做权限验证匹配如果匹配到角色对应列表那么执行CustomAccessDecisionManager进行更细致的权限验证(重点！！！！)
            if (requestMatcher.matches(filterInvocation.getHttpRequest()))
                return resourceMap.get(resURL);
        }
        return null;
    }

    @Override
    public boolean supports(Class<?> arg0) {
        return true;
    }

}