        package com.urlShortner.url.controller;

        import com.urlShortner.url.dto.UrlRequestDTO;
        import com.urlShortner.url.service.UrlService;
        import jakarta.servlet.http.HttpServletRequest;
        import lombok.RequiredArgsConstructor;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

        import java.util.Map;

        @RestController
        @CrossOrigin
        @RequiredArgsConstructor
        public class UrlController {

                private final UrlService service;

                @PostMapping("/shorturls")
                public ResponseEntity<?> createShortUrl(@RequestBody UrlRequestDTO req) {
                        try {
                                return ResponseEntity.status(201).body(service.createShortUrl(req));
                        } catch (RuntimeException ex) {
                                return ResponseEntity.status(400).body(Map.of("error", ex.getMessage()));
                        }
                }

                @GetMapping("/{code}")
                public ResponseEntity<?> redirect(@PathVariable String code, HttpServletRequest req) {
                        try {
                                String url = service.resolveShortcode(code, req);
                                return ResponseEntity.status(302).header("Location", url).build();
                        } catch (RuntimeException ex) {
                                return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
                        }
                }

                @GetMapping("/stats/{code}")

                public ResponseEntity<?> getStats(@PathVariable String code) {
                        try {
                                return ResponseEntity.ok(service.getStats(code));
                        } catch (RuntimeException ex) {
                                return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
                        }
                }
        }
