package com.urlShortner.url.dto;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UrlRequestDTO {
    public String url;

    public String shortcode;
    public Integer validity; // in minutes
}
