import { ReactElement } from "react";

export function SideBarItem({text, icon}: {
    text: string;
    icon: ReactElement
}) {
    return (
        <div className="flex items-center hover:bg-gray-800 rounded cursor-pointer max-w-44 hover:pl-4 transition-all duration-300 mb-3 mt-1">
            <div className="p-2 text-gray-100">
                {icon}
            </div>
            <div className="p-2 text-gray-200">
                {text}
            </div> 
        </div>
    )
}