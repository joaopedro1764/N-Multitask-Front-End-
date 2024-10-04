import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import Cookies from 'js-cookie';
import { useLogout } from "../../hooks/useLogOut";
export const SideBar = ({ openSideBar, setOpenSideBar }) => {

    const { mutate } = useLogout();
    let user;
    const userCokkie = Cookies.get('userAuth');

    if (userCokkie) {
        user = JSON.parse(userCokkie)
    }

    const Menus = [
        { title: "Suporte", icon: <ContactPhoneIcon />, page: "/suporteTecnico" },
        { title: "Dashboard", icon: <LeaderboardIcon />, page: "/dashBoard" },
        { title: "Ligações Ativas", icon: <PhoneForwardedIcon />, page: "/ligaçõesAtivas" },
        { title: "Avaliações Negativas", icon: <FactCheckIcon />, page: "/avaliacoesNegativas" },
        { title: "NMT Monitoramento", icon: <DisplaySettingsIcon />, page: "/ligaçõesAtivas" },
        { title: "Agenda Diária", icon: <CalendarMonthIcon />, page: "/ligaçõesAtivas" },
    ];

    const getLogo = () => {
        return openSideBar ? "LogoSSA.png" : "LogoS.png";
    };

    return (
        <div className={`min-h-screen bg-[#111111] rounded-r-md border-r-white border-r-[6px] flex flex-col relative ${openSideBar ? 'min-w-52' : 'min-w-16'}`}>
            <div className='flex flex-col h-auto w-full pl-5'>
                <KeyboardDoubleArrowLeftIcon
                    onClick={() => setOpenSideBar(!openSideBar)}
                    className={`!w-10 !h-10 text-white cursor-pointer !mt-2 absolute right-0 ${!openSideBar && 'rotate-180'}`}
                />
                <img className={`mx-auto sm:mt-16 ${openSideBar ? "w-52" : "w-10"}`} alt="Logo SideBar" src={require(`../../assets/${getLogo()}`)} />
            </div>
            <div className="w-full flex-1 flex flex-col items-center pl-5">
                <div className={`flex flex-col gap-y-4 w-full text-white xl:mt7 2xl:mt-16 ${!openSideBar && "mt-5"}`}>
                    {Menus.map((item, index) => (
                        <a
                            href={item.page}
                            className={`flex items-center w-full gap-x-4 text-white px-5 py-3 bg-[#2C2C2C] rounded-l-md
                            cursor-pointer hover:text-black-dark hover:bg-white ${index === 0 && '!bg-white !text-black-dark'} ${!openSideBar && 'justify-center'}`}
                            key={index}
                        >
                            {item.icon}
                            <span className={`${!openSideBar && 'hidden'} font-medium duration-300 text-sm`}>{item.title}</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-2 items-center justify-center gap-x-4 mb-7 mt-3">
                <img className="w-14 rounded-full object-cover" alt="Foto usuário" src={"https://nmt.nmultifibra.com.br/notion/ws" + user?.profile_image} />
                <div className='flex items-center gap-x-1.5 px-2'>
                    <span className={`${!openSideBar && 'hidden'} text-white text-center font-medium text-md`}>{user?.name}</span>
                    <LogoutIcon onClick={mutate} className="!text-center !w-8 !cursor-pointer text-white" />
                </div>
            </div>
        </div>
    )
}