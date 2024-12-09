import { ReactElement } from "react";

export function SideBarItem({text, icon}: {
    text: string;
    icon: ReactElement
}) {
    return (
        <div className="flex items-center hover:bg-gray-200 rounded cursor-pointer max-w-44 hover:pl-4 transition-all duration-300">
            <div className="p-2 text-gray-500">
                {icon}
            </div>
            <div className="p-2 text-gray-700">
                {text}
            </div> 
        </div>
    )
}