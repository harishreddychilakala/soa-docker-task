package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.TailoringOrderDTO;
import com.klef.soa.docker.service.TailoringOrderService;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@Validated
@RequestMapping("/tailoringorders")
public class TailoringOrderController {

    @Autowired
    private TailoringOrderService service;
    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Tailoring Order Service is Running");
    }
    @PostMapping("/add")
    public ResponseEntity<TailoringOrderDTO> addTailoringOrder(
            @Valid @RequestBody TailoringOrderDTO order) {

        TailoringOrderDTO savedOrder = service.addTailoringOrder(order);

        return ResponseEntity.ok(savedOrder);
    }
    @GetMapping("/displayall")
    public ResponseEntity<List<TailoringOrderDTO>> displayAllTailoringOrders() {

        List<TailoringOrderDTO> orders = service.displayAllTailoringOrders();

        return ResponseEntity.ok(orders);
    }
    @GetMapping("/display/{id}")
    public ResponseEntity<TailoringOrderDTO> displayTailoringOrderById(
            @PathVariable Long id) {

        TailoringOrderDTO order = service.displayTailoringOrderById(id);

        if (order != null) {
            return ResponseEntity.ok(order);
        }

        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTailoringOrderById(
            @PathVariable Long id) {

        String message = service.deleteTailoringOrderById(id);

        if (message.equals("Tailoring Order Deleted Successfully")) {
            return ResponseEntity.ok(message);
        }

        return ResponseEntity.notFound().build();
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<TailoringOrderDTO> updateTailoringOrder(
            @PathVariable Long id,
            @Valid @RequestBody TailoringOrderDTO order) {

        TailoringOrderDTO updatedOrder = service.updateTailoringOrder(id, order);

        if (updatedOrder != null) {
            return ResponseEntity.ok(updatedOrder);
        }

        return ResponseEntity.notFound().build();
    }
}