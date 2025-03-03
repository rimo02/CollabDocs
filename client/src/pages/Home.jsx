import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import AddCard from '../components/Cards/AddCard'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const token = useSelector((state) => state.auth.token)
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/documents/mydocs`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (!response.ok) throw new Error('Failed to fetch documents');
        const data = await response.json();
        console.log(data)
        setDocuments(data)
      } catch (error) {
        throw error.message
      }
    }
    fetchDocuments();
  }, [setDocuments, token])

  return (
    <div className='w-full flex flex-col h-screen'>
      <Header documents={documents} />

      <div className='w-full flex justify-center py-6 bg-gray-100'>
        <div className='w-2/3 p-4'>
          <AddCard title='New Document' />
        </div>
      </div>

      <div className='w-full flex justify-center'>
        <div className='w-2/3 p-4'>
          <h2 className='text-lg font-semibold mb-4'>Your Documents</h2>
          <Footer documents={documents} setDocuments={setDocuments} />
        </div>
      </div>
    </div>
  );
}
export default Home

