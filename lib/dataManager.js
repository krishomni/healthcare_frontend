const fs = require('fs').promises;
const path = require('path');

class DataManager {
  constructor() {
    this.dataPath = path.join(__dirname, '../data/user-data.json');
  }

  async readData() {
    try {
      const data = await fs.readFile(this.dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading data:', error);
      throw new Error('Failed to read data file');
    }
  }

  async writeData(data) {
    try {
      await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing data:', error);
      throw new Error('Failed to write data file');
    }
  }

  async updatePractice(practiceData) {
    const data = await this.readData();
    data.practice = { ...data.practice, ...practiceData };
    await this.writeData(data);
    return data.practice;
  }

  async getServices() {
    const data = await this.readData();
    return data.services || [];
  }

  async addService(serviceData) {
    const data = await this.readData();
    const newId = `service-${Date.now()}`;
    const newService = { ...serviceData, id: newId };
    data.services = data.services || [];
    data.services.push(newService);
    await this.writeData(data);
    return newService;
  }

  async updateService(serviceId, serviceData) {
    const data = await this.readData();
    const index = data.services.findIndex(s => s.id === serviceId);
    if (index === -1) throw new Error('Service not found');
    data.services[index] = { ...data.services[index], ...serviceData };
    await this.writeData(data);
    return data.services[index];
  }

  async deleteService(serviceId) {
    const data = await this.readData();
    data.services = data.services.filter(s => s.id !== serviceId);
    await this.writeData(data);
    return true;
  }

  async getTeam() {
    const data = await this.readData();
    return data.team || [];
  }

  async addTeamMember(memberData) {
    const data = await this.readData();
    const newId = `doctor-${Date.now()}`;
    const newMember = { ...memberData, id: newId };
    data.team = data.team || [];
    data.team.push(newMember);
    await this.writeData(data);
    return newMember;
  }

  async updateTeamMember(memberId, memberData) {
    const data = await this.readData();
    const index = data.team.findIndex(t => t.id === memberId);
    if (index === -1) throw new Error('Team member not found');
    data.team[index] = { ...data.team[index], ...memberData };
    await this.writeData(data);
    return data.team[index];
  }

  async deleteTeamMember(memberId) {
    const data = await this.readData();
    data.team = data.team.filter(t => t.id !== memberId);
    await this.writeData(data);
    return true;
  }

  async getBlogPosts() {
    const data = await this.readData();
    return data.blogPosts || [];
  }

  async addBlogPost(postData) {
    const data = await this.readData();
    const newId = Date.now();
    const slug = postData.title?.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-') || `post-${newId}`;
    const newPost = { 
      ...postData, 
      id: newId,
      slug,
      publishDate: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0
    };
    data.blogPosts = data.blogPosts || [];
    data.blogPosts.push(newPost);
    await this.writeData(data);
    return newPost;
  }

  async updateBlogPost(postId, postData) {
    const data = await this.readData();
    const index = data.blogPosts.findIndex(p => p.id === parseInt(postId));
    if (index === -1) throw new Error('Blog post not found');
    data.blogPosts[index] = { ...data.blogPosts[index], ...postData };
    await this.writeData(data);
    return data.blogPosts[index];
  }

  async deleteBlogPost(postId) {
    const data = await this.readData();
    data.blogPosts = data.blogPosts.filter(p => p.id !== parseInt(postId));
    await this.writeData(data);
    return true;
  }

  async addContact(contactData) {
    const data = await this.readData();
    const newContact = { 
      ...contactData, 
      id: Date.now(),
      status: 'new',
      createdAt: new Date().toISOString()
    };
    data.contacts = data.contacts || [];
    data.contacts.push(newContact);
    await this.writeData(data);
    return newContact;
  }

  async getContacts() {
    const data = await this.readData();
    return data.contacts || [];
  }

  async updateContact(contactId, updates) {
    const data = await this.readData();
    const index = data.contacts.findIndex(c => c.id === parseInt(contactId));
    if (index === -1) throw new Error('Contact not found');
    data.contacts[index] = { ...data.contacts[index], ...updates };
    await this.writeData(data);
    return data.contacts[index];
  }
}

module.exports = DataManager;