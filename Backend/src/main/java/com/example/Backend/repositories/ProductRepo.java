package com.example.Backend.repositories;

import com.example.Backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
    @Query(value = "SELECT * FROM product WHERE MATCH(product_name, description, category, brand) AGAINST(:keyword)", nativeQuery = true)
    List<Product> searchProducts(@Param("keyword") String keyword);
}
