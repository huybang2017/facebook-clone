import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                borderTop: "1px solid #ddd",
                padding: "10px 0",
                backgroundColor: "#f9f9f9",
            }}
        >
            <NavLink
                to="/profile"
                style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#1D72B8" : "#555",
                    fontWeight: isActive ? "bold" : "normal",
                })}
            >
                Bài viết
            </NavLink>
           
            <NavLink
                to="/profile-photos"
                style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#1D72B8" : "#555",
                    fontWeight: isActive ? "bold" : "normal",
                })}
            >
                Ảnh
            </NavLink>
            <NavLink
                to="/profile-friends"
                style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#1D72B8" : "#555",
                    fontWeight: isActive ? "bold" : "normal",
                })}
            >
                Bạn bè
            </NavLink>
        </div>
    );
};

export default NavBar;
