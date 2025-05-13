import { getCountComment } from "@/apis/commentService";
import { getCountLike, getIsLike } from "@/apis/likeService";
import {
  create,
  deletePost,
  getAll,
  getById,
  getOfUser,
} from "@/apis/postService";
import { useCallback } from "react";

export const usePost = () => {
  // Lấy danh sách bài post của ứng dụng
  const getAllPost = useCallback(async () => {
    try {
      const res = await getAll();
      if (res.data && res.status == 200) {
        const postList = res.data.postList;

        const customKeyForPostList = await Promise.all(
          postList.map(async (post) => {
            try {
              const likeRes = await getCountLike(post.postId);
              const isLikedRes = await getIsLike(post.postId);
              const commentRes = await getCountComment(post.postId);

              const postLikeCount = likeRes?.data?.postLikeCount || 0;
              const isLiked = isLikedRes?.data?.liked;

              const postCommentCount = commentRes?.data?.postCommentCount || 0;

              return {
                ...post,
                isLiked,
                postLikeCount,
                postCommentCount,
              };
            } catch (err) {
              return {
                ...post,
                postLikeCount: 0,
                isLiked: false,
                postCommentCount,
              };
            }
          })
        );
        return customKeyForPostList;
      }
    } catch (error) {
      throw error;
    }
  }, []);

  // Lấy thông tin bài post theo id
  const getPostById = useCallback(async (id) => {
    try {
      const res = await getById(id);
      if (res.data && res.status == 200) {
        return res.data;
      }
    } catch (error) {
      throw error;
    }
  }, []);

  // Lấy danh sách bài post của người dùng theo userId
  const getPostOfUser = useCallback(async (userId) => {
    try {
      const res = await getOfUser(userId);
      if (res.data && res.status == 200) {
        return res.data.postList;
      }
    } catch (error) {
      throw error;
    }
  }, []);

  // Tạo bài viết
  const createPost = useCallback(async (formData, id) => {
    try {
      const res = await create(formData, id);
      if (res.status == 201) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }, []);

  // Xóa bài viết theo id
  const deletePostById = useCallback(async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status == 200) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }, []);

  return { getAllPost, getPostById, getPostOfUser, createPost, deletePostById };
};
