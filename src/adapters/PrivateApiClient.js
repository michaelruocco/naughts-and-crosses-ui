import axios from 'axios';

class PrivateApiClient {
  constructor(token) {
    this.axios = axios.create({
      baseURL: APP_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUser(username) {
    try {
      return await this.axios
        .get(`/v1/users/${username}`)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getAllUsers() {
    try {
      return await this.axios
        .get('/v1/users')
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getAllGames() {
    try {
      return await this.axios
        .get('/v1/games?minimal=true')
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getById(id) {
    try {
      return await this.axios
        .get(`/v1/games/${id}`)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteById(id) {
    try {
      return await this.axios
        .delete(`/v1/games/${id}`)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async create(request) {
    try {
      return await this.axios
        .post('/v1/games', request)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async takeTurn(request) {
    const { id, body } = request;
    try {
      return await this.axios
        .post(`/v1/games/${id}/turns`, body)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default PrivateApiClient;
