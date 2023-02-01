import React from "react";

const Paginator = ({
    links,
    setPage,
    current_page,
    next_page_url,
    prev_page_url,
}) => {
    return (
        <div className="flex items-center place-content-center gap-4 my-3">
            <button
                disabled={!prev_page_url}
                className={`paginator-button ${
                    !prev_page_url ? "opacity-50 bg-slate-400 pointer-events-none" : ""
                }`}
                onClick={() => {
                    setPage(current_page - 1);
                }}
            >
                &#60;
            </button>

            {links.map((l, index) => {
                if (index !== 0 && index !== links.length - 1) {
                    return (
                        <div key={index}>
                            <button
                                disabled={current_page == l.label}
                                className={`paginator-button ${
                                    current_page == l.label
                                        ? "opacity-50 bg-slate-400 pointer-events-none"
                                        : ""
                                }`}
                                onClick={() => {
                                    setPage(l.label);
                                }}
                            >
                                {l.label}
                            </button>
                        </div>
                    );
                }
            })}

            <button
                disabled={!next_page_url}
                className={`paginator-button ${
                    !next_page_url ? "opacity-50 bg-slate-400 pointer-events-none" : ""
                }`}
                onClick={() => {
                    setPage(current_page + 1);
                }}
            >
                &#62;
            </button>
        </div>
    );
};

export default Paginator;
