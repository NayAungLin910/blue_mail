import React, { useState, useEffect } from "react";
import { api_url, baseUrl, cusaxios, showToast } from "../config";
import Spinner from "../Loading/Spinner";

const Welcome = () => {
    const [mainLoading, setMainLoading] = useState(true);
    const [featuredStory, setFeaturedStory] = useState({});
    const [latestStories, setLatestStories] = useState([]);
    const [businessStories, setBusinessStories] = useState([]);
    const [sportsStories, setSportsStories] = useState([]);

    const getDataHomePage = () => {
        cusaxios
            .get(`${api_url}/home/get/data`)
            .then(({ data }) => {
                setMainLoading(false);
                setFeaturedStory(data.data.featured);
                setLatestStories(data.data.latest);
                setBusinessStories(data.data.businesses);
                setSportsStories(data.data.sports);
            })
            .catch(function (error) {
                console.log(error);
                setMainLoading(false);
                let data = error.response.data;
                if (data.errors.errors) {
                    showToast(data.errors.errors[0], "error");
                }
            });
    };

    useEffect(() => {
        getDataHomePage(); // get the homepage data
    }, []);

    return (
        <div>
            {mainLoading ? (
                <div className="flex place-content-center">
                    {/* main laoder */}
                    <div className="mt-14">
                        <Spinner width={350} height={350} />
                    </div>
                </div>
            ) : (
                <div className="mt-3">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {featuredStory ? (
                            <div className="">
                                <div className="py-1 px-2">
                                    <a
                                        className="text-center"
                                        href={`${baseUrl}/stories/view/${featuredStory.slug}`}
                                    >
                                        <div className="flex place-content-center">
                                            <img
                                                className="rounded-lg lg:w-3/4"
                                                src={`${baseUrl}/storage/${featuredStory.image}`}
                                                alt={featuredStory.name}
                                            />
                                        </div>
                                    </a>
                                </div>
                                <div className=" text-center">
                                    <a
                                        href={`${baseUrl}/stories/view/${featuredStory.slug}`}
                                        className="hover:underline text-lg"
                                    >
                                        {window.locale === "mm"
                                            ? featuredStory.mm_name
                                            : featuredStory.name}
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-center">
                                    {window.locale_no_story}
                                </h3>
                            </div>
                        )}

                        <div className="mt-3 lg:mt-0">
                            <div className="text-center text-lg">
                                {window.locale_latest_news}
                            </div>
                            <div className="px-2">
                                {latestStories.map((ls) => (
                                    <a
                                        href={`${baseUrl}/stories/view/${ls.slug}`}
                                        key={ls.id}
                                    >
                                        <div className="flex items-center my-1 gap-2 hover:dark:bg-slate-600 hover:shadow-md hover:bg-slate-100 rounded-2xl pr-1">
                                            <img
                                                className="rounded-2xl w-24"
                                                src={`${baseUrl}/storage/${ls.image}`}
                                                alt={ls.name}
                                            />
                                            <h3 className="text-base hover:underline">
                                                {window.locale === "mm"
                                                    ? ls.mm_name
                                                    : ls.name}
                                            </h3>
                                        </div>
                                    </a>
                                ))}
                                {latestStories.length <= 0 && (
                                    <p className="text-center m-2">
                                        {window.locale_no_story}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="px-2">
                        <hr className="bg-slate-300 opacity-70 h-[0.05rem] border-none rounded my-2" />
                    </div>
                    <div className="py-2 px-2 grid grid-cols-1 lg:grid-cols-2">
                        <div>
                            <div className="text-center text-lg">
                                {window.locale_business_news}
                            </div>
                            {businessStories.map((bs) => (
                                <a
                                    href={`${baseUrl}/stories/view/${bs.slug}`}
                                    key={bs.id}
                                >
                                    <div className="flex items-center my-1 gap-2 hover:dark:bg-slate-600 hover:shadow-md hover:bg-slate-100 rounded-2xl pr-1">
                                        <img
                                            className="rounded-2xl w-24"
                                            src={`${baseUrl}/storage/${bs.image}`}
                                            alt={bs.name}
                                        />
                                        <h3 className="text-base hover:underline">
                                            {window.locale === "mm"
                                                ? bs.mm_name
                                                : bs.name}
                                        </h3>
                                    </div>
                                </a>
                            ))}
                            {businessStories.length <= 0 && (
                                <p className="text-center m-2">
                                    {window.locale_no_story}
                                </p>
                            )}
                        </div>
                        <div>
                            <div className="text-center text-lg">
                                {window.locale_sports_news}
                            </div>
                            {sportsStories.map((ss) => (
                                <a
                                    href={`${baseUrl}/stories/view/${ss.slug}`}
                                    key={ss.id}
                                >
                                    <div className="flex items-center my-1 gap-2 hover:dark:bg-slate-600 hover:shadow-md hover:bg-slate-100 rounded-2xl pr-1">
                                        <img
                                            className="rounded-2xl w-24"
                                            src={`${baseUrl}/storage/${ss.image}`}
                                            alt={ss.name}
                                        />
                                        <h3 className="text-base hover:underline">
                                            {window.locale === "mm"
                                                ? ss.mm_name
                                                : ss.name}
                                        </h3>
                                    </div>
                                </a>
                            ))}
                             {sportsStories.length <= 0 && (
                                <p className="text-center m-2">
                                    {window.locale_no_story}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Welcome;
