import { useState } from "react";
import { FaSearch, FaBars, FaTh } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Header({ documents }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDocs, setFilteredDocs] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    if (query.trim() === "") {
      setFilteredDocs([]);
      return;
    }

    const filtered = documents.filter((doc) =>
      doc.title.toLowerCase().includes(query)
    );
    setFilteredDocs(filtered);
  };

  return (
    <header className="relative flex items-center justify-between p-3 bg-white">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <FaBars className="text-gray-600 cursor-pointer text-lg" />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png"
          alt="Docs Logo"
          className="w-6 h-8"
        />
        <span className="text-lg font-medium">Docs</span>
      </div>

      {/* Search Bar */}
      <div className="relative w-1/3">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search documents..."
          className="w-full pl-10 pr-3 py-2 rounded-3xl outline-none bg-gray-100 text-gray-700"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Search Dropdown Results */}
        {filteredDocs.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-lg border border-gray-300 rounded-md z-50">
            {filteredDocs.map((doc) => (
              <div
                key={doc._id}
                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
                onClick={() => navigate(`/editor/${doc._id}`)}
              >
                <span>{doc.title}</span>
                <span className="text-xs text-gray-500">
                  {new Date(doc.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <FaTh className="text-gray-600 cursor-pointer text-lg" />
        <img
          src="https://static.vecteezy.com/system/resources/previews/014/194/216/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => navigate(`/home`)}
        />
      </div>
    </header>
  );
}

export default Header;
