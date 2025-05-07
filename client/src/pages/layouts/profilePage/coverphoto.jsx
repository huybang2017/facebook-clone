import React from "react";

const CoverPhoto = ({ coverUrl }) => {
    return (
        <div>
            <img
                src={coverUrl || "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg"} // fallback nếu không có ảnh
                alt="Cover"
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
        </div>
    );
};

export default CoverPhoto;
