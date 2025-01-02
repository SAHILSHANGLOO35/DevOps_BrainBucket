import { useEffect, useState, useRef } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { LogOut } from "lucide-react";
import { DownArrowIcon } from "../icons/DownArrowIcon";

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, refresh } = useContent();
    const [shareText, setShareText] = useState("Share Brain");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // @ts-ignore
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        refresh();
    }, [modalOpen]);

    const handleDelete = () => {
        refresh();
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter.toLowerCase());
    };

    const filteredContents = contents.filter((content) => {
        if (selectedFilter === "all") return true;
        // @ts-ignore
        return content.type.toLowerCase() === selectedFilter;
    });

    return (
        <div>
            <Sidebar onFilterChange={handleFilterChange} selectedFilter={selectedFilter} />
            <div className="ml-60 min-h-screen bg-gradient-to-b from-gray-900 via-[#0B0B0F] to-gray-950">
                <CreateContentModal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                    }}
                />
                <div className="flex gap-4 justify-end p-4">
                    <Button
                        onClick={() => {
                            return setModalOpen(true);
                        }}
                        variant="primary"
                        text="Add Content"
                        startIcon={<PlusIcon />}
                    />

                    <Button
                        onClick={async () => {
                            try {
                                const response = await axios.post(
                                    `${BACKEND_URL}/api/v1/brain/share`,
                                    {
                                        share: true,
                                    },
                                    {
                                        headers: {
                                            Authorization:
                                                localStorage.getItem("token"),
                                        },
                                    }
                                );
                                // @ts-ignore
                                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                                await navigator.clipboard.writeText(shareUrl);
                                setShareText("Copied");
                                setTimeout(() => {
                                    setShareText("Share Brain");
                                }, 3000);
                            } catch (err) {
                                console.error("Failed to copy: ", err);
                            }
                        }}
                        variant="secondary"
                        text={shareText}
                        startIcon={<ShareIcon />}
                        isDisabled={contents.length === 0}
                    />

                    <div className="relative flex items-center justify-center" ref={dropdownRef}>
                        <div 
                            className="flex items-center justify-center cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <DownArrowIcon />
                        </div>
                        
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                                <div className="py-1">
                                    <button
                                        className="w-full px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            window.location.href = "/signin";
                                            <div className="-scale-x-0">
                                                <DownArrowIcon />
                                            </div>
                                        }}
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 p-4 flex-wrap">
                    {filteredContents.length > 0 ? (
                        filteredContents.map(({ title, link, type, _id, pdfPath }) => (
                            <Card
                                key={_id}
                                type={type}
                                link={link}
                                title={title}
                                contentId={_id}
                                onDelete={handleDelete}
                                pdfPath={pdfPath}
                            />
                        ))
                    ) : (
                        <p className="text-white">
                            {selectedFilter === "all" 
                                ? "Add your important content here" 
                                : `No ${selectedFilter} content available`}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}