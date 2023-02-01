import React, { useState, useEffect, useRef } from "react";
import { api_url, cusaxios, showToast, fileAxios } from "../config";
import Spinner from "../Loading/Spinner";
import ButtonLoading from "../Loading/ButtonLoading";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StoryEdit = () => {
    const [mainLoading, setMainLoading] = useState(true);
    const [story, setStory] = useState({});
    const [storyCategories, setStoryCategories] = useState([]);
    const [categories, setCategoires] = useState([]);
    const [image, setImage] = useState(null);
    const imageRef = useRef(null);
    const [errors, setErrors] = useState([]);
    const [updateLoading, setUpdateLoading] = useState(false);

    const updateStory = () => {
        // update the story by firing the post request

        setUpdateLoading(true); // show loading

        const formData = new FormData();
        formData.append("name", story.name);
        formData.append("mm_name", story.mm_name);
        formData.append("description", story.description);
        formData.append("mm_description", story.mm_description);
        formData.append("categories", JSON.stringify(storyCategories));
        formData.append("slug", story.slug);
        formData.append("admin_id", window.auth.id);
        if (image) {
            // if the new image is selected
            formData.append("image", image);
        }

        // fire the post request
        fileAxios
            .post(`${api_url}/stories/update`, formData)
            .then(({ data }) => {
                // if success
                setUpdateLoading(false); // stop loading
                showToast(data.data.message, "success"); // show success alert
            })
            .catch(function (error) {
                setUpdateLoading(false); // stop loading
                let data = error.response.data;
                setErrors(data.errors); // set the errors to show what is wrong
                if (data.errors.errors) {
                    // if there is special error
                    showToast(data.errors.errors[0], "error"); // show eror alert
                }
            });
    };

    // get the story data based on the slug of the story
    const getStoryAndCategoryData = () => {
        cusaxios
            .post(`${api_url}/stories/edit/get-data`, {
                slug: window.story_slug,
            })
            .then(({ data }) => {
                setMainLoading(false); // stop loading
                setStory(data.data.story); // set the returned story data
                data.data.story.categories.map((category) => {
                    setStoryCategories((storyCategories) => {
                        return [
                            ...storyCategories,
                            {
                                value: category.id,
                                label: category.name,
                            },
                        ];
                    }); // map the categories and update the storyCategories state
                });
                // set the categories to provide the categories options to the user
                setCategoires(data.data.categories);
            })
            .catch(function (error) {
                setMainLoading(false);
                let data = error.response.data;
                setErrors(data.errors);
                if (data.errors.errors) {
                    // if there is special error
                    showToast(data.errors.errors[0], "error"); // show eror toast
                }
            });
    };

    useEffect(() => {
        getStoryAndCategoryData(); // get the story data
    }, []);

    return (
        <div className="mt-4">
            {mainLoading ? (
                <div className="flex place-content-center items-center pt-36">
                    <Spinner width={400} height={400} />
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3 place-content-center text-xl">
                        {window.locale === "mm" ? story.mm_name : story.name}
                    </div>
                    <div
                        className={`grid grid-cols-1 my-3 mx-2 ${
                            updateLoading
                                ? "opacity-70 pointer-events-none"
                                : ""
                        }`}
                    >
                        <div className="rounded-3xl w-auto bg-slate-100 dark:bg-slate-600 dark:text-white py-3 px-7 shadow-md">
                            <div className="py-2">
                                <p>{window.locale_name}</p>
                                <input
                                    value={story.name}
                                    onChange={(e) => {
                                        setStory((story) => ({
                                            ...story,
                                            name: e.target.value,
                                        }));
                                    }}
                                    disabled={updateLoading}
                                    type="text"
                                    className="input-content lg:w-1/2"
                                />
                                {errors.name && (
                                    <p className="text-red-500 dark:text-red-400 font-normal">
                                        {errors.name[0]}
                                    </p>
                                )}
                            </div>
                            <div className="py-2">
                                <p>{window.locale_mm_name}</p>
                                <input
                                    type="text"
                                    className="input-content lg:w-1/2"
                                    value={story.mm_name}
                                    onChange={(e) => {
                                        setStory((story) => ({
                                            ...story,
                                            mm_name: e.target.value,
                                        }));
                                    }}
                                    disabled={updateLoading}
                                />
                                {errors.mm_name && (
                                    <p className="text-red-500 dark:text-red-400 font-normal">
                                        {errors.mm_name[0]}
                                    </p>
                                )}
                            </div>
                            <div className="py-2">
                                <p>{window.locale_categories}</p>
                                <div className="text-black">
                                    <Select
                                        className="focus:outline-none focus:ring focus:ring-sky-400 lg:w-1/2 my-1"
                                        closeMenuOnSelect={false}
                                        components={makeAnimated()}
                                        isMulti
                                        value={storyCategories}
                                        onChange={setStoryCategories}
                                        options={categories}
                                        isDisabled={updateLoading}
                                    />
                                </div>
                                {errors.categories && (
                                    <p className="text-red-500 dark:text-red-400 font-normal">
                                        {errors.categories[0]}
                                    </p>
                                )}
                            </div>
                            <div className="py-2">
                                <p className="mb-1">
                                    {window.locale === "mm"
                                        ? `${window.locale_image}${window.locale_new}`
                                        : `${window.locale_new} ${window.locale_image}`}
                                </p>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                    }}
                                    className="input-file"
                                    ref={imageRef}
                                    disabled={updateLoading}
                                />
                                {errors.image && (
                                    <p className="text-red-500 dark:text-red-400 font-normal">
                                        {errors.image[0]}
                                    </p>
                                )}
                            </div>
                            <div className="py-2">
                                <p>{window.locale_description}</p>
                                <div className="bg-white text-black my-1">
                                    <ReactQuill
                                        theme="snow"
                                        value={story.description}
                                        onChange={(e) => {
                                            setStory((story) => ({
                                                ...story,
                                                description: e,
                                            }));
                                        }}
                                        readOnly={updateLoading}
                                        className="w-full h-full"
                                    />
                                </div>
                                {errors.description && (
                                    <p className="text-red-500 dark:text-red-400 font-normal">
                                        {errors.description[0]}
                                    </p>
                                )}
                            </div>
                            <div className="py-2">
                                <p>{window.locale_mm_description}</p>
                                <div className="bg-white text-black my-1">
                                    <ReactQuill
                                        theme="snow"
                                        value={story.mm_description}
                                        onChange={(e) => {
                                            setStory((story) => ({
                                                ...story,
                                                mm_description: e,
                                            }));
                                        }}
                                        readOnly={updateLoading}
                                        className="w-full h-full"
                                    />
                                </div>
                                {errors.mm_description && (
                                    <p className="text-red-500 dark:text-red-400 font-normal">
                                        {errors.mm_description[0]}
                                    </p>
                                )}
                            </div>
                            <div className="py-2 text-center">
                                <button
                                    className={`sky-button-rounded ${
                                        updateLoading ? "opacity-70" : ""
                                    }`}
                                    disabled={updateLoading}
                                    onClick={updateStory}
                                >
                                    <div className="flex items-center gap-1">
                                        {updateLoading ? (
                                            <ButtonLoading cl="pr-1 py-1" />
                                        ) : (
                                            <ion-icon name="create-outline"></ion-icon>
                                        )}

                                        <span>{window.locale_save}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default StoryEdit;
