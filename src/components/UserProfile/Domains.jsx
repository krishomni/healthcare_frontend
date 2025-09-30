import axios from "axios";
import { AlertCircle, ArrowRight, CheckCircle, Copy, ExternalLink, Globe, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Domains() {
  const [searchDomain, setSearchDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [userDomains, setUserDomains] = useState([]);
  const [isLoadingDomains, setIsLoadingDomains] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_API;

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });
  
  const fetchUserDomains = async () => {
    try {
      setIsLoadingDomains(true);
      const response = await axios.get(`${backendUrl}/api/domains/myDomains`, {
        headers: getAuthHeaders(),
      });
      // Backend returns { domains: [], user: {}, portfolios: [] }
      setUserDomains(response.data.domains || []);
    } catch (error) {
      console.error("Error fetching domains:", error);
      setUserDomains([]);
    } finally {
      setIsLoadingDomains(false);
    }
  };

  useEffect(() => {
    fetchUserDomains();
  }, []);


  const handleDomainSearch = async (e) => {
    e.preventDefault();
    if (!searchDomain.trim()) return;

    setIsSearching(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/domains/check/${searchDomain}`,
        {
          headers: getAuthHeaders(),
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Domain search error:", error);
      toast.error("Failed to search domain availability");
    } finally {
      setIsSearching(false);
    }
  };

  const handlePurchaseDomain = async () => {
    if (!searchResults) return;
    
    try {
      // TODO: Get portfolioId from context or props
      const portfolioId = 'temp-portfolio-id'; // Replace with actual portfolio ID
      
      const response = await axios.post(
        `${backendUrl}/api/domains/register`,
        {
          domain: searchResults.domain,
          portfolioId,
          plan: 'basic' // Default plan
        },
        {
          headers: getAuthHeaders(),
        }
      );
      
      console.log('Domain purchase initiated:', response.data);
      toast.success(`Domain purchase initiated for ${searchResults.domain}`);
      // Refresh domain list
      fetchUserDomains();
    } catch (error) {
      console.error('Domain purchase error:', error);
      toast.error('Failed to initiate domain purchase');
    }
  };

  const handleConnectCustomDomain = async () => {
    if (!customDomain.trim()) return;

    try {
      // TODO: Get portfolioId from context or props
      const portfolioId = 'temp-portfolio-id'; // Replace with actual portfolio ID
      
      const response = await axios.post(
        `${backendUrl}/api/domains/connect`,
        {
          domain: customDomain,
          portfolioId,
        },
        {
          headers: getAuthHeaders(),
        }
      );
      
      console.log('Custom domain connected:', response.data);
      toast.success(`Custom domain ${customDomain} connection initiated`);
      setCustomDomain("");
      // Refresh domain list
      fetchUserDomains();
    } catch (error) {
      console.error('Custom domain connection error:', error);
      toast.error('Failed to connect custom domain');
    }
  };

  return (
    <main className="flex-1 flex justify-center items-start py-12 px-4 md:px-12 bg-gray-50">
      <section className="w-full max-w-4xl space-y-8">
   
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
        <div className="flex items-center justify-center gap-3 mb-4">
    <Globe className="w-6 h-6 text-blue-600" />
  <h2 className="text-2xl font-semibold text-gray-900">Domain Management</h2>
</div>

          <p className="text-gray-600">
            Get a professional domain for your portfolio or connect your existing domain to showcase your work.
          </p>
        </div>

     
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
        <div className="flex items-center justify-center gap-3 mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Buy a New Domain</h3>
</div>
         
          <p className="text-gray-600 mb-6">
            Search for available domains and purchase one directly through our platform.
          </p>
          
          <form onSubmit={handleDomainSearch} className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter domain name (e.g., yourname.com)"
                  value={searchDomain}
                  onChange={(e) => setSearchDomain(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching || !searchDomain.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>

    
          {searchResults && (
            <div className="mt-6 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {searchResults.available ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{searchResults.domain}</p>
                    <p className="text-sm text-gray-600">
                      {searchResults.available ? 
                        `Available Price:  $${searchResults.premiumPrice + 15 || 15}` : 
                        "Not available"
                      }
                    </p>
                  </div>
                </div>
                {searchResults.available && (
                  <button
                    onClick={handlePurchaseDomain}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  >
                    Purchase
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

     
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect Your Own Domain</h3>
          <p className="text-gray-600 mb-6">
            Already have a domain? Connect it to your findVirtualMe portfolio.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Domain
              </label>
              <input
                type="text"
                placeholder="yourdomain.com"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleConnectCustomDomain}
              disabled={!customDomain.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              Connect Domain
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">Setup Instructions</h4>
            <p className="text-blue-800 text-sm mb-4">
              To connect your custom domain, you'll need to update your DNS settings:
            </p>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">CNAME Record</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <div className="font-mono text-sm text-gray-900 bg-gray-50 p-2 rounded">
                  www.yourdomain.com → findvirtualme.vercel.app
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">A Record</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <div className="font-mono text-sm text-gray-900 bg-gray-50 p-2 rounded">
                  yourdomain.com → 76.76.19.123
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> DNS changes can take up to 24-48 hours to propagate globally.
              </p>
            </div>
          </div>
        </div>

    
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Domains</h3>
          <p className="text-gray-600 mb-6">
            Manage your connected domains and their status.
          </p>

          {isLoadingDomains ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading your domains...</p>
            </div>
          ) : userDomains.length > 0 ? (
            <div className="space-y-3">
              {userDomains.map((domain, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{domain.domain}</p>
                      <p className="text-sm text-gray-500 capitalize">
                        {domain.type} • {domain.dnsConfigured ? 'DNS Configured' : 'DNS Pending'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${
                        domain.status === 'active' ? 'bg-green-500' :
                        domain.status === 'pending' ? 'bg-yellow-500' :
                        domain.status === 'expired' ? 'bg-red-500' :
                        'bg-gray-500'
                      }`}></span>
                      <span className={`text-sm capitalize ${
                        domain.status === 'active' ? 'text-green-600' :
                        domain.status === 'pending' ? 'text-yellow-600' :
                        domain.status === 'expired' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {domain.status}
                      </span>
                    </div>
                    <a
                      href={`http://${domain.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No domains connected yet</p>
              <p className="text-sm text-gray-400">
                Search for a new domain or connect your existing one to get started.
              </p>
            </div>
          )}
        </div>

       
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-2">Domain Setup Guide</h4>
              <p className="text-sm text-gray-600">Learn how to properly configure your domain settings.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
              <h4 className="font-medium text-gray-900 mb-2">DNS Configuration</h4>
              <p className="text-sm text-gray-600">Detailed instructions for DNS record setup.</p>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}
