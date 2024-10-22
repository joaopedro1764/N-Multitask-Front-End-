import { useEffect, useRef } from "react";
import { useGetUser } from "../../hooks/useUser";

export const DropDownUser = ({ isOpen, setIsOpen, selectedUser, setSelectedUser, isUser }) => {

    const { users } = useGetUser();

    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectUser = (user) => {
        setSelectedUser({ name: user.name, profile_image: user.profile_image });
        setIsOpen(false);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type='button'
                onClick={toggleDropdown}
                className="w-64 bg-gray text-gray border-2 border-black rounded-lg py-[15px] px-4 leading-tight 
                focus:outline-none focus:bg-white focus:border-gray-500 flex items-center justify-between gap-x-3"
            >
                {selectedUser && selectedUser.name ? (
                    <div className='flex gap-x-3 items-center'>
                        <img
                            className="w-8 rounded-full object-cover"
                            alt="Foto usuário"
                            src={`https://nmt.nmultifibra.com.br/notion/ws${selectedUser.profile_image}`}
                        />
                        <span>{selectedUser.name}</span>
                    </div>
                ) : (
                    <span>Colaborador</span>
                )}
                <svg className="h-5 w-5 inline-block float-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5H7z" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 overflow-y-auto max-h-[150px]">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => selectUser(user)}
                            className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                            <img
                                src={`https://nmt.nmultifibra.com.br/notion/ws${user.profile_image}`}
                                alt={user.name}
                                className="h-8 w-8 rounded-full mr-2"
                            />
                            {user.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
