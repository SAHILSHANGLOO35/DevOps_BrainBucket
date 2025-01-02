import { ReactElement } from "react";

export function SideBarItem({text, icon, onClick, isActive}: {
    text: string;
    icon: ReactElement;
    onClick: () => void;
    isActive: boolean;
}) {
    return (
        <div 
            onClick={onClick}
            className={`
                flex items-center rounded cursor-pointer max-w-44 
                transition-all duration-300 mb-3 mt-1
                ${isActive 
                    ? 'bg-purple-500/20 pl-4' 
                    : 'hover:bg-gray-800 hover:pl-4'
                }
            `}
        >
            <div className={`p-2 ${isActive ? 'text-purple-300' : 'text-gray-100'}`}>
                {icon}
            </div>
            <div className={`p-2 ${isActive ? 'text-purple-300' : 'text-gray-200'}`}>
                {text}
            </div> 
        </div>
    )
}