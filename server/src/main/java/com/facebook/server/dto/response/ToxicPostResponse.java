package com.facebook.server.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
public class ToxicPostResponse {
    private String text;
    private Map<String, BigDecimal> scores;
    private BigDecimal averageScore;
}