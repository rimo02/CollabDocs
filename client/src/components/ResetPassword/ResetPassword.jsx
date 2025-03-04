import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [success, setsuccess] = useState(null)
    const [fail, setfail] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const email = location.state?.email || "";
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setfail("Passwords do not match");
            setTimeout(() => setfail(null), 2000);
            return;
        }
        dispatch(resetPassword({ email, otp, password })).then((res) => {
            if (!res.error) {
                setsuccess("Password Reset Successfull... Redirecting")
                setTimeout(() => {
                    setsuccess(null)
                    navigate("/home")
                }, 2000)
            }
            else {
                setfail(res.payload || "Password Reset Failed")
                setTimeout(() => {
                    setfail(null)
                }, 2000)
                return
            };
        })
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 w-full">

            {success && (
                <div className='bg-green-400 text-white absolute top right-3 px-6 py-2 rounded shadow-md'>
                    {success}
                </div>
            )}
            {fail && (
                <div className='bg-red-400 text-white absolute top right-3 px-6 py-2 rounded shadow-md'>
                    {fail}
                </div>
            )}

            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to CollabDocs</h1>
                <p className="text-gray-600">A simple and efficient way to collaborate on documents in real-time.</p>
            </div>

            <div className="shadow-md rounded-lg py-6 px-6 w-96 bg-white">
                <button onClick={() => navigate("/home")} className="relative top-0 left-0 text-gray-500 hover:text-gray-700">&larr; Back</button>
                <div className='flex items-center w-full flex-col'>
                    <form action="" onSubmit={handleSubmit}
                        className='mt-3 w-full'>
                        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                        <input type="password"
                            placeholder='New password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border rounded mb-2 outline-none border-gray-400'
                            required
                        />
                        <input type="password"
                            placeholder='Retype password'
                            value={password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full p-2 border rounded mb-2 outline-none border-gray-400'
                            required
                        />
                        <input type="text"
                            placeholder='OTP'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='w-full p-2 border rounded mb-2 outline-none border-gray-400'
                            required
                        />
                        <div className='w-full text-center'>
                            <button type='submit'
                                className='w-40 p-2 text-white rounded bg-blue-500 mr-1  hover:bg-blue-600 hover:cursor-pointer'
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default ResetPassword