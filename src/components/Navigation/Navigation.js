import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SnippetFolderSharpIcon from "@mui/icons-material/SnippetFolderSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { Badge } from "@mui/material";

import "./Navigation.css";

const Navigation = ({ notifications }) => {
    const location = useLocation();
    return (
        <div className="outer-container">
            <div className="navbar">
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="relative" style={{ backgroundColor: "#E5082A" }}>
                        <Toolbar>
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                                <HomeSharpIcon />
                            </Link>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                            <Link className={`nav-link ${location.pathname === "/my-pokemon" ? "active" : ""}`} to="/my-pokemon">
                                <Badge color="primary" badgeContent={notifications}>
                                    <SnippetFolderSharpIcon />
                                </Badge>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
            <div className="page">
                <Outlet />
            </div>
        </div>
    );
};

export default Navigation;
