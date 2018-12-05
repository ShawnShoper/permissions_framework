#   权限框架DEMO

##  包含相关的技术框架
*   Spring Security
*   Redis
*   SpringMVC
*   Mybatis
*   SpringBoot
*   JqueryTemplate 

##  包结构说明
~~~+text
    web-admin 包含 基本数据接口
        web-admin
                -  src
                    -   main
                        -   java
                            -   org.shoper.web
                                -   admin   后台服务代码
                                        -   config  包含view配置，Thymeleaf模板配置
                                        -   web     controller层
                                        -   serivce     包含权限相关Service层
                                -   security    包含SpringSecurity配置      
                                -   mapper      mybatis配置
                                Application     程序启动
    web-commons 包含基本中间配置
~~~
