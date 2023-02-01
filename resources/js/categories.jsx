import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Category from "./Category/Category";

const MainRouter = () => {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Category />} />
                </Routes>
            </HashRouter>
        </>
    );
};

createRoot(document.getElementById("root")).render(<MainRouter />);