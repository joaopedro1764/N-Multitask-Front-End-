import Brightness4Icon from '@mui/icons-material/Brightness4';
export const TopBar = ({ title }) => {

    return (
        <div className="flex-1 flex justify-center h-72 bg-fundo-suporte bg-center bg-cover bg-no-repeat">
            <Brightness4Icon className="text-white absolute right-5 top-4 cursor-pointer hover:text-blue-200 duration-300" />
            <div className="flex flex-col gap-y-10 justify-center items-center">
                <h2 className="text-center text-6xl text-white font-bold">{title}</h2>
                <span className="text-center text-slate-300 text-3xl font-bold">SUPORTE TÉCNICO</span>
            </div>
        </div>
    )
}