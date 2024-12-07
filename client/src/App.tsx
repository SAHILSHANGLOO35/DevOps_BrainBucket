import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
    return (
        <div>
            <Button
                variant="primary"
                title="Share"
                size="lg"
                startIcon={<PlusIcon size={"lg"} />}
                endIcon={<ShareIcon size="lg" />}
            />

            <Button
                variant="secondary"
                title="Add Content"
                size="lg"
                startIcon={<PlusIcon size={"lg"} />}
                endIcon={<ShareIcon size="lg" />}
            />

            <Button
                variant="primary"
                title="New One"
                size="sm"
                startIcon={<PlusIcon size={"sm"} />}
                endIcon={<ShareIcon size="sm" />}
            />

            <Button
                variant="primary"
                title="Share"
                size="md"
                startIcon={<PlusIcon size={"md"} />}
                endIcon={<ShareIcon size="md" />}
            />
        </div>
    );
}

export default App;
