import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SidebarItem";

export function Sidebar() {
    return (
        <div className="h-screen bg-white border-r w-60 fixed left-0 top-0">
            <SideBarItem icon={<TwitterIcon />} text="Tweets" />
            <SideBarItem icon={<YoutubeIcon />} text="YouTube" />
        </div>
    )
}