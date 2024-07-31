package com.example.Backend.services;

import com.example.Backend.dto.OrderedProductResponseDto;
import com.example.Backend.dto.ProductDto;

import java.util.List;

public interface ProductService {

    String addNewProduct(ProductDto productDto);
    List<ProductDto> getAllProducts();
    void deleteProduct(int productId);
    ProductDto getProductById(int productId);
    String updatePrice(int productId, Double price);

    ProductDto updateProduct(int ProductId, ProductDto productDto);

}
