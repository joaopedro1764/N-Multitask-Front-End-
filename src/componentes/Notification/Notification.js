import { Toaster } from "react-hot-toast"

export const Notification = () => {

    return(
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