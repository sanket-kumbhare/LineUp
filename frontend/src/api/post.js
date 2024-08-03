import axios from "axios";
import { axiosConfig } from "../config/config";
import { useSelector } from "react-redux";

class Posts {
  axios;
  constructor() {
    this.axios = axios.create(axiosConfig);
  }

  headers(accessToken) {
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
        this.headers(accessToken)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPost(id, accessToken) {
    try {
      const response = await this.axios.get(
        `/posts/${id}`,
        this.headers(accessToken)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addPost(data, accessToken) {
    try {
      const response = await this.axios.post(
        "/posts/add",
        data,
        this.headers(accessToken)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(id, data, accessToken) {
    try {
      const response = await this.axios.post(
        `/posts/update/${id}`,
        data,
        this.headers(accessToken)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id, accessToken) {
    try {
      const response = await this.axios.delete(
        `/posts/delete/${id}`,
        this.headers(accessToken)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const post = new Posts();

export default post;
