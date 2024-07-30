import { Notification } from "../componentes/Notification"
import { SideBar } from "../componentes/SideBar"
import { useLogout } from "../hooks/userAuth"

export const Dashboard = () => {
  
    return (
        <div className="flex">
            <SideBar />
           Cards...
            <Notification />
        </div>
    )
}