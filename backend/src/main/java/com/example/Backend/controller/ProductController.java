package com.example.Backend.controller;

import com.example.Backend.Dto.ProductDto;
import com.example.Backend.entity.Product;
import com.example.Backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;



@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    //Create product
    @PostMapping(value = "/add" )
    public ResponseEntity<String> CreateProduct(@RequestParam MultiValueMap<String, String> formData) throws IOException {
        ProductDto productDto = new ProductDto();
        productDto.setProductName(formData.getFirst("productName"));
        productDto.setDescription(formData.getFirst("description"));
        productDto.setQuantity(Integer.parseInt(Objects.requireNonNull(formData.getFirst("quantity"))));
        productDto.setPrice(Float.valueOf(Objects.requireNonNull(formData.getFirst("price"))));
        productDto.setStatus(formData.getFirst("status"));
        productDto.setImageUrl(formData.getFirst("imageUrl"));

        String message = this.productService.addNewProduct(productDto);

        return new ResponseEntity<String>(message,HttpStatusCode.valueOf(200));
    }

    //Get product by Id
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDto> GetProductById(@PathVariable int productId) {
        ProductDto product = this.productService.getProductById(productId);

        return new ResponseEntity<>(product, HttpStatusCode.valueOf(200));
    }

    //Get All Products
    @GetMapping("/")
    public ResponseEntity<List<ProductDto>> getAll(){
        List<ProductDto> products = this.productService.getAllProducts();

        return new ResponseEntity<>(products,HttpStatusCode.valueOf(200));
    }



    //Update Product
    @PutMapping("/{productId}")
    public ResponseEntity<ProductDto> UpdateProduct(@RequestParam MultiValueMap<String, String> formData, @PathVariable Integer productId) throws IOException {
        ProductDto productDto = new ProductDto();
        productDto.setProductName(formData.getFirst("productName"));
        productDto.setDescription(formData.getFirst("description"));
        productDto.setQuantity(Integer.parseInt(Objects.requireNonNull(formData.getFirst("quantity"))));
        productDto.setPrice(Float.valueOf(Objects.requireNonNull(formData.getFirst("price"))));
        productDto.setStatus(formData.getFirst("status"));
        productDto.setImageUrl(formData.getFirst("imageUrl"));

        ProductDto save = this.productService.UpdateProduct(productId,productDto);

        return new ResponseEntity<ProductDto>(save,HttpStatusCode.valueOf(200));
    }


    //Delete Product
    @DeleteMapping(value = "/del/{productId}",produces = "application/json")
    public ResponseEntity<String> Delete(@PathVariable Integer productId){
        this.productService.deleteProduct(productId);
        return new ResponseEntity<String>("Product deleted",HttpStatusCode.valueOf(200));
    }





}
