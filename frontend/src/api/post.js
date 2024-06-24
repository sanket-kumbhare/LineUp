import axios from "axios";
import { axiosConfig } from "../config/config";

class Posts{
  axios;
  constructor() {
    this.axios = axios.create(axiosConfig);
  }

  async getPosts() {
    try {
      const response = await this.axios.get("/posts/list");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPost(id) {
    try {
      const response = await this.axios.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addPost(data) {
    try {
      const response = await this.axios.post("/posts/add", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(id, data) {
    try {
      const response = await this.axios.post(`/posts/update/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id, data) {
    try {
      const response = await this.axios.post(`/posts/delete/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default Posts;
