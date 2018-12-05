package org.shoper.web.pojo;

import java.io.Serializable;

public class Resource implements Serializable {
    private int id;
    private String url;//url
    private String remark;//备注
    private String name;
    private String code;
    private int pid;
    private String methodName;//资源所对应的方法名
    private String methodPath;//资源所对应的包路径
    private ResourceType type; //资源 类型

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public ResourceType getType() {
        return type;
    }

    public void setType(ResourceType resourceType) {
        this.type = resourceType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }

    public String getMethodPath() {
        return methodPath;
    }

    public void setMethodPath(String methodPath) {
        this.methodPath = methodPath;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Resource resource = (Resource) o;

        return id == resource.id;
    }

    @Override
    public int hashCode() {
        return id;
    }
}