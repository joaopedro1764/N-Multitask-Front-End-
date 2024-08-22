export const Button = ({ text, onClick, type }) => {

    

    return (

        <button className="w-full px-2 py-4 bg-black rounded mx-auto text-white  mt-4" type={type} onClick={onClick}>{text}</button>
    )
}
