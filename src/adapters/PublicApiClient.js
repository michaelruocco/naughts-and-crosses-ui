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
        .post('/v1/tokens', request)
        .then((response) => response.data);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default PublicApiClient;
