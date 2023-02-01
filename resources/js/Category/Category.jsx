import React, { useState, useEffect } from "react";
import ConfirmBox from "../Components/ConfirmBox";
import Paginator from "../Components/Paginator";
import { api_url, cusaxios, showToast } from "../config";
import ButtonLoading from "../Loading/ButtonLoading";
import Spinner from "../Loading/Spinner";

const Category = () => {
    // category create states
    const [name, setName] = useState("");
    const [mmName, setMmName] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // edit category states
    const [currentEdit, setCurrentEdit] = useState("");
    const [nameEdit, setNameEdit] = useState("");
    const [mmNameEdit, setMmNameEdit] = useState("");
    const [editButtonLoading, setEditButtonLoading] = useState(false);
    const [editErrors, setEditErrors] = useState({});

    const [page, setPage] = useState(1); // paginate current number

    // filter option states
    const [pageCount, setPageCount] = useState("10");
    const [search, setSearch] = useState("");
    const [searchMm, setSearchMm] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState("latest");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // delete confirm box
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmElement, setConfirmElement] = useState({});
    const [deleteLoading, setDeleteLoading] = useState(false);

    // categories table
    const [categories, setCategoires] = useState({});
    const [mainLoading, setMainLoading] = useState(true);

    // add a new category
    const addCategory = () => {
        setButtonLoading(true);
        cusaxios
            .post(`${api_url}/categories/create`, {
                // send post request to create a category
                name,
                mm_name: mmName,
            })
            .then(({ data }) => {
                setButtonLoading(false); // unload the button
                getCategoriesData(); // refresh the data in the category table
                setName(""); // clear the input fields
                setMmName("");
                showToast(data.data, "success"); // show the success toast
            })
            .catch(function (error) {
                setButtonLoading(false); // unload the button
                let data = error.response.data;
                setErrors(data.errors); // set the errors returned
                if (data.errors.errors) {
                    // if not validation error, show error toast
                    showToast(data.errors.errors[0], "error");
                }
            });
    };

    // confirm delete category
    const confirmDeleteCategory = () => {
        setDeleteLoading(true);
        cusaxios
            .post(`${api_url}/categories/delete`, {
                slug: confirmElement.slug,
            })
            .then(({ data }) => {
                setDeleteLoading(false);
                setOpenConfirm(false);
                setCategoires((categories) => ({
                    ...categories,
                    data: categories.data.filter(
                        (cat) => cat.slug !== confirmElement.slug
                    ),
                }));
                setConfirmElement({});
                showToast(data.data, "success");
            })
            .catch(function (error) {
                setDeleteLoading(false);
                setOpenConfirm(false);
                setConfirmElement({});

                let data = error.response.data;

                if (data.errors.slug) {
                    // if slug validation faild show error toast
                    showToast(data.errors.slug[0], "error");
                }

                if (data.errors.errors) {
                    // if not validation error, show error toast
                    showToast(data.errors.errors[0], "error");
                }
            });
    };

    // edit category
    const editCategory = () => {
        // show loading of save button
        setEditButtonLoading(true);

        let editData = new FormData();
        editData.append("name", nameEdit);
        editData.append("mm_name", mmNameEdit);
        editData.append("slug", currentEdit);

        // fire a post request with the name, mm name and slug of the category
        cusaxios
            .post(`${api_url}/categories/edit`, editData)
            .then(({ data }) => {
                // when request has been returned stop the save button loading
                setEditButtonLoading(false);
                let latestSlug = data.data.latest_slug;
                setCategoires((categories) => ({
                    ...categories,
                    data: categories.data.map((cat) => {
                        if (cat.slug === currentEdit) {
                            return {
                                ...cat,
                                name: nameEdit,
                                mm_name: mmNameEdit,
                                slug: latestSlug,
                            };
                        }
                        return cat;
                    }),
                }));

                // clear the edit name states
                setCurrentEdit("");
                setNameEdit("");
                setMmNameEdit("");
                showToast(data.data.message, "success");
            })
            .catch(function (error) {
                setEditButtonLoading(false);
                let data = error.response.data;
                setEditErrors(data.errors);
                if (data.errors.errors) {
                    // if not validation error, show error toast
                    showToast(data.errors.errors[0], "error");
                }
            });
    };

    // clear filter options
    const clearFilter = () => {
        setSearch("");
        setSearchMm("");
        setPageCount("10");
        setSortBy("latest");
        setStartDate("");
        setEndDate("");
    };

    // get the category data which is ran on page load
    const getCategoriesData = () => {
        cusaxios
            .get(
                `${api_url}/categories/get/data?page=${page}&search=${search}&searchMm=${searchMm}&sortBy=${sortBy}&startDate=${startDate}&endDate=${endDate}&pageCount=${pageCount}`
            )
            .then(({ data }) => {
                setMainLoading(false);
                setCategoires(data.data);
            });
    };

    // get the categories data
    useEffect(() => {
        getCategoriesData();
    }, [page, search, pageCount, searchMm, sortBy, startDate, endDate]);

    return (
        <div className="pt-4">
            {/* the blurry stage when filter options is opened */}
            <div
                className={`${
                    filterOpen || openConfirm
                        ? "opacity-50 blur-sm pointer-events-none duration-300"
                        : ""
                }`}
            >
                {/* create category */}
                <div className="flex justify-center items-center gap-3 w-full text-xl z-0">
                    <ion-icon
                        name="pricetag-outline"
                        className="mr-6 z-0"
                    ></ion-icon>
                    <span>{window.locale_categories}</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 mt-2 bg-slate-100 shadow-md dark:bg-slate-600 rounded-xl mx-4 p-2">
                    <div className="px-4 mx-auto my-2 w-full lg:mt-5 text-center lg:text-left">
                        <span className="whitespace-nowrap">
                            {window.locale === "mm" ? (
                                <>
                                    {window.locale_category} {window.locale_new}
                                </>
                            ) : (
                                <>
                                    {window.locale_new} {window.locale_category}
                                </>
                            )}
                        </span>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            placeholder={
                                window.locale_category_english_name_placeholder
                            }
                            className="input-content w-full "
                        />
                        {errors.name && (
                            <p className="text-red-500 dark:text-red-400 font-normal">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>
                    <div className="px-4 my-2 lg:pt-9">
                        <input
                            type="text"
                            name="mm_name"
                            value={mmName}
                            onChange={(e) => {
                                setMmName(e.target.value);
                            }}
                            placeholder={
                                window.locale_category_mm_name_placeholder
                            }
                            className="input-content w-full "
                        />
                        {errors.mm_name && (
                            <p className="text-red-500 dark:text-red-400 font-normal">
                                {errors.mm_name[0]}
                            </p>
                        )}
                    </div>
                    <div className="px-4 my-2 lg:pt-[2.4rem] lg:ml-0 text-center lg:text-left">
                        <button
                            type="button"
                            className="plus-button"
                            onClick={addCategory}
                            disabled={buttonLoading}
                        >
                            <div className="flex items-center">
                                {buttonLoading ? (
                                    <ButtonLoading cl={`py-1 px-0 m-0`} />
                                ) : (
                                    <span>+</span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                {/* filter open button */}
                <div className="px-4 py-1 mb-3">
                    <button
                        id="filter-toggle-button"
                        onClick={() => {
                            setFilterOpen(!filterOpen);
                        }}
                        className="sky-button-rounded mt-6"
                    >
                        <div className="flex items-center">
                            <span className="text-xl">
                                <ion-icon name="filter-outline"></ion-icon>
                            </span>
                            <span>{window.filter}</span>
                        </div>
                    </button>
                </div>

                {mainLoading ? (
                    <>
                        <div className="flex justify-center">
                            <Spinner width={200} height={200} />
                        </div>
                    </>
                ) : (
                    <>
                        {categories.data.length > 1 ? (
                            <>
                                {/* the main table */}
                                <div className="grid grid-cols-1 px-4">
                                    <div className="overflow-auto rounded-lg shadow-md">
                                        <table className="w-full border-collapse ">
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
                                                    <th className="p-3 w-auto text-sm font-semibold tracking-wide whitespace-nowrap text-left"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-gray-500">
                                                {categories.data.map(
                                                    (c, index) => (
                                                        <tr
                                                            className={`
                                                         bg-slate-100 dark:bg-slate-700 font-medium hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-500`}
                                                            key={c.slug}
                                                        >
                                                            {currentEdit ===
                                                            c.slug ? (
                                                                <>
                                                                    {/* show input types of name and mm_name when user wants to edit */}
                                                                    <td className="p-3 text-sm whitespace-nowrap">
                                                                        <input
                                                                            id="edit-input-form-name"
                                                                            className="input-content m-0"
                                                                            type="text"
                                                                            value={
                                                                                nameEdit
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                setNameEdit(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                );
                                                                            }}
                                                                        />
                                                                        {editErrors.name && (
                                                                            <p className="text-red-500 dark:text-red-400 font-normal">
                                                                                {
                                                                                    editErrors
                                                                                        .name[0]
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </td>
                                                                    <td className="p-3 text-sm whitespace-nowrap">
                                                                        <input
                                                                            id="edit-input-form-mm-name"
                                                                            className="input-content m-0"
                                                                            type="text"
                                                                            value={
                                                                                mmNameEdit
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                setMmNameEdit(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                );
                                                                            }}
                                                                        />
                                                                        {editErrors.mm_name && (
                                                                            <p className="text-red-500 dark:text-red-400 font-normal">
                                                                                {
                                                                                    editErrors
                                                                                        .mm_name[0]
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </td>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {/* show normal td element if the row is not being edited */}
                                                                    <td className="p-3 text-sm whitespace-nowrap">
                                                                        {c.name}
                                                                    </td>
                                                                    <td className="p-3 text-sm whitespace-nowrap">
                                                                        {
                                                                            c.mm_name
                                                                        }
                                                                    </td>
                                                                </>
                                                            )}
                                                            <td className="p-3 text-sm whitespace-nowrap">
                                                                {
                                                                    c.stories_count
                                                                }
                                                            </td>
                                                            <td className="p-3 text-sm whitespace-nowrap">
                                                                {c.created_at}
                                                            </td>
                                                            <td className="p-3 text-sm whitespace-nowrap">
                                                                <div className="flex item-center gap-4">
                                                                    {currentEdit ===
                                                                    c.slug ? (
                                                                        <div>
                                                                            {/* show the save button in edit mode */}
                                                                            <button
                                                                                className={`green-button py-1 px-2 ${
                                                                                    editButtonLoading
                                                                                        ? "opacity-70"
                                                                                        : ""
                                                                                }`}
                                                                                disabled={
                                                                                    editButtonLoading
                                                                                }
                                                                                onClick={() => {
                                                                                    {
                                                                                        /* fire post request to edit the category */
                                                                                    }
                                                                                    editCategory();
                                                                                }}
                                                                            >
                                                                                <div className="flex items-center">
                                                                                    <span className="text-lg mt-1">
                                                                                        {editButtonLoading ? (
                                                                                            <ButtonLoading cl="pr-1 py-1" />
                                                                                        ) : (
                                                                                            <ion-icon name="checkmark-outline"></ion-icon>
                                                                                        )}
                                                                                    </span>
                                                                                    <span>
                                                                                        {
                                                                                            window.locale_save
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            {/* show the edit option to user */}
                                                                            <button
                                                                                className="sky-button py-1 px-2"
                                                                                onClick={() => {
                                                                                    setCurrentEdit(
                                                                                        c.slug
                                                                                    );
                                                                                    setNameEdit(
                                                                                        c.name
                                                                                    );
                                                                                    setMmNameEdit(
                                                                                        c.mm_name
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <div className="flex items-center">
                                                                                    <span className="text-lg mt-1">
                                                                                        <ion-icon name="create-outline"></ion-icon>
                                                                                    </span>
                                                                                    <span>
                                                                                        {
                                                                                            window.locale_edit
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                    {currentEdit ===
                                                                    c.slug ? (
                                                                        <div>
                                                                            {/* if edit mode, show the user to cancel the edit mode */}
                                                                            <button
                                                                                className={`orange-button py-1 px-2 ${
                                                                                    editButtonLoading
                                                                                        ? "opacity-70"
                                                                                        : ""
                                                                                }`}
                                                                                onClick={() => {
                                                                                    setCurrentEdit(
                                                                                        ""
                                                                                    );
                                                                                    setNameEdit(
                                                                                        ""
                                                                                    );
                                                                                    setMmNameEdit(
                                                                                        ""
                                                                                    );
                                                                                }}
                                                                                disabled={
                                                                                    editButtonLoading
                                                                                }
                                                                            >
                                                                                <div className="flex items-center">
                                                                                    <span className="text-lg mt-1">
                                                                                        <ion-icon name="close-outline"></ion-icon>
                                                                                    </span>
                                                                                    <span>
                                                                                        {
                                                                                            window.locale_cancel
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            {/* if not edit mode show the user option to delete the category */}
                                                                            <button
                                                                                className="red-button py-1 px-2"
                                                                                onClick={() => {
                                                                                    setOpenConfirm(
                                                                                        !openConfirm
                                                                                    );
                                                                                    setConfirmElement(
                                                                                        c
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <div className="flex items-center">
                                                                                    <span className="text-lg mt-1">
                                                                                        <ion-icon name="trash-bin-outline"></ion-icon>
                                                                                    </span>
                                                                                </div>
                                                                            </button>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Paginator
                                        links={categories.links}
                                        current_page={categories.current_page}
                                        next_page_url={categories.next_page_url}
                                        prev_page_url={categories.prev_page_url}
                                        setPage={setPage}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 text-center mt-10 mb-2">
                                    <span className="text-xl">
                                        {window.locale_category_empty}
                                    </span>
                                </div>
                            </>
                        )}
                    </>
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
                            <div className="px-4 py-2">
                                <span>{window.locale_search_category}</span>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setPage(1);
                                        setSearch(e.target.value);
                                    }}
                                    className="input-content"
                                    placeholder={
                                        window.locale_category_english_name_placeholder
                                    }
                                />
                            </div>
                            <div className="px-4 py-2">
                                <span>{window.locale_search_category_mm}</span>
                                <input
                                    type="text"
                                    value={searchMm}
                                    onChange={(e) => {
                                        setPage(1);
                                        setSearchMm(e.target.value);
                                    }}
                                    className="input-content"
                                    placeholder={
                                        window.locale_category_mm_name_placeholder
                                    }
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
                                        <span>{window.locale_page_number}</span>
                                        <select
                                            onChange={(e) => {
                                                setPageCount(e.target.value);
                                            }}
                                            value={pageCount}
                                            name="pageCount"
                                            id="category-page-count"
                                            className="text-black px-1 w-14 focus:outline-none block mt-2 border border-sky-400 shadow-md"
                                        >
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                        </select>
                                    </div>
                                </div>
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

            {/* confirm box */}
            {openConfirm && (
                <ConfirmBox
                    setOpenConfirm={setOpenConfirm}
                    openConfirm
                    confirmElement={confirmElement}
                    setConfirmElement={setConfirmElement}
                    confrimLoading={deleteLoading}
                    confrimAction={confirmDeleteCategory}
                >
                    {window.locale_sure_delete}{" "}
                </ConfirmBox>
            )}
        </div>
    );
};

export default Category;
