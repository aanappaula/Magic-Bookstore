import axios from "axios";
export default class gravidadesApi {
  async buscarTodasAsGravidades() {
    const response = await axios.get("http://localhost:4000/gravidades");
    return response.data;
  }

  async buscarGravidade(id) {
    const response = await axios.get(`http://localhost:4000/gravidades/${id}`);
    return response.data;
  }

  async adicionarGravidade(gravidade) {
    const response = await axios.post(
      "http://localhost:4000/gravidades",
      gravidade
    );
    return response.data;
  }

  async excluirGravidade(id) {
    const response = await axios.delete(
      `http://localhost:4000/gravidades/${id}`
    );
    return response.data;
  }

  async atualizarGravidade(gravidade) {
    const response = await axios.put(
      `http://localhost:4000/gravidades/${gravidade.id}`,
      gravidade
    );
    return response.data;
  }
}
