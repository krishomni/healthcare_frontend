import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VisitorData.css';

export default function VisitorsData() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { portfolioId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is owner
    const token = localStorage.getItem('token');
    if (!token) {
      navigate(`/portfolios/cleaningService/${portfolioId}/about`);
      return;
    }

    fetchVisitors();
  }, [portfolioId]);

  const fetchVisitors = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/guestUser/visitors/${portfolioId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setVisitors(data.visitors || []);
      } else {
        setError(data.message || 'Failed to fetch visitors');
      }
    } catch (err) {
      setError('Could not connect to server');
      console.error('Error fetching visitors:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="visitors-container">
        <div className="loading">Loading visitors data...</div>
      </div>
    );
  }

  return (
    <div className="visitors-container">
      <div className="visitors-header">
        <h1>Visitor's Data</h1>
        <p className="subtitle">View all visitors who signed up for your portfolio</p>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="table-container">
        <table className="visitors-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length > 0 ? (
              visitors.map((visitor, index) => (
                <tr key={visitor._id || index}>
                  <td>
                    <div className="cell-content">
                      <span className="icon">👤</span>
                      {visitor.name || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <div className="cell-content">
                      <span className="icon">✉️</span>
                      {visitor.email || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <div className="cell-content">
                      <span className="icon">📱</span>
                      {visitor.phone || 'Not provided'}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  No visitors yet. Share your portfolio link to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}