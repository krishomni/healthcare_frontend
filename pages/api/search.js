import fs from 'fs';
import path from 'path';

// Helper function to read the data file
function getUserData() {
  const dataPath = path.join(process.cwd(), 'data', 'user-data.json');
  const jsonData = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(jsonData);
}

export default function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const userData = getUserData();
    const searchQuery = query.toLowerCase();
    const results = [];

    // Search Services
    if (userData.services) {
      userData.services.forEach(service => {
        if (
          service.title.toLowerCase().includes(searchQuery) ||
          service.description.toLowerCase().includes(searchQuery)
        ) {
          results.push({
            id: service.id,
            type: 'Service',
            title: service.title,
            excerpt: service.description,
            url: '/services' 
          });
        }
      });
    }

    // Search Blog Posts
    if (userData.blogPosts) {
      userData.blogPosts.forEach(post => {
        if (
          post.title.toLowerCase().includes(searchQuery) ||
          post.excerpt.toLowerCase().includes(searchQuery)
        ) {
          results.push({
            id: post.id,
            type: 'Blog',
            title: post.title,
            excerpt: post.excerpt,
            url: `/blog/${post.id}`
          });
        }
      });
    }

    res.status(200).json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ message: 'Error performing search' });
  }
}