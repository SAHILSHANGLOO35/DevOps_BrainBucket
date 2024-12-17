import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value;
        await axios
            .post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password,
                email,
            })
            .then(() => navigate(`/signin`));
    }

    return (
        <div>
            <div className="h-screen w-screen flex bg-gray-200 overflow-hidden">
                <div className="bg-white border w-1/2 p-8 ml-auto shadow-lg"
                    style={{
                        borderTopLeftRadius: "5rem",
                        borderBottomLeftRadius: "5rem",
                    }}
                >
                    <div className="text-5xl font-bold tracking-wide fixed right-52 text-purple-900">
                        Create Account
                    </div>
                    <Input
                        reference={usernameRef}
                        placeholder="Username"
                        className="w-full px-4 mt-32 text-gray-500 font-medium outline-purple-600"
                    />
                    <Input
                        reference={emailRef}
                        placeholder="Email"
                        className="w-full px-4 mt-10 text-gray-500 font-medium  outline-purple-600"
                    />
                    <Input
                        reference={passwordRef}
                        placeholder="Password"
                        className="w-full px-4 mt-10 text-gray-500 font-medium outline-purple-600"
                    />
                    <div className="flex justify-center mt-10 ml-2 w-full">
                        <Button
                            onClick={signup}
                            loading={false}
                            variant="primary"
                            text="Create Account"
                            fullWidth={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
