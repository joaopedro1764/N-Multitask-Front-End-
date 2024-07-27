import { Notification } from "../componentes/Notification"
import { SideBar } from "../componentes/SideBar"
import { TopBar } from "../componentes/TopBar"
import { useLogout } from "../hooks/userAuth"


export const Dashboard = () => {
    const { mutate } = useLogout()
    return (
        <>
            <TopBar />
            <SideBar />
            <div className="ml-80 bg-red-900">
            <button className="bg-blue-500 text-white" text="Deslogar" type="button" onClick={mutate}>Deslogar</button>
            </div>
            <Notification />
        </>
    )
}