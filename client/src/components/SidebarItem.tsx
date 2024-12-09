import { ReactElement } from "react";

export function SideBarItem({text, icon}: {
    text: string;
    icon: ReactElement
}) {
    return (
        <div className="flex gap-4 items-center px-6">
            {icon} {text}
        </div>
    )
}