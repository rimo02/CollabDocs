import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 w-full">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to CollabDocs</h1>
                <p className="text-gray-600">A simple and efficient way to collaborate on documents in real-time.</p>
            </div>

            <div className="shadow-md rounded-lg py-6 px-6 w-96 bg-white">
                <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Get Started</h2>
                <div className="flex flex-col space-y-3">
                    <button
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button
                        className="w-full border border-blue-500 text-blue-500 py-2 rounded-md hover:bg-blue-100"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
