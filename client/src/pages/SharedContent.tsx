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

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
            .then((response) => {
                setContentList(response.data.content);
                setUsername(response.data.username);
            })
            .catch((err) => {
                console.error("Error fetching shared content:", err);
            });
    }, [shareLink]);

    return (
        <div>
            <Sidebar />
            <div className="min-h-screen bg-gray-100 ml-60 border-2">
                <div className="p-4">
                    <h1 className="text-3xl font-bold tracking-wide mb-4 flex justify-center">
                        Shared by <span className="pl-2 text-purple-900">{username.toUpperCase() || "Unknown User"}</span>
                    </h1>
                    <div className="flex gap-4 flex-wrap mt-10">
                        {contentList.length > 0 ? (
                            contentList.map(({ title, link, type }, index) => (
                                <Card
                                    key={index}
                                    type={type}
                                    link={link}
                                    title={title}
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
