package com.poweronce.entity;

import java.io.Serializable;

public class TEmployee implements Serializable {
    /**
     *
     */
    // private static final long serialVersionUID = 1L;
    private long id;
    private String Name;
    private String Code;
    private String Sex;
    private String BirthDay;
    private String IDCard;
    private String Tel;
    private String Mobile;
    private String Address;
    private String Department;
    private String HeadShip;
    private int Popedom;
    private String Password1;
    private int is_manager;

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public String getBirthDay() {
        return BirthDay;
    }

    public void setBirthDay(String birthDay) {
        BirthDay = birthDay;
    }

    public String getCode() {
        return Code;
    }

    public void setCode(String code) {
        Code = code;
    }

    public String getDepartment() {
        return Department;
    }

    public void setDepartment(String department) {
        Department = department;
    }

    public String getHeadShip() {
        return HeadShip;
    }

    public void setHeadShip(String headShip) {
        HeadShip = headShip;
    }

    public String getIDCard() {
        return IDCard;
    }

    public void setIDCard(String card) {
        IDCard = card;
    }

    public String getMobile() {
        return Mobile;
    }

    public void setMobile(String mobile) {
        Mobile = mobile;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getPassword1() {
        return Password1;
    }

    public void setPassword1(String password1) {
        Password1 = password1;
    }

    public String getSex() {
        return Sex;
    }

    public void setSex(String sex) {
        Sex = sex;
    }

    public String getTel() {
        return Tel;
    }

    public void setTel(String tel) {
        Tel = tel;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getIs_manager() {
        return is_manager;
    }

    public void setIs_manager(int is_manager) {
        this.is_manager = is_manager;
    }

    public int getPopedom() {
        return Popedom;
    }

    public void setPopedom(int popedom) {
        Popedom = popedom;
    }

}