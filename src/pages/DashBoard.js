import { Notification } from "../componentes/Notification/Notification"
import { SideBar } from "../componentes/SideBar/SideBar"

export const Dashboard = () => {

    return (
        <div className="flex overflow-hidden w-full h-screen">
            <SideBar />
            <main className="bg-gray-400 w-full ">
            Cards...
            </main>
            <Notification />
        </div>
    )
}