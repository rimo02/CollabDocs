import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


function FooterCard({ doc, setDocuments }) {
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/documents/delete`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ id })
            })
            if (!response.ok) throw new Error('Failed to fetch documents');
            setDocuments((prev) => prev.filter((doc) => doc._id !== id))
        } catch (error) {
            throw error.message
        }
    }

    return (
        <div className="flex flex-col items-center w-[22vh] bg-white shadow-md rounded-lg p-4">
            <div
                className="flex flex-col gap-4 cursor-pointer w-full border-b"
                onClick={() => {
                    navigate(`/editor/${doc._id}`);
                }}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png"
                    alt="Docs Logo"
                    className="h-[20vh]"
                />
                <span className='text-gray-800'>{doc.title}</span>
            </div>
            <div className='flex justify-between w-full mt-2'>
                <span className="text-sm">{new Date(doc.createdAt).toLocaleDateString()}</span>
                <FontAwesomeIcon icon={faTrashCan} className="cursor-pointer text-sm" onClick={() => handleDelete(doc._id)} />
            </div>
        </div>
    )
}

export default FooterCard