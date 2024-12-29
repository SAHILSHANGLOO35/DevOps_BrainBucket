import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, refresh } = useContent();
    const [shareText, setShareText] = useState("Share Brain");

    useEffect(() => {
        refresh();
    }, [modalOpen]);

    const handleDelete = () => {
        refresh();
    }

    return (
        <div>
            <Sidebar />
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
                                console.log(
                                    "Content copied to clipboard",
                                    shareUrl
                                );
                                setShareText("Copied");

                                setTimeout(() => {
                                    setShareText("Share Brain")
                                }, 3000);
                            } catch (err) {
                                console.error("Failed to copy: ", err);
                            }
                        }}
                        variant="secondary"
                        text={shareText}
                        startIcon={<ShareIcon />}
                    />
                </div>

                <div className="flex gap-4 p-4 flex-wrap">
                    {contents.length > 0 ? (
                        contents.map(({ title, link, type, _id, pdfPath }) => (
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
                        <p className="text-white">Add your important content here</p>
                    )}
                </div>
            </div>
        </div>
    );
}
