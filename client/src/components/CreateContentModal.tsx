import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
}

// Controlled component
export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title,
            link,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
    }

    return (
        <div>
            {open && (
                <>
                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>

                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 flex justify-center bg-transparent">
                        <div className="flex flex-col justify-center">
                            <span className="bg-white p-4 rounded-md">
                                <div className="flex justify-end">
                                    <div
                                        onClick={onClose}
                                        className="cursor-pointer"
                                    >
                                        <CrossIcon />
                                    </div>
                                </div>

                                <div>
                                    <Input reference={titleRef} placeholder={"Title"} className="px-3 outline-purple-600 text-gray-500 font-medium" />
                                    <Input reference={linkRef} placeholder={"Link"} className="px-3 outline-purple-600 text-gray-500 font-medium" />
                                </div>

                                <h1 className="pl-3 tracking-normal font-medium">Type</h1>
                                <div className="flex gap-2 justify-center items-center pt-2 pb-4">
                                    <Button
                                        text="Youtube"
                                        variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                        onClick={() => {
                                            setType(ContentType.Youtube);
                                        }}
                                    />
                                    <Button
                                        text="Twitter"
                                        variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                        onClick={() => {
                                            setType(ContentType.Twitter);
                                        }}
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