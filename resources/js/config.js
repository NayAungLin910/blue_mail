import axios from "axios";

export const baseUrl = "https://bluemails.link"; // base url of the application
export const api_url = "https://bluemails.link/api"; // base api url

// accept 'application/json' axios
export const cusaxios = axios.create({
    baseURL: api_url,
    headers: {
        'Accept': 'application/json',
        'Locale': window.locale,
    },
});

// content-type multipart/form-data axios
export const fileAxios = axios.create({
    baseURL: api_url,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Locale': window.locale,
    },
});

// show the notification with the given message and type
export const showToast = (message, type) => {
    if (type == "info") {
        Toastify({
            text: message,
            duration: 3000,
            destination: "", // can put link 
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #9CB1E9, #5B82EA)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }
    if (type == "success") {
        Toastify({
            text: message,
            duration: 3000,
            destination: "", // can put link 
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #76CC68, #40CD29)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }
    if (type == "error") {
        Toastify({
            text: message,
            duration: 3000,
            destination: "", // can put link 
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #F07E63, #F04D26)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }
}