package com.example.Backend.repositories;

import com.example.Backend.dto.AverageOrderCostDTO;
import com.example.Backend.entity.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<UserOrder, Integer> {

        UserOrder  findOrdersByOrderId(String orderId);

        @Query(value = "SELECT DATE(uo.order_date) as orderDate, AVG(uo.total) as averageCost " +
                "FROM user_order uo " +
                "WHERE uo.order_date BETWEEN :startDate AND :endDate " +
                "GROUP BY DATE(uo.order_date) " +
                "ORDER BY DATE(uo.order_date)", nativeQuery = true)
        List<Object[]> findAverageOrderCostLast7Days(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

        @Query(value = "SELECT DATE(uo.order_date) as orderDate, SUM(uo.total) as totalRevenue " +
                "FROM user_order uo " +
                "WHERE uo.order_date BETWEEN :startDate AND :endDate " +
                "GROUP BY DATE(uo.order_date) " +
                "ORDER BY DATE(uo.order_date)", nativeQuery = true)
        List<Object[]> findTotalRevenueLast7Days(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

        @Query(value = "SELECT DATE(uo.order_date) as orderDate, SUM(oi.quantity) as totalQuantity " +
                "FROM user_order uo " +
                "JOIN order_item oi ON uo.id = oi.order_id " +
                "WHERE uo.order_date BETWEEN :startDate AND :endDate " +
                "GROUP BY DATE(uo.order_date) " +
                "ORDER BY DATE(uo.order_date)", nativeQuery = true)
        List<Object[]> findTotalProductsSoldLast7Days(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}