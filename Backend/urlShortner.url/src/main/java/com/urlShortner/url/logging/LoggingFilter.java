package com.urlShortner.url.logging;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class LoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String logMessage = String.format("Request: %s %s from IP %s", request.getMethod(), request.getRequestURI(), request.getRemoteAddr());
        request.setAttribute("logMessage", logMessage); // Store it for your custom logger
        filterChain.doFilter(request, response);
    }
}

