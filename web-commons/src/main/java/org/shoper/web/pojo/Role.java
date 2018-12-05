package org.shoper.web.pojo;

import java.io.Serializable;

public class Role implements Serializable {
    private int id;
    private String name;//角色名称
    private String code;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role() {
    }

    public Role(String name, String code) {
        this.name = name;
        this.code = code;
    }
}