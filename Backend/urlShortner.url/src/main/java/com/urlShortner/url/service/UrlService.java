package com.urlShortner.url.service;

import com.urlShortner.url.dto.UrlRequestDTO;
import com.urlShortner.url.dto.UrlResponseDTO;
import com.urlShortner.url.dto.UrlStatsDTO;
import com.urlShortner.url.model.ClickInfo;
import com.urlShortner.url.model.UrlMapping;
import com.urlShortner.url.repsository.ClickInfoRepository;
import com.urlShortner.url.repsository.UrlMappingRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UrlService {

    @Autowired
    private UrlMappingRepository urlRepo;

    @Autowired
    private ClickInfoRepository clickRepo;

    public UrlResponseDTO createShortUrl(UrlRequestDTO req) {
        String code = req.shortcode != null && !req.shortcode.isEmpty()
                ? req.shortcode
                : generateRandomCode();

        if (urlRepo.existsById(code)) {
            throw new RuntimeException("Shortcode already exists");
        }

        UrlMapping mapping = new UrlMapping();
        mapping.setShortcode(code);
        mapping.setOriginalUrl(req.url);
        mapping.setCreatedAt(LocalDateTime.now());

        int minutes = req.validity != null ? req.validity : 30;
        mapping.setExpiry(mapping.getCreatedAt().plusMinutes(minutes));
        urlRepo.save(mapping);

        return new UrlResponseDTO("http://localhost:8080/" + code, mapping.getExpiry().toString());
    }

    public String resolveShortcode(String code, HttpServletRequest request) {
        UrlMapping mapping = urlRepo.findById(code)
                .orElseThrow(() -> new RuntimeException("Shortcode not found"));

        if (mapping.getExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Shortcode expired");
        }

        ClickInfo click = new ClickInfo();
        click.setTimestamp(LocalDateTime.now());
        click.setReferrer(request.getHeader("referer"));
        click.setUserAgent(request.getHeader("User-Agent"));
        click.setIp(request.getRemoteAddr());
        click.setUrl(mapping);
        clickRepo.save(click);

        return mapping.getOriginalUrl();
    }

    public UrlStatsDTO getStats(String code) {
        UrlMapping mapping = urlRepo.findById(code)
                .orElseThrow(() -> new RuntimeException("Not found"));

        UrlStatsDTO dto = new UrlStatsDTO();
        dto.originalUrl = mapping.getOriginalUrl();
        dto.createdAt = mapping.getCreatedAt();
        dto.expiry = mapping.getExpiry();
        dto.totalClicks = mapping.getClicks().size();
        dto.clickDetails = mapping.getClicks().stream().map(click -> {
            Map<String, Object> info = new java.util.HashMap<>();
            info.put("timestamp", click.getTimestamp());
            info.put("ip", click.getIp());
            info.put("referrer", click.getReferrer());
            info.put("userAgent", click.getUserAgent());
            return info;
        }).collect(Collectors.toList());

        return dto;
    }


    private String generateRandomCode() {
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        Random rnd = new Random();
        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
