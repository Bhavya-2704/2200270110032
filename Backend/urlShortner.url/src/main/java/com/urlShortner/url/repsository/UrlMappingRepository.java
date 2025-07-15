    package com.urlShortner.url.repsository;

    import com.urlShortner.url.model.UrlMapping;
    import org.springframework.data.jpa.repository.JpaRepository;

    public interface UrlMappingRepository  extends JpaRepository<UrlMapping,String> {
    }
