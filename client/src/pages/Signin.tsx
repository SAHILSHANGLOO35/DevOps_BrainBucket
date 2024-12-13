import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Signin() {
    const passwordRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();

    async function signin() {
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value;
        await axios.post(`${ BACKEND_URL }/api/v1/signin`, {
            email,    
            password
        })
        alert("Signed In!")
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex">
            <div className="text-3xl font-semibold tracking-normal mt-4 mr-0">
                BrainBucket
            </div>

            <div
                className="bg-white border w-1/2 p-8 pt-16 ml-auto shadow-lg"
                style={{
                    borderTopLeftRadius: "5rem",
                    borderBottomLeftRadius: "5rem",
                }}
            >
                <Input reference={emailRef} placeholder="Email" className="w-full px-4 mt-24  text-gray-500 font-medium  outline-purple-600" />
                <Input reference={passwordRef} placeholder="Password" className="w-full px-4 mt-10  text-gray-500 font-medium outline-purple-600" />
                <div className="flex justify-center mt-10 pl-2 ">
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
    );
}
