import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter";
}

export function Card({ title, link, type }: CardProps) {
    return (
        <div>
            <div className="max-w-72 border rounded-md shadow-md border-gray-200 bg-white p-4 min-h-48 min-w-72" >
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className=" text-gray-500 pr-2">
                            {type === "youtube" && <YoutubeIcon />}
                            {type === "twitter" && <TwitterIcon />}
                        </div>
                        {title}
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-500 pr-2 cursor-pointer">
                            <a href={link} target="_blank">
                                <ShareIcon />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full border-0 rounded-md"
                            src={link.replace("watch", "embed").replace("?v=", "/")}
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
