import { getProfileDetail } from "@/apis/authService";
import { getAllComment, writeComment } from "@/apis/commentService";
import { useCallback } from "react";

export const useComment = () => {
  const getAllCommentOfPost = useCallback(async (postId) => {
    try {
      const res = await getAllComment(postId);
      if (res) {
        const postCommentList = res?.data?.postCommentList;

        const customKeyForCommentList = await Promise.all(
          postCommentList?.map(async (comment) => {
            try {
              const infoUserCommentRes = await getProfileDetail(comment.userId);

              const avatar = infoUserCommentRes?.data.profilePicture;

              return {
                ...comment,
                avatar,
              };
            } catch (error) {
              return {
                ...comment,
                avatar: null,
              };
            }
          })
        );

        return customKeyForCommentList;
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const writeCommentForPost = useCallback(async (FormData, id) => {
    try {
      const res = await writeComment(FormData, id);
      return res;
    } catch (error) {
      throw error;
    }
  }, []);

  return { getAllCommentOfPost, writeCommentForPost };
};
