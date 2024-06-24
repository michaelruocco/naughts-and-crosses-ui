import axios from 'axios';

class UserApiClient {
  constructor(token) {
    this.axios = axios.create({
      baseURL: APP_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async uploadBatch(file) {
    try {
      var data = new FormData();
      data.append('data', file);
      return await this.axios
        .post('/v1/users/batches', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getBatch(id) {
    try {
      return await this.axios
        .get(`/v1/users/batches/${id}`)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async get(username) {
    try {
      return await this.axios
        .get(`/v1/users/${username}`)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async delete(username) {
    try {
      return await this.axios
        .delete(`/v1/users/${username}`)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getAll() {
    try {
      return await this.axios
        .get('/v1/users')
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default UserApiClient;
