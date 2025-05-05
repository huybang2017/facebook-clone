export const getFlexBasis = (index: number, imageCount: number) => {
  if (imageCount === 1) return "100%";
  if (imageCount === 2) return "calc(50% - 5px)";
  if (imageCount === 3) return index === 0 ? "100%" : "calc(50% - 5px)";
  if (imageCount === 4) return "calc(50% - 5px)";
  if (imageCount === 5)
    return index < 3 ? "calc(33.33% - 5px)" : "calc(50% - 5px)";
  if (imageCount === 6) return "calc(33.33% - 5px)";
  return "calc(33.33% - 5px)";
};
