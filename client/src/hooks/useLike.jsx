import { putLikeOrUnlike } from "@/apis/likeService";
import { useCallback } from "react";

export const useLike = () => {
  const putReaction = useCallback(async (id) => {
    try {
      const res = await putLikeOrUnlike(id);
      return res;
    } catch (error) {
      throw error;
    }
  }, []);

  return { putReaction };
};
