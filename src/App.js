import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import MarkdownPage from "./components/MarkdownPage";
import "./index.css";

const App = () => {
    return (
        <Router>
            <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />
                <div style={{ flex: 1, overflowY: "auto" }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/:page" element={<MarkdownPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
