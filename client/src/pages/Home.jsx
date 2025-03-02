import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import AddCard from '../components/Cards/AddCard'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
function Home() {
  const [documents, setDocuments] = useState([]);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/documents/mydocs`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Failed to fetch documents');
      const data = await response.json();
      console.log(data)
      setDocuments(data)
    }
    fetchDocuments();
  }, [])

  return (
    <div className='w-full flex flex-col h-screen'>
      <Header documents={documents} />

      <div className='w-full flex justify-center py-6'>
        <div className='w-2/3 p-4 bg-gray-100'>
          <AddCard title='New Document' />
        </div>
      </div>

      <div className='w-full flex justify-center'>
        <div className='w-2/3 p-4'>
          <h2 className='text-lg font-semibold mb-4'>Your Documents</h2>
          <Footer documents={documents} />
        </div>
      </div>
    </div>
  );
}
export default Home

