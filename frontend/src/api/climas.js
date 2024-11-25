import axios from "axios";
export default class climasApi {
  async buscarTodosOsClimas() {
    const response = await axios.get("http://localhost:4000/climas");
    return response.data;
  }

  async buscarClima(id) {
    const response = await axios.get(`http://localhost:4000/climas/${id}`);
    return response.data;
  }

  async adicionarClima(clima) {
    const response = await axios.post("http://localhost:4000/climas", clima);
    return response.data;
  }

  async excluirClima(id) {
    const response = await axios.delete(`http://localhost:4000/climas/${id}`);
    return response.data;
  }

  async atualizarClima(clima) {
    const response = await axios.put(
      `http://localhost:4000/climas/${clima.id}`,
      clima
    );
    return response.data;
  }
}
