import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'user-data.json');

export function getUserData() {
  try {
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading user data file:", error);
    return {
      practice: { name: 'Default Practice', tagline: '', description: '' },
      contact: { phone: '', whatsapp: '', email: '', address: {} },
      hours: {},
      stats: {},
      services: [],
      blogPosts: [],
      gallery: { facilityImages: [], beforeAfterCases: [] },
      seo: {},
    };
  }
}

export function getServices() {
  const data = getUserData();
  return data.services || [];
}

export function getBlogPosts() {
  const data = getUserData();
  // Sort posts by date, newest first
  return (data.blogPosts || []).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

export function getBlogCategories() {
  const data = getUserData();
  if (!data.blogPosts || data.blogPosts.length === 0) return ['All'];
  
  // Create a unique list of categories and add "All" to the start
  const categories = ['All', ...new Set(data.blogPosts.map(post => post.category))];
  return categories;
}