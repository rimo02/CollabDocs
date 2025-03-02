import { useEffect, useState } from 'react'
import Editor from '../components/Editor/Editor'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function EditorPage() {
    const [title, setTitle] = useState("Untitled Document")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDocument = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/documents/${id}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                console.error("Error fetching document:", response.status);
                return;
            }
            const data = await response.json()
            setTitle(data.title)
        }
        if (id) fetchDocument()
    }, [id])


    const updateTitle = async (newTitle) => {
        setTitle(newTitle)
        await fetch(`${import.meta.env.VITE_SERVER_URL}/documents/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title: newTitle })
        })
    }

    return (
        <div className='w-full flex flex-col bg-gray-100'>
            <div className='w-full flex justify-between py-2 px-6 border-b-1 border-gray-300'>
                <div className='flex gap-4'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png" alt="Docs Logo" className="w-6 h-8"
                    />
                    <input
                        onChange={(e) => updateTitle(e.target.value)}
                        type='text'
                        value={title}
                        className='p-1 border border-gray-200 text-gray-600 rounded outline-none' />
                </div>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/014/194/216/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                    alt="Profile"
                    onClick={() => {
                        navigate(`/home`)
                    }}
                    className="w-8 h-8 rounded-full cursor-pointer"
                />
            </div>
            < div className='w- full mt-4 flex justify-center items-center'>
                <Editor id={id} />
            </div>

        </div>
    )
}

export default EditorPage