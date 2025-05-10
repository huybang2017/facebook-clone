import React from "react";

const CoverPhoto = ({ coverUrl }) => {
    return (
        <div>
            <img
                src={coverUrl} // fallback nếu không có ảnh
                alt=""
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
        </div>
    );
};

export default CoverPhoto;
