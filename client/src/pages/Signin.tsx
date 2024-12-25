import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Save, FolderOpen, Shield, Share2, Gift } from 'lucide-react';

export function Signin() {
    const passwordRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value;
        const response = await axios
            .post(`${BACKEND_URL}/api/v1/signin`, {
                password,
                email
            })
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate(`/dashboard`);
    }

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0B0B0F] to-gray-950 flex overflow-hidden">
                <div className="flex flex-col w-1/2 relative">
                    {/* Subtle shapes with matching colors */}
                    <div className="absolute top-8 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-10"></div>
                    <div className="absolute bottom-20 left-36 w-32 h-32 bg-purple-200 rounded-full opacity-10"></div>
                    
                    <div className="text-7xl font-bold text-purple-800 tracking-wide flex justify-center mt-12">
                        BRAIN BUCKET
                    </div>
                    <div className="flex ml-28 pl-2 mt-8 font-bold text-purple-200 tracking-wide text-2xl">
                        Welcome back to your personal hub of ideas, links, and notes. Let's pick up right where you left off.
                    </div>
                    <div className="flex flex-col mt-8 space-y-6 ml-28 pl-3">
                        <div className="group flex items-start space-x-4 transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-900/10 group-hover:bg-purple-900/20 transition-colors">
                                <Save size={24} className="text-purple-800" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-purple-800">Save Anything, Anytime</span>
                                <span className="text-gray-400">Keep your links, tweets, and ideas safe in one place.</span>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-900/10 group-hover:bg-purple-900/20 transition-colors">
                                <FolderOpen size={24} className="text-purple-800" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-purple-800">Organized Storage</span>
                                <span className="text-gray-400">Access your neatly arranged content anytime.</span>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-900/10 group-hover:bg-purple-900/20 transition-colors">
                                <Shield size={24} className="text-purple-800" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-purple-800">Secure and Private</span>
                                <span className="text-gray-400">Your data is protected with top-tier security.</span>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-900/10 group-hover:bg-purple-900/20 transition-colors">
                                <Share2 size={24} className="text-purple-800" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-purple-800">Collaborate and Share</span>
                                <span className="text-gray-400">Share ideas and resources with ease.</span>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-900/10 group-hover:bg-purple-900/20 transition-colors">
                                <Gift size={24} className="text-purple-800" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-purple-800">Free to Use</span>
                                <span className="text-gray-400">All features, no cost. Always.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900/50 border-l border-white/20 backdrop-blur-lg w-1/2 p-12 ml-auto shadow-2xl"
                    style={{
                        borderTopLeftRadius: "5rem",
                        borderBottomLeftRadius: "5rem",
                    }}
                >
                    <div className="text-5xl font-bold tracking-wide text-center mb-12 text-purple-700">
                        Welcome Back!
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 pl-2">Email</label>
                            <Input
                                reference={emailRef}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/20 text-gray-200 placeholder-gray-500 font-medium outline-none focus:border-purple-900 transition duration-200 rounded-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 pl-2">Password</label>
                            <Input
                                reference={passwordRef}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/20 text-gray-200 placeholder-gray-500 font-medium outline-none focus:border-purple-900 transition duration-200 rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="mt-8 w-full ml-2">
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

export default Signin;