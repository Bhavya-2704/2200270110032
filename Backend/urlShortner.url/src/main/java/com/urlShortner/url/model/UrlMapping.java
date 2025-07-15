    package com.urlShortner.url.model;



    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.time.LocalDateTime;
    import java.util.List;

    @Entity
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Table(name = "url_mapping")
    public class UrlMapping {

        @Id
        private String shortcode; // ✅ This must exist for setShortcode() to work

        private String originalUrl;

        private LocalDateTime createdAt;

        private LocalDateTime expiry;

        @OneToMany(mappedBy = "url", cascade = CascadeType.ALL)
        private List<ClickInfo> clicks;
    }
