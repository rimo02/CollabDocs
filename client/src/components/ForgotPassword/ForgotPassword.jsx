import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { forgotPassword } from '../../store/authSlice'
function ForgotPassword() {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email)).then((res) => {
            if (!res.error) {
                setTimeout(() => {
                    setMessage("OTP Sent to the email")
                    navigate("/reset-password", { state: { email } })
                }, 2000)
            }
            else setMessage(res.payload);
        });
    };
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 w-full">

            {message != null && (
                <div className='bg-green-400 text-white absolute top right-3 px-6 py-2 rounded shadow-md'>
                    {message}
                </div>
            )}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to CollabDocs</h1>
                <p className="text-gray-600">A simple and efficient way to collaborate on documents in real-time.</p>
            </div>

            <div className="shadow-md rounded-lg py-6 px-6 w-96 bg-white">
                <button onClick={() => navigate("/")} className="relative top-0 left-0 text-gray-500 hover:text-gray-700">&larr; Back</button>
                <div className='flex items-center w-full flex-col'>
                    <form action="" onSubmit={handleSubmit}
                        className='mt-3 w-full'>
                        <h2 className="text-xl font-bold mb-4">Forgot Password? </h2>
                        <input type="email"
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full p-2 border rounded mb-2 outline-none border-gray-400'
                        />
                        <div className='text-center'>
                            <button type='submit'
                                className='p-2 text-white rounded bg-blue-400 mr-1  hover:bg-blue-600 hover:cursor-pointer'
                            >
                                Send OTP
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ForgotPassword