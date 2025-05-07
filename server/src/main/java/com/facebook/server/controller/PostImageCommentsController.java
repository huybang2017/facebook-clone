package com.facebook.server.controller;

import com.facebook.server.dto.response.PostCommentCountResponse;
import com.facebook.server.dto.response.PostCommentListResponse;
import com.facebook.server.service.PostImageCommentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostImageCommentsController {

    private final PostImageCommentsService postImageCommentsService;

    @PostMapping("/{postImageId}/image/comment")
    public void writePostImageComment(@PathVariable("postImageId") Long postImageId,
            @RequestPart(value = "comment", required = false) String comment,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        postImageCommentsService.writePostImageComment(postImageId, comment, file);
    }

    @GetMapping("/{postImageId}/image/comment")
    public PostCommentListResponse fetchAllPostImageComments(@PathVariable("postImageId") Long postImageId,
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize) {
        return postImageCommentsService.fetchAllPostImageComments(postImageId, pageNo, pageSize);
    }

    @GetMapping("/{postImageId}/image/comment/count")
    public PostCommentCountResponse getPostImageCommentCount(@PathVariable("postImageId") Long postImageId) {
        return postImageCommentsService.getPostImageCommentCount(postImageId);
    }
}
