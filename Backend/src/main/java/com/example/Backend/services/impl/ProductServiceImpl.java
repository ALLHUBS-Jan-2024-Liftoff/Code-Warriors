package com.example.Backend.services.impl;

import com.example.Backend.dto.ProductDto;
import com.example.Backend.entity.Product;
import com.example.Backend.repositories.ProductRepo;
import com.example.Backend.services.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ProductRepo productRepo;

    // Create

    @Override
    public  String addNewProduct(ProductDto productDto){

        Product product=this.modelMapper.map(productDto,Product.class);

        this.productRepo.save(product);

        return "Product added successfully";
    }


    //Get All Products
    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> all = this.productRepo.findAll();

        return all.stream().map(
                dto -> new ProductDto(dto.getProductId(),
                        dto.getProductName(),
                        dto.getDescription(),
                        dto.getPrice(),
                        dto.getQuantity(),
                        dto.getStatus(),
                        dto.getImageUrl())).collect(Collectors.toList());
    }


    @Override
    public  ProductDto  getProductById(int productId) {
        Product product = this.productRepo.findById(productId).orElseThrow();

        return this.modelMapper.map(product,ProductDto.class);
    }

    @Override
    public String updatePrice(int productId, Double price) {
        Optional<Product> opt = productRepo.findById(productId);
        if(opt.isPresent()){
           opt.get().setPrice(price);
            productRepo.save(opt.get());
            return "Product Price Updated";
        }
        return "Product id is invalid";
    }


    //Update
    @Override
    public ProductDto updateProduct(int ProductId, ProductDto productDto) {

        Product newProduct = this.productRepo.findById(ProductId).orElseThrow();
        newProduct.setProductId(ProductId);
        newProduct.setDescription(productDto.getDescription());
        newProduct.setProductName(productDto.getProductName());
        newProduct.setQuantity(productDto.getQuantity());
        newProduct.setPrice(productDto.getPrice());
        newProduct.setStatus(productDto.getStatus());
        newProduct.setImageUrl(productDto.getImageUrl());
        productRepo.save(newProduct);


        return this.modelMapper.map(newProduct,ProductDto.class);
    }


    @Override
    public void deleteProduct(int productId) {
        this.productRepo.deleteById(productId);
    }



}
