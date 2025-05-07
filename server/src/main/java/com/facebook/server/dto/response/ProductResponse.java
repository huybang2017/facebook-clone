package com.facebook.server.dto.response;

import com.facebook.server.dto.model.ProductModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private List<ProductModel> productModels = new ArrayList<>();
    private PageResponse pageResponse;
}
