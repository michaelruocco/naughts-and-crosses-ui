import axios from 'axios';

class UserApiClient {
  constructor(accessToken) {
    this.axios = axios.create({
      baseURL: APP_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

  async create(request) {
    try {
      return await this.axios
        .post('/v1/users', request)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async update(request) {
    try {
      return await this.axios
        .put(`/v1/users/${request.username}`, request)
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

  async getAllUsers() {
    try {
      return await this.axios
        .get('/v1/users')
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getPage(limit, offset, filterGroups, searchTerm) {
    try {
      return await this.axios
        .post('/v1/users/pages', {
          limit: limit,
          offset: offset,
          groups: filterGroups,
          searchTerm: searchTerm,
        })
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getAllGroups() {
    try {
      return await this.axios
        .get('/v1/user-groups')
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async synchronizeExternalUsers() {
    try {
      return await this.axios
        .post('/v1/external-user-synchronizations')
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default UserApiClient;
