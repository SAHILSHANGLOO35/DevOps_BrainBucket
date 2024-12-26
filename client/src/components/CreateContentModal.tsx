import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

// Controlled component
export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [youtube, setYoutube] = useState(false);
    const [twitter, setTwitter] = useState(false);
    const [link, setLink] = useState(""); // State to track the link input value

    async function addContent() {
        const title = titleRef.current?.value;

        await axios.post(
            `${BACKEND_URL}/api/v1/content`,
            {
                title,
                link,
                type
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        );
        onClose();
    }

    useEffect(() => {
        if (link.includes("youtube")) {
            setYoutube(true);
            setTwitter(false);
        } else if (link.includes("x")) {
            setTwitter(true);
            setYoutube(false);
        } else {
            setYoutube(false);
            setTwitter(false);
        }
    }, [link]);

    return (
        <div>
            {open && (
                <>
                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>

                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 flex justify-center bg-transparent">
                        <div className="flex flex-col justify-center">
                            <span className="bg-white p-4 rounded-md">
                                <div className="flex justify-end">
                                    <div onClick={onClose} className="cursor-pointer">
                                        <CrossIcon />
                                    </div>
                                </div>

                                <div>
                                    {/* Title Input (Uncontrolled) */}
                                    <Input
                                        placeholder={"Title"}
                                        reference={titleRef}
                                        className="px-3 outline-purple-600 text-gray-800 font-medium"
                                    />
                                    
                                    {/* Link Input (Controlled) */}
                                    <Input
                                        placeholder={"Link"}
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        className="px-3 outline-purple-600 text-gray-800 font-medium"
                                    />
                                </div>

                                <h1 className="pl-3 tracking-normal font-medium">Type</h1>
                                <div className="flex gap-2 justify-center items-center pt-2 pb-4">
                                    <Button
                                        text="Youtube"
                                        variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                        onClick={() => {
                                            setType(ContentType.Youtube);
                                        }}
                                        isDisabled={youtube}
                                    />
                                    <Button
                                        text="Twitter"
                                        variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                        onClick={() => {
                                            setType(ContentType.Twitter);
                                        }}
                                        isDisabled={twitter}
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <Button
                                        variant="primary"
                                        text="Submit"
                                        onClick={addContent}
                                    />
                                </div>
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
