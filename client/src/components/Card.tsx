import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { BACKEND_URL } from "../config";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter";
    contentId: string;
    onDelete: () => void;
}

export function Card({ title, link, type, contentId, onDelete }: CardProps) {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found");
                return;
            }
            await axios.delete(
                `${BACKEND_URL}/api/v1/content/${contentId}`,
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );
            // console.log("Content deleted successfully: ", response.data);
            if (onDelete) {
                onDelete();
            }
        } catch (error) {
            console.error("Error deleting content:", error);
        }
    };

    return (
        <div>
            <div className="max-w-72 border rounded-md shadow-md border-gray-200/40 bg-gray-950/90 text-white p-4 min-h-48 min-w-72">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className=" text-gray-500 pr-2">
                            {type === "youtube" && <YoutubeIcon />}
                            {type === "twitter" && <TwitterIcon />}
                        </div>
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-800 pr-2 cursor-pointer">
                            <a href={link} target="_blank">
                                <EyeIcon />
                            </a>
                        </div>
                        <div
                            className="text-gray-800 cursor-pointer"
                            onClick={handleDelete}
                        >
                            <DeleteIcon />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full border-0 rounded-md"
                            src={link
                                .replace("watch", "embed")
                                .replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x", "twitter")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    );
}
