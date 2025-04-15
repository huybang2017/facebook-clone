package com.facebook.server.service;

import com.facebook.server.entity.Icon;
import com.facebook.server.repository.IconRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IconService {

    @Autowired
    private IconRepository iconRepository;

    public List<Icon> getAllIcons() {
        return iconRepository.findAll();
    }

    public Optional<Icon> getIconById(String id) {
        return iconRepository.findById(id);
    }

    public Icon createIcon(Icon icon) {
        return iconRepository.save(icon);
    }

    public Icon updateIcon(String id, Icon iconDetails) {
        Icon icon = iconRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Icon not found"));
        icon.setIcon(iconDetails.getIcon());
        return iconRepository.save(icon);
    }

    public void deleteIcon(String id) {
        Icon icon = iconRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Icon not found"));
        iconRepository.delete(icon);
    }
}
