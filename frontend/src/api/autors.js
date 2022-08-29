import axios from "axios";
export default class AutorsApi {
  async buscarTodosOsAutors() {
    const response = await axios.get("http://localhost:4000/autors");
    return response.data;
  }

  async buscarAutor(id) {
    const response = await axios.get(`http://localhost:4000/autors/${id}`);
    return response.data;
  }

  async adicionarAutor(autor) {
    const response = await axios.post("http://localhost:4000/autors", autor);
    return response.data;
  }

  async excluirAutor(id) {
    const response = await axios.delete(`http://localhost:4000/autors/${id}`);
    return response.data;
  }

  async atualizarAutor(autor) {
    const response = await axios.put(
      `http://localhost:4000/autors/${autor.id}`,
      autor
    );
    return response.data;
  }
}
