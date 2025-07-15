    package com.urlShortner.url.repsository;

    import com.urlShortner.url.model.ClickInfo;
    import org.springframework.data.jpa.repository.JpaRepository;

    public interface ClickInfoRepository extends JpaRepository<ClickInfo,String> {

    }
