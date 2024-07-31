package com.example.Backend.services.impl;

import com.example.Backend.dto.OrderedProductResponseDto;
import com.example.Backend.dto.ProductDto;
import com.example.Backend.entity.CartItem;
import com.example.Backend.repositories.OrderRepository;
import com.example.Backend.services.ReviewService;
import lombok.RequiredArgsConstructor;
//
import org.hibernate.query.Order;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImp implements ReviewService {

    private final OrderRepository orderRepository;

    public OrderedProductResponseDto getOrderedProductDetailsByOrderId(Long orderId) {

        Optional<Order> optionalOrder = orderRepository.findById(orderId); // Correct method name

        OrderedProductResponseDto orderedProductResponseDto = new OrderedProductResponseDto();
        if (optionalOrder.isPresent()) {
            orderedProductResponseDto.setOrderAmount(optionalOrder.get().getAmount());
            List<ProductDto> productDtoList = new ArrayList<>();

            for (CartItem cartItems : optionalOrder.get().getCartItems()) {

                ProductDto productDto = new ProductDto();
                productDto.setId(cartItems.getProduct().getId());
                productDto.setName(cartItems.getProduct().getName());
                productDto.setPrice(cartItems.getPrice());
                productDto.setQuantity(cartItems.getQuantity());
                productDto.setByteImg(cartItems.getProduct().getImg());

                productDtoList.add(productDto);
            }
            orderedProductResponseDto.setProductDtoList(productDtoList);
        }
        return orderedProductResponseDto;
    }
}

