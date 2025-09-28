// frontend_findVirtualMe/src/pages/domains/DomainSearchPage.jsx
import axios from 'axios';
import React, { useState } from 'react';

const DomainSearchPage = () => {
  const [domainQuery, setDomainQuery] = useState('');
  const [domainResults, setDomainResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_API;

  const handleDomainSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/domains/check/${domainQuery}`);
      setDomainResults([response.data]); // Wrap single result in array
    } catch (error) {
      console.error('Domain search error:', error);
      console.error('Error response:', error.response?.data);
      // Handle error (show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchaseDomain = async (domain) => {
    try {
      // TODO: Get portfolioId from context or props
      const portfolioId = 'temp-portfolio-id'; // Replace with actual portfolio ID
      
      const response = await axios.post(`${backendUrl}/api/domains/register`, {
        domain: domain.domain,
        portfolioId,
        plan: 'basic' // Default plan
      });
      
      console.log('Domain purchase initiated:', response.data);
      alert(`Domain purchase initiated for ${domain.domain}`);
    } catch (error) {
      console.error('Domain purchase error:', error);
      alert('Failed to initiate domain purchase');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-24 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex mb-4">
        <input 
          type="text" 
          value={domainQuery}
          onChange={(e) => setDomainQuery(e.target.value)}
          placeholder="Search for a domain"
          className="flex-grow p-2 border rounded-l"
        />
        <button 
          onClick={handleDomainSearch}
          className="bg-blue-500 text-white p-2 rounded-r"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {domainResults.length > 0 && (
        console.log(domainResults),
        <div>
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <ul>
            {domainResults.map((domain, index) => (
           <li key={index} className="p-2 px-4">
           <div>{domain.domain} - {domain.available ? "domain is available" : "domain is not available"}</div>
           <div>Premium Price: {domain.premiumPrice}</div>
           {domain.available && <button onClick={() => handlePurchaseDomain(domain)} className="btn-primary mt-2">Buy Domain</button>}
           {!domain.available && <button className="btn-red mt-2">Not Available</button>}
         </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </main>
  );
};

export default DomainSearchPage;