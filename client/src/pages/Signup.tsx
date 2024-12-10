import { Button } from "../components/Button";
import { Input } from "../components/CreateContentModal";

export function Signup() {
    return (
        <div className="h-screen w-screen bg-gray-200 flex">
            <div className="bg-white border w-1/2 p-8 ml-auto">
                <Input placeholder="Username" className="w-full px-4 mt-24"/>
                <Input placeholder="Email" className="w-full px-4 mt-10"/>
                <Input placeholder="Password" className="w-full px-4 mt-10"/>
                <div className="flex justify-center mt-10 pl-2 ">
                    <Button
                        loading={false}
                        variant="primary"
                        text="Create Account"
                        fullWidth={true}
                    />
                </div>
            </div>
        </div>
    );
}
