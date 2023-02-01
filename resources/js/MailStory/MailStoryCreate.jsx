import React, { useState, useEffect } from "react";
import { api_url, baseUrl, cusaxios, fileAxios, showToast } from "../config";
import Spinner from "../Loading/Spinner";
import ConfirmBox from "../Components/ConfirmBox";
import Paginator from "../Components/Paginator";
import ButtonLoading from "../Loading/ButtonLoading";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const MailStoryCreate = () => {
    // stories data
    const [stories, setStories] = useState({}); // paginated story data
    const [mainLoading, setMainLoading] = useState(true); // main loading
    const [page, setPage] = useState(1); // the page number for the story data pagination

    // filter options
    const [search, setSearch] = useState(""); // search story by name
    const [filterOpen, setFilterOpen] = useState(false); // filter open and close toggle
    const [mmSearch, setMmSearch] = useState(""); // search story by mm name
    const [startDate, setStartDate] = useState(""); // to filter search the created date time range
    const [endDate, setEndDate] = useState("");
    const [searchLoading, setSearchLoading] = useState(false); // for search button loading
    const [filCategories, setFilCategories] = useState([]); // category filter option
    const [choseCategories, setChoseCategories] = useState([]); // chosen categories for filtering
    const [filCategoriesLoading, setFilCategoriesLoading] = useState(false); // category filter loading
    const [sortBy, setSortBy] = useState("latest"); // newest or oldest
    const [errors, setErrors] = useState([]); // the errors

    // chosen stories
    const [chosenStories, setChosenStories] = useState([]); // the selected stories
    const [mailStoryName, setMailStoryName] = useState(""); // mail story name
    const [mailStoryMmName, setMailStoryMmName] = useState(""); // mail story mm name

    // open confirm for sending the stories through mail
    const [openConfirm, setOpenConfirm] = useState(false); // open and close toggle state
    const [confirmSend, setConfirmSend] = useState({}); // selecting the delete element
    const [sendLoading, setSendLoading] = useState(false); // delete process loading

    // send mail with the chosen stories to the users
    const sendMailStory = () => {
        setSendLoading(true); // loading

        const sendMailStoryData = new FormData();

        const storiesSlugs = chosenStories.map((cstory) => cstory.slug); // get the chosen stories slug array

        sendMailStoryData.append("storiesSlugs", JSON.stringify(storiesSlugs)); // data of chosen stories
        sendMailStoryData.append("name", mailStoryName); // the name of the mailstory
        sendMailStoryData.append("mm_name", mailStoryMmName); // the mm name of the mailStory
        sendMailStoryData.append("admin_id", window.auth.id); // the admin id

        cusaxios
            .post(`${api_url}/mail-stories/create`, sendMailStoryData)
            .then(({ data }) => {
                // if success
                setChosenStories([]); // clear the related states
                setMailStoryName("");
                setMailStoryMmName(""); 
                setOpenConfirm(false); // close the confirm box
                setSendLoading(false); // stop loading
                showToast(data.data, "success"); // alert success message
            })
            .catch(function (error) {
                // if failed
                setOpenConfirm(false); // close the confirm box
                setSendLoading(false); // stop loading
                let data = error.response.data;
                setErrors(data.errors);
                if (data.errors.errors) {
                    // if there is special error
                    showToast(data.errors.errors[0], "error"); // show eror toast
                }
            });
    };

    // choose the story
    const chooseStory = (story) => {
        if (
            !chosenStories.some(
                (chosenStory) => chosenStory.slug === story.slug
            )
        ) {
            // if there is no duplicate story, add the story to be chosen
            setChosenStories((chosenStories) => [...chosenStories, story]);
        }
    };

    // deselect the story from being chosen
    const deselectStory = (story) => {
        if (
            chosenStories.some((chosenStory) => chosenStory.slug === story.slug)
        ) {
            // if the sotry is chosen deselect the story
            setChosenStories((chosenStories) =>
                chosenStories.filter(
                    (chosenStory) => chosenStory.slug !== story.slug
                )
            );
        }
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
        <div className="">
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
                    <div className="flex mt-4 items-center text-xl place-content-center gap-2">
                        <ion-icon name="book-outline"></ion-icon>
                        <span className="">
                            {window.locale_mail_story_create}
                        </span>
                    </div>
                </div>

                {/* chosen sotries */}
                <div className="m-2 px-2">
                    <p>{window.locale_chosen_stories}</p>
                    <div className="p-3">
                        {chosenStories.length > 0 ? (
                            <div className="rounded-xl bg-slate-100  dark:bg-slate-600 p-3 items-center flex flex-wrap place-content-center lg:place-content-start gap-2">
                                {chosenStories.map((chosenStory) => (
                                    <div
                                        key={chosenStory.slug}
                                        className="flex gap-1 group/story max-w-[13rem] items-center bg-slate-50 dark:bg-slate-700 pr-1 rounded-lg shadow-md"
                                    >
                                        <div>
                                            <img
                                                className="w-24 h-10 object-cover rounded-l-lg"
                                                src={`${baseUrl}${
                                                    chosenStory.image === ""
                                                        ? "/default_images/404.jpg"
                                                        : "/storage/" +
                                                          chosenStory.image
                                                }`}
                                                alt={
                                                    window.locale === "mm"
                                                        ? chosenStory.mm_name
                                                        : chosenStory.name
                                                }
                                            />
                                        </div>
                                        <div className="text-sm max-w-[8rem] text-ellipsis whitespace-nowrap overflow-hidden">
                                            {window.locale === "mm"
                                                ? chosenStory.mm_name
                                                : chosenStory.name}
                                        </div>
                                        <div className="relative right-9 lg:hidden w-0 shadown-none lg:group-hover/story:block">
                                            <button
                                                className="red-button"
                                                onClick={() => {
                                                    deselectStory(chosenStory);
                                                }}
                                            >
                                                <ion-icon name="close-outline"></ion-icon>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex w-full flex-col place-content-center items-center">
                                    <p>{window.locale_english_name}</p>
                                    <input
                                        value={mailStoryName}
                                        onChange={(e) => {
                                            setMailStoryName(e.target.value);
                                        }}
                                        type="text"
                                        className="input-content w-1/2"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 dark:text-red-400 font-normal">
                                            {errors.name[0]}
                                        </p>
                                    )}
                                </div>
                                <div className="flex w-full flex-col place-content-center items-center">
                                    <p>{window.locale_mm_name}</p>
                                    <input
                                        value={mailStoryMmName}
                                        onChange={(e) => {
                                            setMailStoryMmName(e.target.value);
                                        }}
                                        type="text"
                                        className="input-content w-1/2"
                                    />
                                    {errors.mm_name && (
                                        <p className="text-red-500 dark:text-red-400 font-normal">
                                            {errors.mm_name[0]}
                                        </p>
                                    )}
                                </div>
                                <div className="flex w-full place-content-center items-center mt-2">
                                    <button
                                        className="green-button"
                                        onClick={() => {
                                            setOpenConfirm(true);
                                            setConfirmSend({ name: "" });
                                        }}
                                    >
                                        <div className="flex items-center gap-1">
                                            <ion-icon name="mail-outline"></ion-icon>
                                            {window.locale_send}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm">
                                    {window.locale_no_records}
                                </p>
                            </>
                        )}
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
                                                                href={`${baseUrl}/categories/${category.slug}`}
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
                                            {!chosenStories.some(
                                                (chosenStory) =>
                                                    chosenStory.slug ===
                                                    story.slug
                                            ) ? (
                                                <button
                                                    className="text-sm green-button p-1"
                                                    onClick={() => {
                                                        chooseStory(story);
                                                    }}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        <ion-icon name="add-outline"></ion-icon>
                                                        {window.locale_select}
                                                    </div>
                                                </button>
                                            ) : (
                                                <button
                                                    className="text-sm orange-button p-1"
                                                    onClick={() => {
                                                        deselectStory(story);
                                                    }}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        <ion-icon name="close-outline"></ion-icon>
                                                        {window.locale_deselect}
                                                    </div>
                                                </button>
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

            {/* send confirm box */}
            {openConfirm && (
                <ConfirmBox
                    openConfirm={openConfirm}
                    setOpenConfirm={setOpenConfirm}
                    confirmElement={confirmSend}
                    setConfirmElement={setConfirmSend}
                    confrimLoading={sendLoading}
                    confrimAction={sendMailStory}
                >
                    {window.locale_sure_send}
                </ConfirmBox>
            )}
        </div>
    );
};

export default MailStoryCreate;
