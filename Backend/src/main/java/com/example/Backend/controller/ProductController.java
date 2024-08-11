package com.example.Backend.controller;

import com.example.Backend.dto.ProductDto;
import com.example.Backend.entity.SearchRequest;
import com.example.Backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    //Create product
    @PostMapping(value = "/add" )
    public ResponseEntity<String> createProduct(@RequestBody ProductDto productDto) throws IOException {


        String message = this.productService.addNewProduct(productDto);

        return new ResponseEntity<String>(message, HttpStatusCode.valueOf(200));
    }

    //Get product by Id
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable int productId) {

        ProductDto product = productService.getProductById(productId);

        return new ResponseEntity<>(product, HttpStatusCode.valueOf(200));
    }

    //Get All Products
    @GetMapping("/")
    public ResponseEntity<List<ProductDto>> getAllProducts(){

        List<ProductDto> products = productService.getAllProducts();

        return new ResponseEntity<>(products,HttpStatusCode.valueOf(200));
    }



    //Update Product
    @PutMapping("/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto productDto, @PathVariable Integer productId) throws IOException {
      
        ProductDto save = productService.updateProduct(productId,productDto);

        return new ResponseEntity<ProductDto>(save,HttpStatusCode.valueOf(200));
    }


    //Delete Product
    @DeleteMapping(value = "/del/{productId}", produces = "application/json")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer productId){
        this.productService.deleteProduct(productId);
        return new ResponseEntity<String>("Product deleted",HttpStatusCode.valueOf(200));
    }

    @PostMapping("/search")
    public ResponseEntity<List<ProductDto>> searchProducts(@RequestBody SearchRequest searchRequest) {
        List<ProductDto> searchResults = productService.searchProducts(searchRequest.getKeyword());
        return ResponseEntity.ok(searchResults);
    }
}
