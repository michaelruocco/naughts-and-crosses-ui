import axios from 'axios';

class PublicApiClient {
  constructor() {
    this.axios = axios.create({
      baseURL: APP_API_BASE_URL,
    });
  }

  async getApiInfo() {
    try {
      return await this.axios
        .get('/actuator/info')
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getToken(request) {
    try {
      return await this.axios
        .post('/v1/auth/access-tokens', request)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async exchangeAuthCodeForToken(request) {
    try {
      return await this.axios
        .post('/v1/auth/codes', request)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async refreshToken(refreshToken) {
    try {
      return await this.axios
        .put('/v1/auth/access-tokens', { refreshToken: refreshToken })
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async respondToChallenge(request) {
    try {
      console.log(`calling respond to challenge in client ${JSON.stringify(request)}`);
      return await this.axios
        .post('/v1/auth/challenges', request)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default PublicApiClient;
