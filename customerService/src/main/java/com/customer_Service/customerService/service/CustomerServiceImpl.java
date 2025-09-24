package com.customer_Service.customerService.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.customer_Service.customerService.entity.Customer;
import com.customer_Service.customerService.repository.CustomerRepository;
@Service
public class CustomerServiceImpl implements CustomerService {


    @Autowired
    private CustomerRepository customerRepository;  

public List<Customer> getAllCustomers() {
    return (List<Customer>) customerRepository.findAll();
}

    public Customer getCustomerById(Long customerId) {
        
        return customerRepository.findById(customerId).orElse(null);
    }

    public Customer createCustomer(Customer customer) {
       
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Customer customer) {
       
        return customerRepository.save(customer);
    }

    public String deleteCustomer(Long id) {
        customerRepository.deleteById(id);
        return "Customer deleted successfully"; 
       
    }   
    public Customer addCustomer(Customer customer) {
        customerRepository.save(customer);
        return customerRepository.save(customer);
    }

    
}
