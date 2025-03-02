import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
function Footer({ documents, setDocuments }) {

  const navigate = useNavigate()

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/documents/delete`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ id })
      })
      if (!response.ok) throw new Error('Failed to fetch documents');
      setDocuments((prev) => prev.filter(doc => doc._id !== id))
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }


  return (
    <div className="flex flex-col w-full">
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc) => (
            <li
              key={doc._id}
              className="flex items-center p-2 border justify-between border-gray-200 bg-gray-100 rounded shadow-sm mb-3 hover:bg-gray-100 hover:shadow-md"
            >
              <div
                className="flex justify-between gap-4 cursor-pointer"
                onClick={() => {
                  navigate(`/editor/${doc._id}`);
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png"
                  alt="Docs Logo"
                  className="w-5 h-6"
                />
                <span>{doc.title}</span>
              </div>
              <div>
                <span className="text-sm mr-2">Last Edited: {new Date(doc.createdAt).toLocaleString()}</span>
                <FontAwesomeIcon icon={faTrashCan} className="cursor-pointer" onClick={() => handleDelete(doc._id)} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 col-span-5">No documents found</p>
      )}
    </div>
  );
}

export default Footer