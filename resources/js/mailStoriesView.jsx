import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import MailStoryView from "./MailStory/MailStoryView";

const MainRouter = () => {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<MailStoryView />} />
                </Routes>
            </HashRouter>
        </>
    );
};

createRoot(document.getElementById("root")).render(<MainRouter />);
