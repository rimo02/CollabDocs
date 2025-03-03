import FooterCard from '../Cards/FooterCard'
function Footer({ documents, setDocuments }) {

  return (
    <div className="w-full p-6">
      {documents.length > 0 ? (
        <div className="flex flex-row gap-6">
          {documents.map((doc) => (
            <FooterCard key={doc._id} doc={doc} setDocuments={setDocuments} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No documents found</p>
      )}
    </div>
  );
}

export default Footer