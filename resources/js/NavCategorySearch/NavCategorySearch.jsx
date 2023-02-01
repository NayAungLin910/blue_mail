import React, { useState, useEffect } from "react";
import { cusaxios } from "../config";
import ButtonLoading from "../Loading/ButtonLoading";

const NavCategorySearch = () => {
    const [search, setSearch] = useState("");
    const [categories, setCategoires] = useState({});
    const [loading, setLoading] = useState(false);
    const msToLoad = 1000;

    const getCategoryData = () => {
        setLoading(true);
        cusaxios
            .get(`/categories/get/data?page=1&search=${search}`)
            .then(({ data }) => {
                setLoading(false);
                setCategoires(data.data);
            });
    };

    useEffect(() => {
        const timeOutInstance = setTimeout(() => {
            if (search) {
                getCategoryData();
            }
        }, msToLoad);

        if (!search) {
            getCategoryData();
        }

        return () => clearTimeout(timeOutInstance);
    }, [search]);

    return (
        <>
            <div>
                <div className="flex items-center gap-1">
                    <span className="text-lg text-sky-400">
                        {loading && <ButtonLoading dark={true} />}
                    </span>
                    <input
                        className="input-content"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>
                {categories.data?.map((c) => {
                    return (
                        <p key={c.slug}>
                            <a href={`/stories/search?category=${c.slug}`}>{c.name}</a>
                        </p>
                    );
                })}
                {
                    categories.data && categories.data.length === 0 && (
                        <p className=" text-sky-500">{window.locale_no_records}</p>
                    )
                }
            </div>
        </>
    );
};

export default NavCategorySearch;
