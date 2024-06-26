import axios from "axios";
import { axiosConfig } from "../config/config";
import { useSelector } from "react-redux";

class Posts {
  axios;
  headers;
  constructor() {
    this.axios = axios.create(axiosConfig);
  }

  getHeaders(accessToken) {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
  }

  async getPosts(accessToken) {
    try {
      const response = await this.axios.get(
        "/posts/list",
        this.getHeaders(accessToken)
      );
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

  async addPost(accessToken, data) {
    console.log(data);
    try {
      console.log(this.getHeaders(accessToken));
      const response = await this.axios.post(
        "/posts/add",
        data,
        this.getHeaders(accessToken)
      );
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

const post = new Posts();

export default post;
