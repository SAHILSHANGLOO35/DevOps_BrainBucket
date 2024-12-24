import { ChevronRight, Share2, Link2, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../icons/BrainIcon";

export default function LandingPage() {
    const navigate = useNavigate();

    function login() {
        navigate(`/signin`);
    }

    function signup() {
        navigate(`/signup`);
    }

    function createBucket() {
        const isLoggedIn = localStorage.getItem("token");

        if (isLoggedIn) {
            navigate("/dashboard");
        } else {
            navigate("/signup");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-[#0B0B0F] to-gray-950">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-gray-900/40 backdrop-blur-sm border-b border-white/10 text-white lg:px-5 flex justify-between items-center z-50">
                <div className="container mx-auto px-2 py-3 flex justify-between items-center">
                    <div className="group flex items-center space-x-2 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300 hover:text-white">
                        <BrainIcon className="text-purple-300 group-hover:text-white transition-all duration-300" />
                        <div className="text-xl font-bold group-hover:text-white transition-all duration-300">
                            Brain Bucket
                        </div>
                    </div>

                    <div className="space-x-4">
                        <button
                            className="px-4 py-2 text-gray-400 hover:text-white transition-all duration-300"
                            onClick={login}
                        >
                            Login
                        </button>
                        <button
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-purple-400 transition"
                            onClick={signup}
                        >
                            Sign Up Free
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-gray-900/20" />
                <div className="container mx-auto px-6 py-16 relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 mt-8">
                            Your Digital Brain for Important Content
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Save, organize, and share your valuable online
                            content in one secure place.
                        </p>
                        <button
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg text-lg flex items-center mx-auto hover:from-purple-500 hover:to-purple-400 transition"
                            onClick={signup}
                        >
                            Get Started <ChevronRight className="ml-2" />
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16">
                        <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-800/50 rounded-lg backdrop-blur-sm border border-purple-900/20 hover:border-purple-700/50 transition">
                            <Link2 className="h-10 w-10 text-purple-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-purple-200">
                                Save Links
                            </h3>
                            <p className="text-gray-300">
                                Never lose an important article or webpage
                                again.
                            </p>
                        </div>

                        <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-800/50 rounded-lg backdrop-blur-sm border border-purple-900/20 hover:border-purple-700/50 transition">
                            <FileText className="h-10 w-10 text-purple-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-purple-200">
                                Store Documents
                            </h3>
                            <p className="text-gray-300">
                                Keep your documents organized and accessible.
                            </p>
                        </div>

                        <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-800/50 rounded-lg backdrop-blur-sm border border-purple-900/20 hover:border-purple-700/50 transition">
                            <Share2 className="h-10 w-10 text-purple-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-purple-200">
                                Share Knowledge
                            </h3>
                            <p className="text-gray-300">
                                Share your curated content with others easily.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Call to Action */}
            <section className="bg-gradient-to-b from-gray-800/50 to-purple-900/30 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-12 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-200">
                        Start Building Your Knowledge Base
                    </h2>
                    <p className="text-gray-300 mb-8">
                        All your important content in one place.
                    </p>
                    <button
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg text-lg hover:from-purple-500 hover:to-purple-400 transition"
                        onClick={createBucket}
                    >
                        Create Your Brain Bucket
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className=" border-t border-white/20 mx-auto px-6 py-12 text-gray-400 flex items-center justify-between">
                <p>Reach me at: <a href="mailto:sahilshangloo35@gmail.com" className="hover:text-white transition-all">sahilshangloo35@gmail.com</a></p>
                <p>© 2024 Brain Bucket. All rights reserved.</p>
            </footer>
        </div>
    );
}
