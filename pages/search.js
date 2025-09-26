import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { FaSearch, FaFileAlt, FaCog } from 'react-icons/fa';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load navbar data
    const fetchUserData = async () => {
        try {
            const res = await fetch('/api/user-data');
            const data = await res.json();
            setUserData(data);
        } catch (e) {
            console.error("Failed to load user data for navbar");
        }
    };
    fetchUserData();
    
    if (q) {
      setSearchQuery(q);
      performSearch(q);
    }
  }, [q]);

  const performSearch = async (query) => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setError('Please enter at least 2 characters to search.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data.results);
      } else {
        setError('Failed to fetch search results.');
      }
    } catch (err) {
      setError('An error occurred while searching.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`, undefined, { shallow: true });
    performSearch(searchQuery);
  };
  
  const getIconForType = (type) => {
    if (type === 'Blog') return <FaFileAlt className="text-blue-500" />;
    if (type === 'Service') return <FaCog className="text-green-500" />;
    return <FaFileAlt />;
  };

  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navbar userData={userData} />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Search Our Site</h1>
          
          <form onSubmit={handleSearch} className="flex gap-2 mb-12">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, services, etc."
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <FaSearch />
            </button>
          </form>

          {loading && (
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p>Searching...</p>
            </div>
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="space-y-6">
                {results.length > 0 ? (
                    results.map((result) => (
                        <Link href={result.url} key={`${result.type}-${result.id}`}>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="text-2xl">{getIconForType(result.type)}</div>
                                    <div>
                                        <span className={`text-sm font-semibold ${result.type === 'Blog' ? 'text-blue-600' : 'text-green-600'}`}>{result.type}</span>
                                        <h3 className="text-xl font-bold text-gray-800 mt-1">{result.title}</h3>
                                        <p className="text-gray-600 mt-2 line-clamp-2">{result.excerpt}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    q && <p className="text-center text-gray-500">No results found for "{q}".</p>
                )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
