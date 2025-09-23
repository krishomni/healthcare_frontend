import { useState, useEffect } from 'react';
import { practiceAPI, servicesAPI, teamAPI, blogAPI } from '../lib/api';

export const usePracticeData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await practiceAPI.get();
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updatePractice = async (newData) => {
    try {
      setLoading(true);
      const response = await practiceAPI.update(newData);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, updatePractice };
};

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServices(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addService = async (serviceData) => {
    try {
      const response = await servicesAPI.create(serviceData);
      setServices([...services, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateService = async (id, serviceData) => {
    try {
      const response = await servicesAPI.update(id, serviceData);
      setServices(services.map(s => s.id === id ? response.data : s));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteService = async (id) => {
    try {
      await servicesAPI.delete(id);
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    services,
    loading,
    error,
    addService,
    updateService,
    deleteService,
    refetch: fetchServices
  };
};

export const useTeamMembers = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await teamAPI.getAll();
      setTeam(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (memberData) => {
    try {
      const response = await teamAPI.create(memberData);
      setTeam([...team, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateMember = async (id, memberData) => {
    try {
      const response = await teamAPI.update(id, memberData);
      setTeam(team.map(m => m.id === id ? response.data : m));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteMember = async (id) => {
    try {
      await teamAPI.delete(id);
      setTeam(team.filter(m => m.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    team,
    loading,
    error,
    addMember,
    updateMember,
    deleteMember,
    refetch: fetchTeam
  };
};

export const useBlogPosts = (params = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchPosts();
  }, [JSON.stringify(params)]);

  const fetchPosts = async () => {
    try {
      const response = await blogAPI.getAll(params);
      setPosts(response.data.posts || response.data);
      setPagination({
        total: response.data.total,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData) => {
    try {
      const response = await blogAPI.create(postData);
      setPosts([response.data, ...posts]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const response = await blogAPI.update(id, postData);
      setPosts(posts.map(p => p.id === parseInt(id) ? response.data : p));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletePost = async (id) => {
    try {
      await blogAPI.delete(id);
      setPosts(posts.filter(p => p.id !== parseInt(id)));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    posts,
    loading,
    error,
    pagination,
    addPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
};