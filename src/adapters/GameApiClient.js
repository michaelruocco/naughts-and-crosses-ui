import axios from 'axios';

class GameApiClient {
  constructor(accessToken) {
    this.axios = axios.create({
      baseURL: APP_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getAll() {
    try {
      return await this.axios
        .get('/v1/games?minimal=true')
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async get(id) {
    try {
      return await this.axios
        .get(`/v1/games/${id}`)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async delete(id) {
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

  async getAllCandidatePlayerUsernames() {
    try {
      return await this.axios
        .get('/v1/games/candidate-players/usernames')
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default GameApiClient;
