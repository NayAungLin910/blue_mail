import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import StoryEdit from "./Story/StoryEdit";

const MainRouter = () => {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<StoryEdit />} />
                </Routes>
            </HashRouter>
        </>
    );
};

createRoot(document.getElementById("root")).render(<MainRouter />);