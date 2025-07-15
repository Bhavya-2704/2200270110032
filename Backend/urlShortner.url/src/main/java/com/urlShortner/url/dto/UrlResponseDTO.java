    package com.urlShortner.url.dto;

    import jakarta.persistence.Entity;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;


    @Data
    @NoArgsConstructor
    @Builder
    public class UrlResponseDTO {
        public String shortLink;
        public String expiry;

        public UrlResponseDTO(String shortLink, String expiry) {
            this.shortLink = shortLink;
            this.expiry = expiry;
        }
    }

