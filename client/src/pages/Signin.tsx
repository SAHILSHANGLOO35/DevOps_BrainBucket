import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const passwordRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value;
        const response = await axios.post(`${ BACKEND_URL }/api/v1/signin`, {
            email,    
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate(`/dashboard`);
    }

    return (
        <div>
            <div className="h-screen w-screen flex bg-gray-200 overflow-hidden">
            <div className="flex flex-col w-1/2">
                    <div className="text-7xl font-bold text-purple-900 tracking-wide flex justify-center pt-24">
                        BRAIN BUCKET
                    </div>
                    <div className="font-semibold text-lg flex justify-center items-center pl-32 pr-32 text-black mt-2">
                        Welcome back to your personal hub of ideas, links, and notes. Let’s pick up right where you left off.
                    </div>
                    <div className="flex ml-28 pl-2 mt-12 font-bold text-purple-900 tracking-wide text-3xl">
                        Reconnect with Your <span className="font-extrabold ml-2 underline">BRAIN BUCKET</span>
                    </div>
                    <div className="flex flex-col mt-4 font-semibold text-xl ml-28 pl-3">
                        <li className="mb-2">Keep your links, notes, and ideas safe in one place.</li>
                        <li className="mb-2">Access your neatly arranged content anytime.</li>
                        <li className="mb-2">Your data is protected with top-tier security.</li>
                        <li className="mb-2">Share ideas and resources with ease.</li>
                        <li className="mb-2">All features, no cost. Always.</li>
                    </div>
                </div>
                <div className="bg-white border w-1/2 p-8 ml-auto shadow-lg"
                    style={{
                        borderTopLeftRadius: "5rem",
                        borderBottomLeftRadius: "5rem",
                    }}
                >
                    <div className="text-5xl font-bold tracking-wide fixed right-52 text-purple-900">
                        Welcome Back!
                    </div>
                    <Input
                        reference={emailRef}
                        placeholder="Email"
                        className="w-full px-4 mt-32 text-gray-500 font-medium  outline-purple-600"
                    />
                    <Input
                        reference={passwordRef}
                        placeholder="Password"
                        className="w-full px-4 mt-10 text-gray-500 font-medium outline-purple-600"
                    />
                    <div className="flex justify-center mt-10 ml-2 w-full">
                        <Button
                            onClick={signin}
                            loading={false}
                            variant="primary"
                            text="Sign In"
                            fullWidth={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
