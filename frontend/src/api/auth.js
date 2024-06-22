import axios from "axios";
import { axiosConfig } from "../config/config";

class Auth {
  axios;

  constructor() {
    this.axios = axios.create(axiosConfig);
  }

  async loginAccount(data) {
    try {
      const response = await this.axios.post("/users/login", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async registerAccount(data) {
    try {
      const response = await this.axios.post("/users/register", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logoutAccount(){
    try {
      const response = await this.axios.post("/users/logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const auth = new Auth();

export default auth;
