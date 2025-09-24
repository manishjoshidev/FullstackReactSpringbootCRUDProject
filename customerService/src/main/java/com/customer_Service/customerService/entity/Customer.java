package com.customer_Service.customerService.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity

public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )

    private Long id;
    private String name;
    private String email;
    private Integer balance;  
    // Constructors, getters, and setters
    public Customer() {
    }
    public Customer(Long id, String name, String email, Integer balance) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.balance = balance;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }       
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Integer getBalance() {
        return balance;
    }
    public void setBalance(Integer balance) {
        this.balance = balance;
    }


    
    
}
