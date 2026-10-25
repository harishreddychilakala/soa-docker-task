package com.klef.soa.docker.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.TailoringOrderDTO;
import com.klef.soa.docker.entity.TailoringOrderEntity;
import com.klef.soa.docker.repository.TailoringOrderRepository;
import com.klef.soa.docker.service.TailoringOrderService;

@Service
public class TailoringOrderServiceImpl implements TailoringOrderService {

    @Autowired
    private TailoringOrderRepository repo;

    // Add Tailoring Order
    @Override
    public TailoringOrderDTO addTailoringOrder(TailoringOrderDTO order) {

        TailoringOrderEntity entity = new TailoringOrderEntity();

        entity.setCustomerName(order.getCustomerName());
        entity.setGarmentType(order.getGarmentType());
        entity.setPrice(order.getPrice());
        entity.setDelivered(order.getDelivered());

        TailoringOrderEntity savedEntity = repo.save(entity);

        TailoringOrderDTO dto = new TailoringOrderDTO();

        dto.setId(savedEntity.getId());
        dto.setCustomerName(savedEntity.getCustomerName());
        dto.setGarmentType(savedEntity.getGarmentType());
        dto.setPrice(savedEntity.getPrice());
        dto.setDelivered(savedEntity.getDelivered());

        return dto;
    }

    // Display All Tailoring Orders
    @Override
    public List<TailoringOrderDTO> displayAllTailoringOrders() {

        List<TailoringOrderEntity> entityList = repo.findAll();

        List<TailoringOrderDTO> dtoList = new ArrayList<>();

        for (TailoringOrderEntity entity : entityList) {

            TailoringOrderDTO dto = new TailoringOrderDTO();

            dto.setId(entity.getId());
            dto.setCustomerName(entity.getCustomerName());
            dto.setGarmentType(entity.getGarmentType());
            dto.setPrice(entity.getPrice());
            dto.setDelivered(entity.getDelivered());

            dtoList.add(dto);
        }

        return dtoList;
    }

    // Display Tailoring Order By ID
    @Override
    public TailoringOrderDTO displayTailoringOrderById(Long id) {

        Optional<TailoringOrderEntity> optional = repo.findById(id);

        if (optional.isPresent()) {

            TailoringOrderEntity entity = optional.get();

            TailoringOrderDTO dto = new TailoringOrderDTO();

            dto.setId(entity.getId());
            dto.setCustomerName(entity.getCustomerName());
            dto.setGarmentType(entity.getGarmentType());
            dto.setPrice(entity.getPrice());
            dto.setDelivered(entity.getDelivered());

            return dto;
        }

        return null;
    }

    // Delete Tailoring Order By ID
    @Override
    public String deleteTailoringOrderById(Long id) {

        if (repo.existsById(id)) {

            repo.deleteById(id);

            return "Tailoring Order Deleted Successfully";
        }

        return "Tailoring Order Not Found";
    }

    // Update Tailoring Order
    @Override
    public TailoringOrderDTO updateTailoringOrder(Long id, TailoringOrderDTO order) {

        Optional<TailoringOrderEntity> optional = repo.findById(id);

        if (optional.isPresent()) {

            TailoringOrderEntity entity = optional.get();

            entity.setCustomerName(order.getCustomerName());
            entity.setGarmentType(order.getGarmentType());
            entity.setPrice(order.getPrice());
            entity.setDelivered(order.getDelivered());

            TailoringOrderEntity savedEntity = repo.save(entity);

            TailoringOrderDTO dto = new TailoringOrderDTO();

            dto.setId(savedEntity.getId());
            dto.setCustomerName(savedEntity.getCustomerName());
            dto.setGarmentType(savedEntity.getGarmentType());
            dto.setPrice(savedEntity.getPrice());
            dto.setDelivered(savedEntity.getDelivered());

            return dto;
        }

        return null;
    }
}