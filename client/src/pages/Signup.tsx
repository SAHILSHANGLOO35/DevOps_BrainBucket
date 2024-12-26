import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Save, FolderOpen, Shield, Share2, Gift } from 'lucide-react';

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
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0B0B0F] to-gray-950 flex overflow-hidden">
                <div className="flex flex-col w-1/2 relative">
                    {/* Subtle shapes with matching colors */}
                    <div className="absolute top-8 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-10"></div>
                    <div className="absolute bottom-5 left-36 w-32 h-32 bg-purple-200 rounded-full opacity-10"></div>
                    
                    <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 tracking-wide flex justify-center mt-12">
                        BRAIN BUCKET
                    </div>
                    <div className="font-semibold text-lg flex justify-center items-center px-32 text-gray-300 mt-4">
                        Save your important links, notes, and ideas in one place. Brain Bucket – your go-to hub for everything you want to revisit later.
                    </div>
                    <div className="flex ml-28 pl-2 mt-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 tracking-wide text-3xl">
                        Explore the Magic of <span className="font-extrabold ml-2 decoration-purple-800"><u className="underline-offset-4">BRAIN BUCKET</u></span>
                    </div>
                    <div className="flex flex-col mt-8 space-y-6 ml-28 pl-3">
                        <div className="group flex items-start space-x-4 transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-900/10 group-hover:bg-purple-900/20 transition-colors">
                                <Save size={24} className="text-purple-800" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-purple-300">Save Anything, Anytime</span>
                                <span className="text-gray-400">Capture ideas and resources on the go</span>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-900/10 group-hover:bg-purple-900/20 transition-colors">
                                <FolderOpen size={24} className="text-purple-800" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-purple-300">Organized Storage</span>
                                <span className="text-gray-400">Keep everything neatly categorized</span>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-900/10 group-hover:bg-purple-900/20 transition-colors">
                                <Shield size={24} className="text-purple-800" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-purple-300">Secure and Private</span>
                                <span className="text-gray-400">Your data is protected and encrypted</span>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-900/10 group-hover:bg-purple-900/20 transition-colors">
                                <Share2 size={24} className="text-purple-800" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-purple-300">Collaborate and Share</span>
                                <span className="text-gray-400">Work together with your team seamlessly</span>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 transition-all duration-300 hover:translate-x-2">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-900/10 group-hover:bg-purple-900/20 transition-colors">
                                <Gift size={24} className="text-purple-800" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-purple-300">Free to Use</span>
                                <span className="text-gray-400">All features available at no cost</span>
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
                    <div className="text-5xl font-bold tracking-wider text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">
                        Create Account
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 pl-2">Username</label>
                            <Input
                                reference={usernameRef}
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/20 text-gray-200 placeholder-gray-500 font-medium outline-none focus:border-purple-900 transition duration-200 rounded-lg"
                            />
                        </div>
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
                            onClick={signup}
                            loading={false}
                            variant="primary"
                            text="Create Account"
                            fullWidth={true}
                        />
                    </div>
                    <div className="text-center mt-6 text-gray-400">
                        Already have an account? 
                        <span onClick={() => navigate('/signin')} className="text-purple-700 hover:text-purple-200 ml-1 cursor-pointer transition-all duration-200">
                            Sign In
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;