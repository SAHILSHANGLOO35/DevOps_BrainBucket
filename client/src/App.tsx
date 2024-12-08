import "./App.css";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
    return (
        <div>
            <div className="flex gap-4 justify-end p-4">
                <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} />

                <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />} />
            </div>

            <div className="flex gap-4 p-4">
                <Card type="twitter" link="https://x.com/SahilShangloo35/status/1865423830371700814" title="My Twitter Post" />

                <Card type="youtube" link="https://www.youtube.com/watch?v=Pm0Ga7R-vrM" title="My Youtube Playlist" />
            </div>
        </div>
    );
}

export default App;
