import React, { useState, useEffect } from "react";
import { api_url, baseUrl, cusaxios, showToast } from "../config";
import Spinner from "../Loading/Spinner";
import Paginator from "../Components/Paginator";

const MailStoryView = () => {
    const [mailStories, setMailStories] = useState([]); //  the paginated mailStories data
    const [mainLoading, setMainLoading] = useState(true); // paginated data loading
    const [page, setPage] = useState(1); // current page number

    // filter states
    const [filterOpen, setFilterOpen] = useState(false); // filter open
    const [search, setSearch] = useState(""); // search by eng name
    const [searchMm, setSearchMm] = useState(""); // search by mm name
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sortBy, setSortBy] = useState("latest"); // sort by latest or oldest

    // clear the filters
    const clearFilter = () => {
        setPage(1);
        setSearch("");
        setSearchMm("");
        setStartDate("");
        setEndDate("");
        setSortBy("latest");
    };

    // get paginated mail stories data
    const getMailStoriesData = () => {
        cusaxios
            .get(
                `${api_url}/mail-stories/get/data?page=${page}&search=${search}&searchMm=${searchMm}&startDate=${startDate}&endDate=${endDate}&sortBy=${sortBy}`
            )
            .then(({ data }) => {
                setMainLoading(false);
                setMailStories(data.data);
            })
            .catch(function (error) {
                setMainLoading(false);
                let res = error.response;
                showToast(res.data.message, "error"); // show error notification
            });
    };

    useEffect(() => {
        getMailStoriesData(); // get the paginated mailStories data
    }, [page, search, searchMm, sortBy, startDate, endDate]);

    return (
        <>
            <div
                className={`${
                    filterOpen
                        ? "opacity-50 blur-sm pointer-events-none duration-300"
                        : ""
                }`}
            >
                <div className=" flex place-content-center text-xl items-center pt-4 gap-1">
                    <ion-icon name="book-outline"></ion-icon>
                    {window.locale_mail_stories}
                </div>
                {mainLoading ? (
                    <div className="flex justify-center">
                        <Spinner width={200} height={200} />
                    </div>
                ) : (
                    <>
                        {mailStories.data.length > 0 ? (
                            <>
                                <button
                                    className="sky-button-rounded my-2"
                                    onClick={() => {
                                        setFilterOpen(!filterOpen);
                                    }}
                                >
                                    <div className="flex items-center gap-1">
                                        <ion-icon name="filter-outline"></ion-icon>
                                        {window.locale_filter}
                                    </div>
                                </button>
                                <div className="gird grid-cols-1">
                                    <div className="overflow-auto rounded-lg shadow-md">
                                        <table className="w-full">
                                            <thead className="bg-slate-800 text-white">
                                                <tr>
                                                    <th className="p-3 w-auto text-sm font-semibold tracking-wide whitespace-nowrap text-left">
                                                        {window.locale_name}
                                                    </th>
                                                    <th className="p-3 w-auto text-sm font-semibold tracking-wide whitespace-nowrap text-left">
                                                        {window.locale_mm_name}
                                                    </th>
                                                    <th className="p-3 w-auto text-sm font-semibold tracking-wide whitespace-nowrap text-left">
                                                        {
                                                            window.locale_stories_count
                                                        }
                                                    </th>
                                                    <th className="p-3 w-auto text-sm font-semibold tracking-wide whitespace-nowrap text-left">
                                                        {
                                                            window.locale_created_at
                                                        }
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-500">
                                                {mailStories.data.map((ms) => {
                                                    return (
                                                        <tr
                                                            className="bg-slate-100 dark:bg-slate-700 font-medium hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-500"
                                                            key={ms.id}
                                                        >
                                                            <td className="p-3 text-sm whitespace-nowrap text-sky-500 underline hover:text-white">
                                                                <a
                                                                    href={`${baseUrl}/admin/mail-stories/${ms.slug}`}
                                                                >
                                                                    {ms.name}
                                                                </a>
                                                            </td>
                                                            <td className="p-3 text-sm whitespace-nowrap">
                                                                {ms.mm_name}
                                                            </td>
                                                            <td className="p-3 text-sm whitespace-nowrap">
                                                                {
                                                                    ms.stories_count
                                                                }
                                                            </td>
                                                            <td className="p-3 text-sm whitespace-nowrap">
                                                                {ms.created_at}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Paginator
                                        links={mailStories.links}
                                        current_page={mailStories.current_page}
                                        next_page_url={
                                            mailStories.next_page_url
                                        }
                                        prev_page_url={
                                            mailStories.prev_page_url
                                        }
                                        setPage={setPage}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p className=" text-center mt-9">
                                    {window.locale_no_records}
                                </p>
                            </>
                        )}
                    </>
                )}
            </div>

            {/* filter options */}
            {filterOpen && (
                <div className="filter-options-div">
                    <div>
                        <div className="flex items-center gap-4">
                            <div>
                                {/* filter close */}
                                <button
                                    type="button"
                                    id="filter-options-close"
                                    onClick={() => {
                                        setFilterOpen(!filterOpen);
                                    }}
                                    className="sky-button-rounded pt-1 px-0 py-0 w-8 h-8"
                                >
                                    <span className="text-lg">
                                        <ion-icon name="close-outline"></ion-icon>
                                    </span>
                                </button>
                            </div>
                            <div>
                                {/* clear filter */}
                                <button
                                    type="button"
                                    id="filter-options-close"
                                    onClick={() => {
                                        clearFilter();
                                    }}
                                    className="sky-button-rounded"
                                >
                                    <div className="p-0 m-0 flex items-center">
                                        <div className="flex items-center">
                                            <span className="text-lg pt-1">
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </span>
                                            {window.locale_clear_filter}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* filter options */}
                        <div className="grid grid-cols-1 lg:text-left my-2">
                            <div className="px-4 py-2">
                                <span>{window.locale_name}</span>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setPage(1);
                                        setSearch(e.target.value);
                                    }}
                                    className="input-content"
                                />
                            </div>
                            <div className="px-4 py-2">
                                <span>{window.locale_mm_name}</span>
                                <input
                                    type="text"
                                    value={searchMm}
                                    onChange={(e) => {
                                        setPage(1);
                                        setSearchMm(e.target.value);
                                    }}
                                    className="input-content"
                                />
                            </div>
                            <div className="px-4 py-2 text-left">
                                <span>{window.locale_start_date}</span>
                                <input
                                    name="startDate"
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                    }}
                                    className="input-content"
                                />
                            </div>
                            <div className="px-4 py-2 text-left">
                                <span>{window.locale_end_date}</span>
                                <input
                                    name="endDate"
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                    }}
                                    className="input-content"
                                />
                            </div>
                            <div className="px-4 py-2 text-left">
                                <div className="flex gap-5">
                                    <div>
                                        <span>{window.locale_sort_by}</span>
                                        <select
                                            onChange={(e) => {
                                                setSortBy(e.target.value);
                                            }}
                                            value={sortBy}
                                            name="sortBy"
                                            id="category-sort-by-select"
                                            className="text-black px-1 w-23 focus:outline-none block mt-2 border border-sky-400 shadow-md"
                                        >
                                            <option value="latest">
                                                {window.locale_latest}
                                            </option>
                                            <option value="oldest">
                                                {window.locale_oldest}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MailStoryView;
