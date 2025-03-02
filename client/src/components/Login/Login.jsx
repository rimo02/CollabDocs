import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../store/authSlice'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setsuccess] = useState(null)
  const [fail, setfail] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((res) => {
      if (!res.error) {
        setsuccess("Login Successfull... Redirecting")
        setTimeout(() => {
          setsuccess(null)
          navigate("/home")
        }, 2000)
      }
      else {
        setfail(res.payload || "Login Failed")
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
        <button onClick={() => navigate("/")} className="relative top-0 left-0 text-gray-500 hover:text-gray-700">&larr; Back</button>
        <div className='flex items-center w-full flex-col'>
          <form action="" onSubmit={handleSubmit}
            className='mt-3'>
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input type="email"
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full p-2 border rounded mb-2 outline-none border-gray-400'
            />
            <input type="password"
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded mb-2 outline-none border-gray-400'
              required
            />
            <div className='w-full text-center'>
              <button type='submit'
                className='w-20 p-2 text-white rounded bg-blue-500 mr-1  hover:bg-blue-600 hover:cursor-pointer'
              >
                Login
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>


  )
}

export default Login