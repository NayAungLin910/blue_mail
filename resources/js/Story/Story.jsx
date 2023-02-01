import React, { useState, useEffect } from "react";
import { api_url, baseUrl, cusaxios, fileAxios, showToast } from "../config";
import Spinner from "../Loading/Spinner";
import Paginator from "../Components/Paginator";
import ButtonLoading from "../Loading/ButtonLoading";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ConfirmBox from "../Components/ConfirmBox";

const Story = () => {
    // stories data
    const [stories, setStories] = useState({}); // paginated story data
    const [mainLoading, setMainLoading] = useState(true); // main loading
    const [page, setPage] = useState(1); // the page number for the story data pagination

    // filter options
    const [search, setSearch] = useState(window.initial_search); // search story by name
    const [filterOpen, setFilterOpen] = useState(false); // filter open and close toggle
    const [mmSearch, setMmSearch] = useState(""); // search story by mm name
    const [startDate, setStartDate] = useState(""); // to filter search the created date time range
    const [endDate, setEndDate] = useState("");
    const [searchLoading, setSearchLoading] = useState(false); // for search button loading
    const [filCategories, setFilCategories] = useState([]); // category filter option
    const [choseCategories, setChoseCategories] = useState(
        window.initial_category
    ); // chosen categories for filtering
    const [filCategoriesLoading, setFilCategoriesLoading] = useState(false); // category filter loading
    const [sortBy, setSortBy] = useState("latest"); // newest or oldest

    // confirm delete box
    const [openConfirm, setOpenConfirm] = useState(false); // open and close toggle state
    const [deleteElement, setDeleteElement] = useState({}); // selecting the delete element
    const [deleteLoading, setDeleteLoading] = useState(false); // delete process loading

    // make featured story
    const [featuredLoading, setFeaturedLoading] = useState(""); // the loading of the featured button

    // feature the story
    const featureStory = (slug) => {
        setFeaturedLoading(slug);
        cusaxios
            .post(`${api_url}/stories/make-feature`, { slug })
            .then(({ data }) => {
                setFeaturedLoading("");
                setStories((stories) => ({
                    ...stories,
                    data: stories.data.map((story) => {
                        if (story.slug === slug) {
                            return {
                                ...story,
                                featured: "yes",
                            };
                        } else {
                            return {
                                ...story,
                                featured: "no",
                            };
                        }
                    }),
                }));
                showToast(data.data, "success");
            })
            .catch(function (error) {
                setFeaturedLoading("");
                let data = error.response.data;
                if (data.errors.errors) {
                    showToast(data.errors.errors[0], "error");
                }
            });
    };

    // delete the story
    const deleteStory = () => {
        setDeleteLoading(true); // shows loading

        // fire a post request to delete the story
        cusaxios
            .post(`${api_url}/stories/delete`, {
                slug: deleteElement.slug,
            })
            .then(({ data }) => {
                // if success

                setDeleteLoading(false); // stop loading
                setOpenConfirm(false); // close the confirm box
                setStories((stories) => ({
                    ...stories,
                    data: stories.data.filter(
                        (story) => story.slug !== deleteElement.slug
                    ),
                })); // remove the deleted story
                setDeleteElement({}); // empty the delete element state
                showToast(data.data, "success"); // show the success notification
            })
            .catch(function (error) {
                // if failed

                setDeleteLoading(false); // stop loading
                setOpenConfirm(false); // close the confirm box
                setDeleteElement({}); // empty the delete element state

                let data = error.response.data;

                if (data.errors.slug) {
                    // if slug validation faild show error alert
                    showToast(data.errors.slug[0], "error");
                }

                if (data.errors.errors) {
                    // if special error show error alert
                    showToast(data.errors.errors[0], "error");
                }
            });
    };

    // clear filter
    const clearFilter = () => {
        setSearch("");
        setMmSearch("");
        setStartDate("");
        setEndDate("");
        setChoseCategories([]);
        setSortBy("latest");
    };

    // get category data for filter options
    const getFilCategoryData = () => {
        setFilCategoriesLoading(true);
        fileAxios
            .get(`${api_url}/categories/get/select/data`)
            .then(({ data }) => {
                setFilCategoriesLoading(false);
                setFilCategories(data.data);
            })
            .catch(function (error) {
                setFilCategoriesLoading(false);

                let res = error.response;
                showToast(res.data.message, "error");
            });
    };

    // get the stories data
    const getStories = () => {
        setMainLoading(true);
        setSearchLoading(true);
        cusaxios
            .get(
                `${api_url}/stories/get/data?search=${search}&mm_search=${mmSearch}&categories=${JSON.stringify(
                    choseCategories
                )}&sortby=${sortBy}&start_date=${startDate}&end_date=${endDate}&page=${page}`
            )
            .then(({ data }) => {
                setMainLoading(false);
                setSearchLoading(false);
                setStories(data.data);
            })
            .catch(function (error) {
                setMainLoading(false);
                setSearchLoading(false);

                let res = error.response;
                showToast(res.data.message, "error");
            });
    };

    useEffect(() => {
        getStories();
        getFilCategoryData();
    }, [page]);

    return (
        <div className="mt-4">
            <div
                className={`${
                    filterOpen || openConfirm
                        ? "opacity-50 blur-sm pointer-events-none duration-300"
                        : ""
                }`}
                id="main-body"
            >
                {/* title */}
                <div className="grid grid-cols-1">
                    <div className="flex items-center text-xl place-content-center gap-2">
                        <ion-icon name="book-outline"></ion-icon>
                        <span>{window.locale_stories}</span>
                    </div>
                </div>

                {/* search by english name */}
                <div className="flex flex-col lg:flex-row items-center gap-3 px-2 mt-3 mx-2">
                    <div className="lg:w-1/3 w-2/3">
                        <span className="whitespace-nowrap">
                            {window.locale_search_english_name}
                        </span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input-content"
                            placeholder={window.locale_english_name}
                        />
                    </div>
                    <div className="lg:mt-5">
                        {/* fire search request */}
                        <button
                            className={`sky-button-rounded ${
                                searchLoading ? "opacity-70" : ""
                            }`}
                            onClick={() => {
                                getStories();
                            }}
                            disabled={searchLoading}
                        >
                            <div className="flex items-center gap-1">
                                {searchLoading ? (
                                    <ButtonLoading />
                                ) : (
                                    <ion-icon name="search-outline"></ion-icon>
                                )}
                                {window.locale_search}
                            </div>
                        </button>
                    </div>
                    <div className="lg:mt-4">
                        {/* open filter */}
                        <button
                            className="sky-button-rounded"
                            onClick={() => {
                                setFilterOpen(!filterOpen);
                            }}
                        >
                            <div className="flex items-center gap-1">
                                <ion-icon name="filter-outline"></ion-icon>
                                {window.locale_filter}
                            </div>
                        </button>
                    </div>
                </div>

                {mainLoading ? (
                    <div className="flex place-content-center">
                        {/* main laoder */}
                        <div className="mt-14">
                            <Spinner width={350} height={350} />
                        </div>
                    </div>
                ) : (
                    <div>
                        {stories.data.length > 0 ? (
                            <div className="grid grid-cols-1 mt-2 lg:grid-cols-3 mx-2">
                                {/* if there are stories, map them and display each of them */}
                                {stories.data.map((story, index) => {
                                    return (
                                        <div
                                            key={story.slug}
                                            className="rounded-lg bg-gray-100 dark:bg-slate-600 p-4 my-3 mx-1 shadow-lg hover:shadow-xl hover:bg-gray-200 dark:hover:bg-gray-500"
                                        >
                                            <div className="flex place-content-center">
                                                <a
                                                    href={`${baseUrl}/stories/view/${story.slug}`}
                                                >
                                                    <img
                                                        src={`${baseUrl}${
                                                            story.image === ""
                                                                ? "/default_images/404.jpg"
                                                                : "/storage/" +
                                                                  story.image
                                                        }`}
                                                        alt={story.name}
                                                        className="rounded-lg"
                                                    />
                                                </a>
                                            </div>
                                            <div className="pt-2 text-center">
                                                {" "}
                                                <a
                                                    href={`${baseUrl}/stories/view/${story.slug}`}
                                                    className="text-lg hover:underline"
                                                >
                                                    {window.locale === "mm"
                                                        ? story.mm_name
                                                        : story.name}
                                                </a>
                                            </div>
                                            <div className="my-2 flex flex-wrap items-center gap-1">
                                                {story.categories.map(
                                                    (category, index) => {
                                                        return (
                                                            <a
                                                                className="sky-button py-1 px-1 text-sm"
                                                                key={
                                                                    category.id
                                                                }
                                                                href={`${baseUrl}/stories/search?category=${category.slug}`}
                                                            >
                                                                {window.locale ===
                                                                "mm"
                                                                    ? category.mm_name
                                                                    : category.name}
                                                            </a>
                                                        );
                                                    }
                                                )}
                                            </div>
                                            {window.type &&
                                                window.type === "admin" && (
                                                    <div className="flex items-center place-content-between">
                                                        <a
                                                            href={`${baseUrl}/admin/stories/edit/${story.slug}`}
                                                            className="sky-button p-1"
                                                        >
                                                            <div className="flex items-center gap-1">
                                                                <ion-icon name="create-outline"></ion-icon>
                                                                <span>
                                                                    {
                                                                        window.locale_edit
                                                                    }
                                                                </span>
                                                            </div>
                                                        </a>
                                                        <button
                                                            className={`${
                                                                featuredLoading ===
                                                                    story.slug ||
                                                                story.featured ===
                                                                    "yes"
                                                                    ? "opacity-70 hover:bg-green-600"
                                                                    : ""
                                                            } green-button py-1 px-2`}
                                                            onClick={() => {
                                                                featureStory(
                                                                    story.slug
                                                                );
                                                            }}
                                                            disabled={
                                                                featuredLoading ===
                                                                    story.slug ||
                                                                story.featured ===
                                                                    "yes"
                                                            }
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="flex items-center gap-1">
                                                                    {featuredLoading ===
                                                                        story.slug && (
                                                                        <ButtonLoading />
                                                                    )}
                                                                    {story.featured ===
                                                                    "yes" ? (
                                                                        <>
                                                                            {
                                                                                window.locale_featured
                                                                            }
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {
                                                                                window.locale_feature
                                                                            }
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </button>
                                                        <button
                                                            className="red-button py-1 px-2"
                                                            onClick={() => {
                                                                setOpenConfirm(
                                                                    true
                                                                );
                                                                setDeleteElement(
                                                                    story
                                                                );
                                                            }}
                                                        >
                                                            <div className="flex items-center">
                                                                <span className="text-lg mt-1">
                                                                    <ion-icon name="trash-bin-outline"></ion-icon>
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                )}

                                            <div className="text-xs text-right mt-3">
                                                {story.created_at}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex items-center place-content-center mt-5">
                                {/* if there are no stories */}
                                {window.locale_no_records}
                            </div>
                        )}

                        {/* paginator */}
                        {stories.data.length > 0 && (
                            <div className="flex place-content-center items-center">
                                <Paginator
                                    links={stories.links}
                                    current_page={stories.current_page}
                                    next_page_url={stories.next_page_url}
                                    prev_page_url={stories.prev_page_url}
                                    setPage={setPage}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* filter options div */}
            {filterOpen && (
                <div
                    className={`filter-options-div ${
                        !window.type || window.type === "user" ? "lg:left-[49vw] lg:top-[4.3rem] h-[100vw]" : ""
                    }`}
                >
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
                            {/* search story by myanmar name */}
                            <div className="px-4 py-2">
                                <span>{window.locale_search_mm_name}</span>
                                <input
                                    type="text"
                                    value={mmSearch}
                                    onChange={(e) => {
                                        setPage(1);
                                        setMmSearch(e.target.value);
                                    }}
                                    className="input-content"
                                    placeholder={window.locale_mm_name}
                                />
                            </div>

                            {/* the start date */}
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

                            {/* end date */}
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

                            {/* category filter options */}
                            <div className="px-4 py-2">
                                <span>{window.locale_filter_categories}</span>
                                <Select
                                    className={`focus:outline-none text-black focus:ring focus:ring-sky-400 my-1`}
                                    isDisabled={filCategoriesLoading}
                                    isLoading={filCategoriesLoading}
                                    closeMenuOnSelect={false}
                                    components={makeAnimated()}
                                    isMulti
                                    value={choseCategories}
                                    onChange={setChoseCategories}
                                    options={filCategories}
                                />
                            </div>

                            {/* sorty by newest or oldest */}
                            <div className="px-4 py-2">
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

            {/* delete confirm box */}
            {openConfirm && (
                <ConfirmBox
                    openConfirm={openConfirm}
                    setOpenConfirm={setOpenConfirm}
                    confirmElement={deleteElement}
                    setConfirmElement={setDeleteElement}
                    confrimLoading={deleteLoading}
                    confrimAction={deleteStory}
                >
                    {window.locale_sure_delete}
                </ConfirmBox>
            )}
        </div>
    );
};

export default Story;
