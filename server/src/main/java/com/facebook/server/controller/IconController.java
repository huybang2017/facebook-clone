package com.facebook.server.controller;

import com.facebook.server.entity.Icon;
import com.facebook.server.service.IconService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/icons")
public class IconController {

    @Autowired
    private IconService iconService;

    @GetMapping
    public List<Icon> getAllIcons() {
        return iconService.getAllIcons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Icon> getIconById(@PathVariable String id) {
        return iconService.getIconById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Icon> createIcon(@RequestBody Icon icon) {
        return ResponseEntity.ok(iconService.createIcon(icon));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Icon> updateIcon(@PathVariable String id, @RequestBody Icon iconDetails) {
        try {
            return ResponseEntity.ok(iconService.updateIcon(id, iconDetails));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIcon(@PathVariable String id) {
        try {
            iconService.deleteIcon(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
