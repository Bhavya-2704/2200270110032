    package com.urlShortner.url.model;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.time.LocalDateTime;

    @Entity
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Table(name = "click_info")
    public class ClickInfo {
        @Id
        @GeneratedValue
        private Long id;

        private LocalDateTime timestamp;
        private String userAgent;
        private String referrer;
        private String ip;

        @ManyToOne
        private UrlMapping url;
    }
