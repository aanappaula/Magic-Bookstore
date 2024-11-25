import axios from "axios";
export default class planetasApi {
  async buscarTodosOsPlanetas() {
    const response = await axios.get("http://localhost:4000/planetas");
    return response.data;
  }

  async buscarPlaneta(id) {
    const response = await axios.get(`http://localhost:4000/planetas/${id}`);
    return response.data;
  }

  async adicionarPlaneta(planeta) {
    const response = await axios.post(
      "http://localhost:4000/planetas",
      planeta
    );
    return response.data;
  }

  async excluirPlaneta(id) {
    const response = await axios.delete(`http://localhost:4000/planetas/${id}`);
    return response.data;
  }

  async editarPlaneta(planeta) {
    const formData = new FormData();
    formData.append("nome", planeta.nome);
    formData.append("categoriaId", planeta.categoriaId);
    formData.append("gravidadeId", planeta.gravidadeId);
    formData.append("climaId", planeta.climaId);
    formData.append("descricao", planeta.descricao);

    if (planeta.imagem) {
      formData.append("imagem", planeta.imagem);
    }

    const response = await axios.put(
      `http://localhost:4000/planetas/${planeta.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  async uploadImagem(imagem) {
    const formData = new FormData();
    formData.append("imagem", imagem);

    const response = await axios.post(
      "http://localhost:4000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.filePath;
  }
  async adicionarPlanetaComImagem(planeta, imagem) {
    if (imagem) {
      const filePath = await this.uploadImagem(imagem);
      planeta.foto = filePath;
    }

    return this.adicionarPlaneta(planeta);
  }
}
