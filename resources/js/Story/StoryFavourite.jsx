import React, { useState, useEffect } from "react";
import { api_url, showToast, cusaxios } from "../config";

const StoryFavourite = () => {
    const [star, setStar] = useState(false);
    const [loading, setLoading] = useState(false);

    const starTheStory = () => {
        setLoading(true);
        cusaxios
            .post(`${api_url}/users/star-the-story`, {
                slug: window.story_slug,
                user_type: window.type,
                user_id: window.auth.id,
            })
            .then(({ data }) => {
                setStar(data.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                let data = error.response.data;
                if (data.errors) {
                    showToast(Object.values(data.errors)[0], "error");
                }
            });
    };

    const checkStar = (abort) => {
        setLoading(true);
        cusaxios
            .post(
                `${api_url}/users/check-star`,
                {
                    slug: window.story_slug,
                    user_type: window.type,
                    user_id: window.auth.id,
                },
                {
                    signal: abort.signal,
                }
            )
            .then(({ data }) => {
                setStar(data.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                let data = error.response.data;
                if (data.errors) {
                    showToast(Object.values(data.errors)[0], "error");
                }
            });
    };

    useEffect(() => {
        const myAbortController = new AbortController();
        checkStar(myAbortController);

        return () => {
            myAbortController.abort();
        };
    }, []);

    return (
        <>
            <div className="mt-1 group/star relative">
                {!loading && (
                    <div className="hidden group-hover/star:block absolute top-4 right-4  shadow-md bg-slate-100 text-black rounded py-1 px-2 text-xs z-10">
                        <span className="whitespace-nowrap">
                            {star ? (
                                <>{window.locale_take_star}</>
                            ) : (
                                <>{window.locale_give_star}</>
                            )}
                        </span>
                    </div>
                )}

                <button
                    className={`text-xl text-yellow-500 ${
                        loading ? "animate-pulse" : "cursor-pointer"
                    }`}
                    disabled={loading}
                    onClick={(e) => {
                        starTheStory();
                    }}
                >
                    <ion-icon name={`star${star ? "" : "-outline"}`}></ion-icon>
                </button>
            </div>
        </>
    );
};

export default StoryFavourite;
