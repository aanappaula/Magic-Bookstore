<script>
import axios from "axios";
import { v4 as uuid } from "uuid";
export default {
  data() {
    return {
      planetas: [],
      categorias: [],
      climas: [],
      gravidades: [],
      planeta: {},
      foto: null,
    };
  },
  async created() {
    await this.BuscarTodasAsGravidades();
    await this.BuscarTodasAsCategorias();
    await this.BuscarTodosOsClimas();
    const planetas = await axios.get(
      "http://localhost:4000/planetas?expand=categoria&expand=gravidade&expand=clima"
    );
    this.planetas = planetas.data;
  },
  methods: {
    async BuscarTodasAsGravidades() {
      const gravidades = await axios.get("http://localhost:4000/gravidades");
      this.gravidades = gravidades.data;
    },
    async BuscarTodasAsCategorias() {
      const categorias = await axios.get("http://localhost:4000/categorias");
      this.categorias = categorias.data;
    },
    async BuscarTodosOsClimas() {
      const climas = await axios.get("http://localhost:4000/climas");
      this.climas = climas.data;
    },
    async handleImageUpload(event) {
      this.planetaImagem = event.target.files[0];
    },
    async salvar() {
      if (
        !this.planeta.nome ||
        !this.planeta.categoriaId ||
        !this.planeta.gravidadeId
      ) {
        alert("Todos os campos devem ser preenchidos.");
        return;
      }

      try {

        const formData = new FormData();
        formData.append("nome", this.planeta.nome);
        formData.append("descricao", this.planeta.descricao);
        formData.append("categoriaId", this.planeta.categoriaId);
        formData.append("gravidadeId", this.planeta.gravidadeId);
        formData.append("climaId", this.planeta.climaId);

        if (this.planetaImagem) {
          formData.append("imagem", this.planetaImagem);
        }

        const response = await axios.post(
          "http://localhost:4000/planetas",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Planeta criado com ID:", response.data.id);

        this.planeta = {}; 
        this.planetaImagem = null; 

        alert("Planeta salvo com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar o planeta.");
      }
    },

    async excluir(planeta) {
      await axios.delete(`http://localhost:4000/planetas/${planeta.id}`);
      const indice = this.planetas.indexOf(planeta);
      this.planetas.splice(indice, 1);
    },
    async atualizarPlaneta(planeta) {
      const response = await axios.put(
        `http://localhost:4000/planetas/${planeta.id}`,
        planeta
      );
      return response.data;
    },
    editar(categoria) {
      Object.assign(this.categoria, categoria);
    },
    alerta() {
      alert("ok");
    },
  },
};
</script>

<template>
  <div class="conteudo">
    <div class="title">
      <h3 class="display-8 text-center text-body-emphasis">
        Cadastro de planetas
      </h3>
    </div>
    <div class="input-form">
      <input
        type="text"
        v-model="planeta.nome"
        @keyup.enter="salvar"
        placeholder="Nome do planeta"
        class="form-input"
      />

      <div class="select-group">
        <select
          class="form-select"
          id="inputGroupSelect04"
          aria-label="Selecione o clima"
          v-model="planeta.climaId"
          @keyup.enter="salvar"
        >
          <option selected class="disabled" value="">Climas</option>
          <option v-for="clima in climas" :key="clima.id" :value="clima.id">
            {{ clima.nome }}
          </option>
        </select>

        <select
          class="form-select"
          id="inputGroupSelect04"
          aria-label="Selecione a categoria"
          v-model="planeta.categoriaId"
          @keyup.enter="salvar"
        >
          <option selected class="disabled" value="">Categorias</option>
          <option
            v-for="categoria in categorias"
            :key="categoria.id"
            :value="categoria.id"
          >
            {{ categoria.nome }}
          </option>
        </select>

        <select
          class="form-select"
          id="inputGroupSelect04"
          aria-label="Selecione a gravidade"
          v-model="planeta.gravidadeId"
          @keyup.enter="salvar"
        >
          <option selected class="disabled" value="">Gravidades</option>
          <option
            v-for="gravidade in gravidades"
            :key="gravidade.id"
            :value="gravidade.id"
          >
            {{ gravidade.nome }}
          </option>
        </select>
      </div>

      <div class="input-group">
        <label for="imagem" class="input-group-text">Imagem</label>
        <input
          type="file"
          id="imagem"
          class="form-control"
          @change="handleImageUpload"
        />
      </div>

      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Descrição</label
        >
        <textarea
          v-model="planeta.descricao"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>

      <button @click="salvar" type="button" class="btn btn-success">
        Salvar
      </button>
    </div>
  </div>

  <div class="itens-lista">
    <table class="table align-middle mb-0">
      <thead class="btn-primary">
        <tr>
          <th>Foto</th>
          <th>Id</th>
          <th>Planetas</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Gravidade</th>
          <th>Clima</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="planeta in planetas" :key="planeta.id">
          <td>
            <img
              :src="`http://localhost:4000${planeta.foto}`"
              alt="Imagem do planeta"
              width="50"
              height="50"
            />
          </td>
          <td>
            <p class="fw-normal mb-1">{{ planeta.id }}</p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ planeta.nome }}</p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ planeta.descricao }}</p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ planeta.categoria.nome }}</p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ planeta.gravidade.nome }}</p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ planeta.clima.nome }}</p>
          </td>
          <td>
            <button
              @click="editar(planeta)"
              type="button"
              class="btn btn-warning"
              data-mdb-ripple-init
            >
              Editar
            </button>
            <button
              @click="excluir(planeta)"
              type="button"
              class="btn btn-danger"
              data-mdb-ripple-init
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.input-form {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: none;
  background-color: #f1f1f1;
}

.select-group {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 15px;
}

.form-select {
  width: 32%; 
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #f1f1f1;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.form-select:focus {
  background-color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.input-group-text {
  background-color: #f1f1f1;
  border: none;
  border-radius: 8px 0 0 8px;
  padding: 10px;
  font-size: 16px;
}

input[type="file"] {
  border-radius: 8px;
  padding: 10px;
  border: none;
  background-color: #f1f1f1;
}

textarea.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  background-color: #f1f1f1;
  border: none;
  margin-bottom: 15px;
}

textarea.form-control:focus {
  background-color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button.btn-success {
  background-color: #28a745;
  color: white;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.btn-success:hover {
  background-color: #218838;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
