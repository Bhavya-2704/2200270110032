package com.urlShortner.url.dto;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UrlStatsDTO {
    public String originalUrl;
    public LocalDateTime createdAt;
    public LocalDateTime expiry;
    public int totalClicks;
    public List<Map<String, Object>> clickDetails;
}
