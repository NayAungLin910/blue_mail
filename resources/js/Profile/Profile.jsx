import React, { useState, useEffect } from "react";
import { api_url, cusaxios, showToast } from "../config";
import ButtonLoading from "../Loading/ButtonLoading";

const Profile = () => {
    const [user, setUser] = useState({});
    const [nameEdit, setNameEdit] = useState(false);
    const [emailEdit, setEmailEdit] = useState(false);
    const [changePasswordLoading, setChangePasswordLoading] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userLoading, setUserLoading] = useState(true);
    const [userNameLoading, setUserNameLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [verifyEmailToggle, setVerifyEmailToggle] = useState(false);
    const [verifyEmailLoading, setVerfiyEmailLoading] = useState(false);
    const [codeVerifyLoading, setCodeVerifyLoading] = useState(false);
    const [code, setCode] = useState("");

    const getUserData = (abortController) => {
        cusaxios
            .get(
                `${api_url}/profile/get-user-data/${window.type}/${window.auth.id}`,
                {
                    signal: abortController.signal,
                }
            )
            .then(({ data }) => {
                setUser(data.data);
                setUserLoading(false);
            })
            .catch((error) => {
                setUserLoading(false);
                let data = error.response.data;
                if (data.errors) {
                    showToast(Object.values(data.errors)[0], "error");
                }
            });
    };

    const sendNewEmailVerificationCode = () => {
        setVerfiyEmailLoading(true);
        setErrors({});
        cusaxios
            .post(`${api_url}/profile/send-new-email-verify-code`, {
                email: user.email,
                type: window.type,
                id: user.id,
            })
            .then(({ data }) => {
                setVerifyEmailToggle(true);
                setEmailEdit(false);
                setVerfiyEmailLoading(false);
                showToast(data.data.message, "success");
            })
            .catch((error) => {
                setVerfiyEmailLoading(false);
                let data = error.response.data;
                if (data.errors.errors) {
                    showToast(data.errors.errors[0], "error");
                } else {
                    setErrors(data.errors);
                }
            });
    };

    useEffect(() => {
        const abortController = new AbortController();
        getUserData(abortController);

        return () => abortController.abort();
    }, []);

    const changeCurrentUserName = () => {
        setUserNameLoading(true);
        setErrors({});
        cusaxios
            .post(`${api_url}/profile/change-user-name`, {
                name: user.name,
                type: window.type,
                id: user.id,
            })
            .then(({ data }) => {
                showToast(data.data.message, "success");
                setUserNameLoading(false);
                setNameEdit(!nameEdit);
                setErrors({});
            })
            .catch((error) => {
                setUserNameLoading(false);
                let data = error.response.data;
                if (data.errors.errors) {
                    showToast(data.errors.errors[0], "error");
                } else {
                    setErrors(data.errors);
                }
            });
    };

    const verifyNewEmailCode = () => {
        setCodeVerifyLoading(true);
        setErrors({});
        cusaxios
            .post(`${api_url}/profile/verify-new-email`, {
                code,
                type: window.type,
                id: user.id,
            })
            .then(({ data }) => {
                showToast(data.data.message, "success");
                setCode("");
                setVerifyEmailToggle(false);
                setCodeVerifyLoading(false);
            })
            .catch((error) => {
                setCodeVerifyLoading(false);
                let data = error.response.data;
                if (data.errors.errors) {
                    showToast(data.errors.errors[0], "error");
                } else {
                    setErrors(data.errors);
                }
            });
    };

    const changePassword = () => {
        setErrors({});
        setChangePasswordLoading(true);
        cusaxios
            .post(`${api_url}/profile/change-password`, {
                id: user.id,
                type: window.type,
                old_password: oldPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            })
            .then(({ data }) => {
                setShowChangePassword(false);
                setNewPassword("");
                setOldPassword("");
                setConfirmPassword("");
                setChangePasswordLoading(false);
                showToast(data.data.message, "success");
            })
            .catch((error) => {
                setChangePasswordLoading(false);
                let data = error.response.data;
                if (data.errors.errors) {
                    showToast(data.errors.errors[0], "error");
                } else {
                    setErrors(data.errors);
                }
            });
    };

    return (
        <>
            <div className="p-2 lg:px-10 lg:py-2">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div
                        className={`py-1 px-3 ${
                            userLoading
                                ? "animate-pulse pointer-events-none"
                                : ""
                        }`}
                    >
                        <div className="overflow-auto">
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="p-3 text-sm whitespace-nowrap">
                                            {window.locale_name}
                                        </td>
                                        <td className="p-3 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {nameEdit ? (
                                                    <input
                                                        value={user.name}
                                                        onChange={(e) => {
                                                            setUser({
                                                                ...user,
                                                                name: e.target
                                                                    .value,
                                                            });
                                                        }}
                                                        className="input-content w-auto p-0 m-0"
                                                    />
                                                ) : (
                                                    <>{user.name}</>
                                                )}
                                                {nameEdit ? (
                                                    <>
                                                        <button
                                                            disabled={
                                                                userNameLoading
                                                            }
                                                            onClick={() => {
                                                                changeCurrentUserName();
                                                            }}
                                                            className={`text-sky-600 dark:text-sky-400 text-xl`}
                                                        >
                                                            {userNameLoading ? (
                                                                <ButtonLoading />
                                                            ) : (
                                                                <ion-icon name="checkmark-outline"></ion-icon>
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setNameEdit(
                                                                    !nameEdit
                                                                );
                                                                setUser({
                                                                    ...user,
                                                                    name: window
                                                                        .auth
                                                                        .name,
                                                                });
                                                                setErrors({});
                                                            }}
                                                            className="text-sky-600 dark:text-sky-400  text-xl"
                                                        >
                                                            <ion-icon name="close-outline"></ion-icon>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            setNameEdit(
                                                                !nameEdit
                                                            )
                                                        }
                                                        className="text-sky-600 dark:text-sky-400 text-xl"
                                                    >
                                                        <ion-icon name="create-outline"></ion-icon>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 whitespace-nowrap">
                                            {window.locale_email}
                                        </td>
                                        <td className="p-3 w-auto whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {emailEdit ? (
                                                    <input
                                                        value={user.email}
                                                        onChange={(e) => {
                                                            setUser({
                                                                ...user,
                                                                email: e.target
                                                                    .value,
                                                            });
                                                        }}
                                                        className="input-content w-auto p-0 m-0"
                                                    />
                                                ) : (
                                                    <>{user.email}</>
                                                )}

                                                {emailEdit ? (
                                                    <>
                                                        <button
                                                            disabled={
                                                                verifyEmailLoading
                                                            }
                                                            onClick={() => {
                                                                sendNewEmailVerificationCode();
                                                            }}
                                                            className="text-sky-600 dark:text-sky-400  text-xl"
                                                        >
                                                            {verifyEmailLoading ? (
                                                                <ButtonLoading />
                                                            ) : (
                                                                <ion-icon name="checkmark-outline"></ion-icon>
                                                            )}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEmailEdit(
                                                                    !emailEdit
                                                                );
                                                                setUser({
                                                                    ...user,
                                                                    email: window
                                                                        .auth
                                                                        .email,
                                                                });
                                                                setErrors({});
                                                            }}
                                                            className="text-sky-600 dark:text-sky-400  text-xl"
                                                        >
                                                            <ion-icon name="close-outline"></ion-icon>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {!verifyEmailToggle && (
                                                            <button
                                                                onClick={() =>
                                                                    setEmailEdit(
                                                                        !emailEdit
                                                                    )
                                                                }
                                                                className="text-sky-600 dark:text-sky-400  text-xl"
                                                            >
                                                                <ion-icon name="create-outline"></ion-icon>
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    {verifyEmailToggle && (
                                        <tr>
                                            <td className="p-3 whitespace-nowrap">
                                                {
                                                    window.locale_new_email_verify_code
                                                }
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        value={code}
                                                        onChange={(e) => {
                                                            setCode(
                                                                e.target.value
                                                            );
                                                        }}
                                                        className="input-content w-auto p-0 m-0"
                                                        type="text"
                                                    />
                                                    <button
                                                        disabled={
                                                            codeVerifyLoading
                                                        }
                                                        onClick={() => {
                                                            verifyNewEmailCode();
                                                        }}
                                                        className="text-sky-600 dark:text-sky-400  text-xl"
                                                    >
                                                        {codeVerifyLoading ? (
                                                            <ButtonLoading />
                                                        ) : (
                                                            <ion-icon name="checkmark-outline"></ion-icon>
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setUser({
                                                                ...user,
                                                                email: window
                                                                    .auth.email,
                                                            });
                                                            setVerifyEmailToggle(
                                                                false
                                                            );
                                                            setCode("");
                                                        }}
                                                        className="text-sky-600 dark:text-sky-400  text-xl"
                                                    >
                                                        <ion-icon name="close-outline"></ion-icon>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {window.type === "admin" && (
                                        <tr>
                                            <td className="p-3 whitespace-nowrap">
                                                {window.locale_stories_count}
                                            </td>
                                            <td className="p-3 whitespace-nowrap">
                                                {user.stories_count}
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td
                                            className="p-3 whitespace-nowrap"
                                            colSpan={2}
                                        >
                                            {showChangePassword ? (
                                                <button
                                                    className="orange-button"
                                                    onClick={() => {
                                                        setShowChangePassword(
                                                            !showChangePassword
                                                        );
                                                        setNewPassword("");
                                                        setOldPassword("");
                                                        setConfirmPassword("");
                                                    }}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        <ion-icon name="close-outline"></ion-icon>
                                                        {
                                                            window.locale_close_change_password
                                                        }
                                                    </div>
                                                </button>
                                            ) : (
                                                <button
                                                    className="sky-button"
                                                    onClick={() =>
                                                        setShowChangePassword(
                                                            !showChangePassword
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center gap-1">
                                                        <ion-icon name="lock-closed-outline"></ion-icon>
                                                        {
                                                            window.locale_change_password
                                                        }
                                                    </div>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                    {showChangePassword && (
                                        <>
                                            <tr>
                                                <td className="p-3 whitespace-nowrap">
                                                    {window.locale_old_password}
                                                </td>
                                                <td className="p-3 whitespace-nowrap">
                                                    <input
                                                        value={oldPassword}
                                                        onChange={(e) => {
                                                            setOldPassword(
                                                                e.target.value
                                                            );
                                                        }}
                                                        className="input-content w-auto p-0 m-0"
                                                        type="password"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 whitespace-nowrap">
                                                    {window.locale_new_password}
                                                </td>
                                                <td className="p-3 whitespace-nowrap">
                                                    <input
                                                        value={newPassword}
                                                        onChange={(e) => {
                                                            setNewPassword(
                                                                e.target.value
                                                            );
                                                        }}
                                                        className="input-content w-auto p-0 m-0"
                                                        type="password"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 whitespace-nowrap">
                                                    {
                                                        window.locale_confirm_password
                                                    }
                                                </td>
                                                <td className="p-3 whitespace-nowrap">
                                                    <input
                                                        value={confirmPassword}
                                                        onChange={(e) => {
                                                            setConfirmPassword(
                                                                e.target.value
                                                            );
                                                        }}
                                                        className="input-content w-auto p-0 m-0"
                                                        type="password"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    className="p-3 whitespace-nowrap"
                                                    colSpan={2}
                                                >
                                                    <button
                                                        disabled={
                                                            changePasswordLoading
                                                        }
                                                        onClick={() => {
                                                            changePassword();
                                                        }}
                                                        className={`green-button ${
                                                            changePasswordLoading
                                                                ? "opacity-70"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-1">
                                                            {changePasswordLoading ? (
                                                                <ButtonLoading />
                                                            ) : (
                                                                <ion-icon name="checkmark-outline"></ion-icon>
                                                            )}
                                                            {window.locale_save}
                                                        </div>
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {Object.keys(errors).length > 0 && (
                            <p className="text-red-500">
                                {Object.values(errors)[0]}
                            </p>
                        )}
                    </div>
                    <div>cols2</div>
                </div>
            </div>
        </>
    );
};

export default Profile;
