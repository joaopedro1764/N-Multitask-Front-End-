import { Notification } from "../componentes/Notification"
import { useLogout } from "../hooks/userAuth"


export const Dashboard = () => {
    const { mutate } = useLogout()
    return (
        <>
            <button text="Deslogar" type="button" onClick={mutate}>Deslogar</button>
            <Notification />
        </>
    )
}