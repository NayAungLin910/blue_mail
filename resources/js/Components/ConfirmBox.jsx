import React from "react";
import ButtonLoading from "../Loading/ButtonLoading";

const ConfirmBox = ({
    children,
    setOpenConfirm,
    openConfirm,
    confirmElement,
    setConfirmElement,
    confrimLoading,
    confrimAction,
}) => {
    return (
        <div className="dark:bg-slate-600 dark:text-white bg-slate-100 border dark:border-slate-700 rounded-xl shadow-lg fixed top-[40%] lg:w-1/2 w-full h-auto px-5 py-4 lg:left-[25%] z-50">
            <div className="grid grid-cols-1">
                <span className="text-lg text-center">{children}</span>
                <p className="text-center text-base">{confirmElement.name}</p>
            </div>
            <div className="flex items-center mt-6 place-content-center gap-7">
                <div>
                    <button
                        className={`sky-button py-1 px-2 ${confrimLoading ? 'opacity-60' : ''}`}
                        onClick={() => {
                            confrimAction();
                        }}
                        disabled={confrimLoading}
                    >
                        <div className="flex items-center">
                            <span className="text-lg mt-1">
                                {confrimLoading ? (
                                    <ButtonLoading cl="pr-1 pt-0 mt-0 py-1" />
                                ) : (
                                    <ion-icon name="checkmark-outline"></ion-icon>
                                )}
                            </span>
                            <span>{window.locale_confirm}</span>
                        </div>
                    </button>
                </div>
                <div>
                    <button
                        className="orange-button py-1 px-2"
                        onClick={() => {
                            setOpenConfirm(!openConfirm);
                            setConfirmElement({});
                        }}
                    >
                        <div className="flex items-center">
                            <span className="text-lg mt-1">
                                <ion-icon name="close-outline"></ion-icon>
                            </span>
                            <span>{window.locale_cancel}</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmBox;
