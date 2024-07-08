package com.example.Backend.services;

import com.example.Backend.Dto.ProductDto;
import com.example.Backend.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    String addNewProduct(ProductDto productDto);
    List<ProductDto> getAllProducts();
    String deleteProduct(int productId);
    ProductDto getProductById(int productId);
    String updatePrice(int productId, Float price);

    ProductDto UpdateProduct(int ProductId, ProductDto productDto);

}
