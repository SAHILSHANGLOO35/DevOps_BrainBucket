import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";
import { Sidebar } from "../components/Sidebar";
import { Menu } from "lucide-react";

export function SharedContent() {
    const { shareLink } = useParams();
    const [contentList, setContentList] = useState([]);
    const [username, setUsername] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
            .then((response) => {
                // @ts-ignore
                setContentList(response.data.content);
                // @ts-ignore
                setUsername(response.data.username);
            })
            .catch((err) => {
                console.error("Error fetching shared content:", err);
            });
    }, [shareLink]);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter.toLowerCase());
        setIsSidebarOpen(false);
    };

    const filteredContents = contentList.filter((content) => {
        if (selectedFilter === "all") return true;
        // @ts-ignore
        return content.type.toLowerCase() === selectedFilter;
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 35);
        };

        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-[#0B0B0F] to-gray-950">
            {/* Mobile Sidebar */}
            <div className={`
                fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300
                lg:hidden
                ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}>
                <div className={`
                    fixed inset-y-0 left-0 w-60 bg-gray-900 transform transition-transform duration-300
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <Sidebar
                        onFilterChange={handleFilterChange}
                        selectedFilter={selectedFilter}
                    />
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block fixed inset-y-0 left-0 w-60">
                <Sidebar
                    onFilterChange={handleFilterChange}
                    selectedFilter={selectedFilter}
                />
            </div>

            {/* Main Content */}
            <div className="lg:ml-60">
                {/* Top Bar */}
                <div className={`
                    fixed top-0 right-0 left-0 lg:left-60
                    flex items-center justify-center
                    p-2 transition-all duration-150
                    ${isScrolled ? 'bg-gray-900 bg-opacity-50 backdrop-blur-md border-b-2 border-b-white/15' : 'bg-opacity-0 border-b-transparent'}
                `}>
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Username Title */}
                    <h1 className={`
                        p-2 transition-all duration-300 
                        text-white tracking-wide text-xl sm:text-2xl font-bold flex justify-center w-auto lg:w-auto
                    `}>
                        Shared by <span className="pl-2 text-purple-700">
                            {username.toUpperCase() || "Unknown User"}
                        </span>
                    </h1>
                </div>

                {/* Content Grid */}
                <div className="md:pt-24 pt-20 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {contentList.length > 0 ? (
                        filteredContents.map(({ title, link, type, _id, pdfPath }) => (
                            <Card
                                key={_id}
                                type={type}
                                link={link}
                                title={title}
                                contentId={_id}
                                pdfPath={pdfPath}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-white">
                            No content available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}