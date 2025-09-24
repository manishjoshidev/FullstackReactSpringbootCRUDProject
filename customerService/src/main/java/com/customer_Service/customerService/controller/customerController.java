package com.customer_Service.customerService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.customer_Service.customerService.entity.Customer;
import com.customer_Service.customerService.service.CustomerService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import org.springframework.http.HttpStatus;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class customerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/api/customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return new ResponseEntity<>(customerService.getAllCustomers(), HttpStatus.OK);
    }
    
    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer != null) {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PatchMapping("/customers/{id}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Long id,
            @RequestBody Customer updatedFields) {
        Customer existingCustomer = customerService.getCustomerById(id);
        if (existingCustomer != null) {
            if (updatedFields.getName() != null) {
                existingCustomer.setName(updatedFields.getName());
            }
            if (updatedFields.getEmail() != null) {
                existingCustomer.setEmail(updatedFields.getEmail());
            }
            if (updatedFields.getBalance() != null) {
                existingCustomer.setBalance(updatedFields.getBalance());
            }
            Customer updatedCustomer = customerService.updateCustomer(existingCustomer);
            return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }   
    @PostMapping("/customers")
    public ResponseEntity<Customer>craeteCustomer(@RequestBody Customer customer) {
        Customer newCustomer = customerService.addCustomer(customer);
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }


    @DeleteMapping("/customers/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        String response = customerService.deleteCustomer(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    } 
    
}
