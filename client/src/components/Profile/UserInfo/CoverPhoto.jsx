import React from "react";
import imgBackground from "@/assets/images/muathuparis.jpg";
const CoverPhoto = ({ coverUrl }) => {
  return (
    <div>
      <img
        src={coverUrl || imgBackground} // fallback nếu không có ảnh
        alt=""
        style={{ width: "100%", height: "400px", objectFit: "cover" }}
      />
    </div>
  );
};

export default CoverPhoto;
