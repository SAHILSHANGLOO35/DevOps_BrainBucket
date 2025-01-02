import { BrainIcon } from "../icons/BrainIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SidebarItem";

export function Sidebar({ onFilterChange, selectedFilter }) {
    return (
        <div className="h-screen bg-gradient-to-b from-gray-900 via-[#0B0B0F] to-gray-900 border-r border-white/40 w-60 fixed left-0 top-0">
            <div
                className="flex text-2xl items-center pl-4 mt-2 mb-4 gap-2 font-semibold pt-2 cursor-pointer hover:text-purple-300"
                onClick={() => onFilterChange("all")}
            >
                <div>
                    <BrainIcon className="text-purple-300" />
                </div>
                <div className="text-white font-bold">BrainBucket</div>
            </div>

            <div className="pl-6 pt-4">
                <SideBarItem
                    icon={<TwitterIcon />}
                    text="Twitter"
                    onClick={() => onFilterChange("twitter")}
                    isActive={selectedFilter === "twitter"}
                />
                <SideBarItem
                    icon={<YoutubeIcon />}
                    text="YouTube"
                    onClick={() => onFilterChange("youtube")}
                    isActive={selectedFilter === "youtube"}
                />
                <SideBarItem
                    icon={<DocumentIcon />}
                    text="Document"
                    onClick={() => onFilterChange("pdf")}
                    isActive={selectedFilter === "pdf"}
                />
            </div>
        </div>
    );
}
