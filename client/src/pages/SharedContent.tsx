import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";
import { Sidebar } from "../components/Sidebar";

export function SharedContent() {
    const { shareLink } = useParams();
    const [contentList, setContentList] = useState([]);
    const [username, setUsername] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [isScrolled, setIsScrolled] = useState(false);


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

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <Sidebar onFilterChange={handleFilterChange} selectedFilter={selectedFilter} />
            
            <div className="ml-60 min-h-screen bg-gradient-to-b from-gray-900 via-[#0B0B0F] to-gray-950">
                <div
                    className={`fixed top-0 left-60 right-0 flex justify-center gap-4 p-4 transition-all duration-150 ${
                        isScrolled
                            ? "bg-gray-900 bg-opacity-50 backdrop-blur-md border-b-2 pt-14 border-b-white/15"
                            : "bg-opacity-0 border-b-transparent"
                    } border-b-2`}
                >
                </div>
                <div className="p-4 pt-4">
                    <h1 className={`p-2 fixed transition-all duration-300 text-white tracking-wide text-2xl font-bold flex justify-center ${
                        isScrolled
                            ? "top-4 flex justify-center"
                            : "static text-2xl font-bold tracking-wide mb-4 flex justify-center"
                    }`}
                    >   
                        Shared by <span className="pl-2 text-purple-700">{username.toUpperCase() || "Unknown User"}</span>
                    </h1>
                    <div className="flex gap-4 flex-wrap mt-20">
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
                            <p>No content available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
