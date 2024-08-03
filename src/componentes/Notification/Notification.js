import toast, { Toaster } from "react-hot-toast"

export const Notification = () => {



    return (
        <Toaster
            gutter={10}
            toastOptions={{
                duration: 3000,
                position: "top-right",
                success: {
                    icon: "✅",
                    style: {
                        border: '1px solid #713200',
                        color: 'green'
                    }
                },
                error: {
                    icon: "❌",
                    style: {
                        border: '1px solid #713200',
                        color: 'red'
                    }
                }
            }}
        />
    )
}

let lastToastTime = 0;
const toastDelay = 3000;

export const showToast = (message, type) => {
    const currentTime = Date.now();
    if (currentTime - lastToastTime >= toastDelay) {
        switch (type) {
            case 'error':
                toast.error(message);
                break;
            case 'success':
                toast.success(message);
                break;
            case 'alert':
                toast.warn(message);
                break;
                default: console.log("erro indesperado")
        }
        lastToastTime = currentTime;
    }
};