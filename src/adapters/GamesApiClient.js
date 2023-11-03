import axios from 'axios';

const client = axios.create({
  baseURL: APP_API_BASE_URL,
});

const getAll = async () => {
  try {
    return await client
      .get('/v1/games?minimal=true')
      .then((response) => response.data);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getById = async (id) => {
  try {
    return await client
      .get(`/v1/games/${id}`)
      .then((response) => response.data);
  } catch (e) {
    throw new Error(e.message);
  }
};

const create = async () => {
  try {
    return await client.post('/v1/games').then((response) => response.data);
  } catch (e) {
    throw new Error(e.message);
  }
};

const takeTurn = async (request) => {
  const { id, body } = request;
  try {
    return await client
      .put(`/v1/games/${id}/turns`, body)
      .then((response) => response.data);
  } catch (e) {
    throw new Error(e.message);
  }
};

const GamesApiClient = {
  getAll: getAll,
  getById: getById,
  create: create,
  takeTurn: takeTurn,
};

export default GamesApiClient;
