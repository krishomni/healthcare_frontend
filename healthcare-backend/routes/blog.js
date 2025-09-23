const express = require('express');
const DataManager = require('../lib/dataManager');
const router = express.Router();
const dataManager = new DataManager();

// Get all blog posts with filtering
router.get('/', async (req, res) => {
  try {
    let posts = await dataManager.getBlogPosts();
    const { page = 1, limit = 10, category, featured, published, search } = req.query;

    // Apply filters
    if (published === 'true') {
      posts = posts.filter(p => p.published === true);
    }
    if (category) {
      posts = posts.filter(p => p.category === category);
    }
    if (featured === 'true') {
      posts = posts.filter(p => p.featured === true);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(p => 
        p.title?.toLowerCase().includes(searchLower) ||
        p.excerpt?.toLowerCase().includes(searchLower) ||
        p.content?.toLowerCase().includes(searchLower) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by publish date (newest first)
    posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedPosts = posts.slice(startIndex, endIndex);

    res.json({
      posts: paginatedPosts,
      total: posts.length,
      totalPages: Math.ceil(posts.length / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog categories
router.get('/categories', async (req, res) => {
  try {
    const posts = await dataManager.getBlogPosts();
    const publishedPosts = posts.filter(p => p.published === true);
    const categories = [...new Set(publishedPosts.map(p => p.category).filter(Boolean))];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const posts = await dataManager.getBlogPosts();
    const post = posts.find(p => p.id === parseInt(req.params.id));
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment views
    post.views = (post.views || 0) + 1;
    await dataManager.updateBlogPost(post.id, { views: post.views });
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const posts = await dataManager.getBlogPosts();
    const post = posts.find(p => p.slug === req.params.slug);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment views
    post.views = (post.views || 0) + 1;
    await dataManager.updateBlogPost(post.id, { views: post.views });
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new blog post
router.post('/', async (req, res) => {
  try {
    const newPost = await dataManager.addBlogPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update blog post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await dataManager.updateBlogPost(req.params.id, req.body);
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete blog post
router.delete('/:id', async (req, res) => {
  try {
    await dataManager.deleteBlogPost(req.params.id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like blog post
router.post('/:id/like', async (req, res) => {
  try {
    const posts = await dataManager.getBlogPosts();
    const post = posts.find(p => p.id === parseInt(req.params.id));
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const newLikes = (post.likes || 0) + 1;
    await dataManager.updateBlogPost(post.id, { likes: newLikes });
    
    res.json({ likes: newLikes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
