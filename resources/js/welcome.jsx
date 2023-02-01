import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Welcome from "./Welcome/Welcome";

const MainRouter = () => {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                </Routes>
            </HashRouter>
        </>
    );
};

createRoot(document.getElementById("root")).render(<MainRouter />);
