import { BrainIcon } from "../icons/BrainIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SidebarItem";

export function Sidebar() {
    return (
        <div className="h-screen bg-gradient-to-b from-gray-900 via-[#0B0B0F] to-gray-900 border-r border-white/40 w-60 fixed left-0 top-0">
            <div className="flex text-2xl items-center pl-4 mt-2 mb-4  gap-2 font-semibold pt-2">
                <div className="cursor-pointer">
                    <BrainIcon className="text-purple-700" />
                </div>
                <div className="text-white font-bold">BrainBucket</div>
            </div>
            <div className="pl-6 pt-4 ">
                <SideBarItem icon={<TwitterIcon />} text="Twitter" />
                <SideBarItem icon={<YoutubeIcon />} text="YouTube" />
                <SideBarItem icon={<DocumentIcon />} text="Document" />
                <SideBarItem icon={<TwitterIcon />} text="Twitter" />
                <SideBarItem icon={<YoutubeIcon />} text="YouTube" />
                <SideBarItem icon={<DocumentIcon />} text="Document" />
            </div>
        </div>
    );
}
