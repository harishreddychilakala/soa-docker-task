package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.TailoringOrderDTO;

public interface TailoringOrderService {


    TailoringOrderDTO addTailoringOrder(TailoringOrderDTO order);
    List<TailoringOrderDTO> displayAllTailoringOrders();
    TailoringOrderDTO displayTailoringOrderById(Long id);
    String deleteTailoringOrderById(Long id);
    TailoringOrderDTO updateTailoringOrder(Long id, TailoringOrderDTO order);
}