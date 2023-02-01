import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Story from "./Story/Story";

const MainRouter = () => {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Story />} />
                </Routes>
            </HashRouter>
        </>
    );
};

createRoot(document.getElementById("root")).render(<MainRouter />);