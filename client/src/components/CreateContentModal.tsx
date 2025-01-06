import React, { useEffect, useRef, useState } from "react";
import { X, FileText, Upload } from "lucide-react";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    PDF = "pdf"
}

export function CreateContentModal({ open, onClose }) {
    const [type, setType] = useState<ContentType>(ContentType.Youtube);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [youtube, setYoutube] = useState(false);
    const [twitter, setTwitter] = useState(false);

    async function addContent() {
        const title = titleRef.current?.value?.trim();
        const link = linkRef.current?.value?.trim();
        const token = localStorage.getItem("token");
    
        if (!title) {
            alert("Title is required!");
            return;
        }
    
        try {
            if (type === ContentType.PDF && file) {
                const formData = new FormData();
                formData.append("pdf", file);
                formData.append("title", title || "My PDF");
                formData.append("type", ContentType.PDF);
    
                console.log("Uploading PDF:", { title, file, type: ContentType.PDF });
    
                await axios.post(`${BACKEND_URL}/api/v1/upload-pdf`, formData, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "multipart/form-data",
                    },
                });
    
                alert("PDF uploaded successfully");
            } else if (type !== ContentType.PDF) {
                if (!link) {
                    alert("Link is required for YouTube or Twitter content!");
                    return;
                }
        
                await axios.post(`${BACKEND_URL}/api/v1/content`, {
                    title,
                    link,
                    type,
                }, {
                    headers: {
                        "Authorization": token,
                    },
                });
    
                alert("Content added successfully");
            }
    
            // Clear form and close modal
            setTitle("");
            setLink("");
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            onClose();
        } catch (error) {
            console.error("Error adding content:", error);
            alert("Failed to add content. Please try again.");
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files?.[0]) {
            setFile(files[0]);
            setType(ContentType.PDF);
        }
    };

    useEffect(() => {
        if (link.includes("youtube")) {
            setYoutube(true);
            setTwitter(false);
            setType(ContentType.Youtube);
        } else if (link.includes("x")) {
            setTwitter(true);
            setYoutube(false);
            setType(ContentType.Twitter);
        } else {
            setYoutube(false);
            setTwitter(false);
        }
    }, [link]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white rounded-lg w-96 p-6 pointer-events-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Add Content</h2>
                        <button onClick={onClose} className="hover:text-gray-700">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                ref={titleRef}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Enter title"
                            />
                        </div>

                        {type !== ContentType.PDF && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Link</label>
                                <input
                                    type="text"
                                    value={link}
                                    ref={linkRef}
                                    onChange={(e) => setLink(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter link"
                                />
                            </div>
                        )}

                        {type === ContentType.PDF && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Upload PDF</label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                    className="hidden"
                                />
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-gray-400"
                                >
                                    {file ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <FileText size={20} />
                                            <span>{file.name}</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload size={24} />
                                            <span>Click to upload PDF</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">Type</label>
                            <div className="flex gap-2">
                                {["Youtube", "Twitter", "PDF"].map((btnType) => (
                                    <button
                                        key={btnType}
                                        onClick={() => setType(ContentType[btnType as keyof typeof ContentType])}
                                        disabled={
                                            (btnType === "Youtube" && youtube) ||
                                            (btnType === "Twitter" && twitter)
                                        }
                                        className={`flex-1 px-4 py-2 rounded-md ${
                                            type === ContentType[btnType as keyof typeof ContentType]
                                                ? "bg-purple-600 text-white"
                                                : "bg-gray-100 hover:bg-gray-200"
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {btnType}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={addContent}
                            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}