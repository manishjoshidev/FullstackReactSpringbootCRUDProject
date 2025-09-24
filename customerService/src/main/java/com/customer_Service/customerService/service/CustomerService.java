package com.customer_Service.customerService.service;

import java.util.List;
import com.customer_Service.customerService.entity.Customer;

public interface CustomerService {
    List<Customer> getAllCustomers();
    Customer getCustomerById(Long customerId);
    Customer createCustomer(Customer customer);
    Customer updateCustomer( Customer customer);
    String deleteCustomer(Long id);
    Customer addCustomer(Customer customer);

}
