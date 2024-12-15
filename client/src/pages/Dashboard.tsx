import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Sidebar />
            <div className="ml-60 min-h-screen bg-gray-100 border-2">
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
                        variant="secondary"
                        text="Share Brain"
                        startIcon={<ShareIcon />}
                    />
                </div>

                <div className="flex gap-4 p-4">
                    <Card
                        type="twitter"
                        link="https://x.com/SahilShangloo35/status/1865423830371700814"
                        title="My Twitter Post"
                    />
                </div>
            </div>
        </div>
    );
}
