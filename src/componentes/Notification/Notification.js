import { Slide, toast } from "react-toastify";


let lastToastTime = 0;
const toastDelay = 3000;

export const showToast = (message, type) => {
    const currentTime = Date.now();
    if (currentTime - lastToastTime >= toastDelay) {
        switch (type) {
            case "success":
                toast.success(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                    draggable: true,
                    progress: undefined,
                    transition: Slide,
                });
                break;
            case "error":
                toast.error(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                    draggable: true,
                    progress: undefined,
                    transition: Slide,
                });
                break;
            default:
                toast.warn(message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                    draggable: true,
                    progress: undefined,
                    transition: Slide,
                });
        }
        lastToastTime = currentTime;
    }
};
