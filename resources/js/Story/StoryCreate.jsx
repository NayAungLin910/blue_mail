import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { api_url, fileAxios, showToast } from "../config";
import ButtonLoading from "../Loading/ButtonLoading";
import Spinner from "../Loading/Spinner";

const StoryCreate = () => {
    const [name, setName] = useState("");
    const [mmName, setMmName] = useState("");
    const [description, setDescription] = useState("");
    const [mmDescription, setMmDescription] = useState("");
    const [category, setCategory] = useState([]);
    const [categories, setCategoires] = useState([]);
    const [mainLoading, setMainLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const imageRef = useRef(null);

    const getCategories = () => {
        // get the categories data for the category selection of the story
        fileAxios
            .get(`${api_url}/categories/get/select/data`)
            .then(({ data }) => {
                setMainLoading(false);
                setCategoires(data.data);
            });
    };

    const createStory = () => {
        // post request to create new

        setCreateLoading(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("mm_name", mmName);
        formData.append("description", description);
        formData.append("mm_description", mmDescription);
        formData.append("categories", JSON.stringify(category));
        formData.append("image", image);
        formData.append("admin_id", window.auth.id);

        // fire post request with the necessary story data
        fileAxios
            .post(`${api_url}/stories/create`, formData)
            .then(({ data }) => {
                setCreateLoading(false); // stop loading
                clearStates();
                showToast(data.data.message, "success"); // show toast success
            })
            .catch(function (error) {
                setCreateLoading(false); // stop loading
                let data = error.response.data;
                setErrors(data.errors); // show the validation errors
                if (data.errors.errors) {
                    // if there is special error
                    showToast(data.errors.errors[0], "error"); // show eror toast
                }
            });
    };

    const clearStates = () => {
        setName("");
        setMmName("");
        setDescription("");
        setMmDescription("");
        setImage(null);
        imageRef.current.value = null;
        setCategory([]);
        setErrors([]);
    };

    const handleImageSelect = (event) => {
        setImage(event.target.files[0]);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="mt-4">
            <div className="flex items-center gap-3 place-content-center text-xl">
                <ion-icon name="book-outline"></ion-icon>
                {window.story_create}
            </div>
            {mainLoading ? (
                <>
                    <div className="flex place-content-center mt-32">
                        <Spinner width={200} height={200} />
                    </div>
                </>
            ) : (
                <div
                    className={`grid grid-cols-1 p-3 my-2 ${
                        createLoading ? "opacity-70 pointer-events-none" : ""
                    }`}
                >
                    <div className="rounded-3xl w-auto bg-slate-100 dark:bg-slate-600 dark:text-white py-3 px-7 shadow-md">
                        <div className="py-2">
                            <p>{window.name}</p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                placeholder="Name"
                                className="input-content lg:w-1/2"
                            />
                            {errors.name && (
                                <p className="text-red-500 dark:text-red-400 font-normal">
                                    {errors.name[0]}
                                </p>
                            )}
                        </div>
                        <div className="py-2">
                            <p>{window.mm_name}</p>
                            <input
                                type="text"
                                value={mmName}
                                onChange={(e) => {
                                    setMmName(e.target.value);
                                }}
                                placeholder="MM Name"
                                className="input-content lg:w-1/2"
                            />
                            {errors.mm_name && (
                                <p className="text-red-500 dark:text-red-400 font-normal">
                                    {errors.mm_name[0]}
                                </p>
                            )}
                        </div>
                        <div className="py-2">
                            <p>{window.categories}</p>
                            <div className="text-black">
                                <Select
                                    className="focus:outline-none focus:ring focus:ring-sky-400 lg:w-1/2 my-1"
                                    closeMenuOnSelect={false}
                                    components={makeAnimated()}
                                    isMulti
                                    value={category}
                                    onChange={setCategory}
                                    options={categories}
                                />
                            </div>
                            {errors.categories && (
                                <p className="text-red-500 dark:text-red-400 font-normal">
                                    {errors.categories[0]}
                                </p>
                            )}
                        </div>
                        <div className="py-2">
                            <p className="mb-1">{window.image}</p>
                            <input
                                type="file"
                                onChange={handleImageSelect}
                                className="input-file"
                                ref={imageRef}
                            />
                            {errors.image && (
                                <p className="text-red-500 dark:text-red-400 font-normal">
                                    {errors.image[0]}
                                </p>
                            )}
                        </div>
                        <div className="py-2">
                            <p>{window.description}</p>
                            <div className="bg-white text-black my-1">
                                <ReactQuill
                                    theme="snow"
                                    value={description}
                                    onChange={setDescription}
                                    className="w-full h-full"
                                />
                            </div>
                            {/* redering the raw html code back */}
                            {/* {
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            ></div>
                        } */}
                            {errors.description && (
                                <p className="text-red-500 dark:text-red-400 font-normal">
                                    {errors.description[0]}
                                </p>
                            )}
                        </div>
                        <div className="py-2">
                            <p>{window.mm_description}</p>
                            <div className="bg-white text-black my-1">
                                <ReactQuill
                                    theme="snow"
                                    value={mmDescription}
                                    onChange={setMmDescription}
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
                                    createLoading ? "opacity-70" : ""
                                }`}
                                onClick={createStory}
                                disabled={createLoading}
                            >
                                <div className="flex items-center gap-1">
                                    {createLoading ? (
                                        <ButtonLoading cl="pr-1 py-1" />
                                    ) : (
                                        <ion-icon name="checkmark-outline"></ion-icon>
                                    )}

                                    <span>{window.create}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoryCreate;
