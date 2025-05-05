package com.facebook.server.utils;

import com.facebook.server.dto.response.PageResponse;
import com.facebook.server.entity.Timestamp;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class Pagination {

    public <T extends Timestamp> PageResponse getPagination(Page<T> entity) {
        PageResponse pageResponse = new PageResponse();
        pageResponse.setPageNo(entity.getNumber());
        pageResponse.setPageSize(entity.getSize());
        pageResponse.setTotalElements(entity.getTotalElements());
        pageResponse.setTotalPages(entity.getTotalPages());
        pageResponse.setLast(entity.isLast());
        return pageResponse;
    }
}
