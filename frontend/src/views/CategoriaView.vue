<script>
import CategoriasApi from "@/api/categorias.js";
const categoriasApi = new CategoriasApi();
export default {
  data() {
    return {
      categoria: {},
      categorias: [],
    };
  },
  async created() {
    this.categorias = await categoriasApi.buscarTodasAsCategorias();
  },
  methods: {
    async salvar() {
      if (!this.categoria.nome) {
        alert("O campo deve ser preenchido.");
        return;
      }

      if (this.categoria.id) {
        await categoriasApi.atualizarCategoria(this.categoria);
      } else {
        await categoriasApi.adicionarCategoria(this.categoria);
      }
      this.categorias = await categoriasApi.buscarTodasAsCategorias();
      this.categoria = {};
    },
    async excluir(categoria) {
      await categoriasApi.excluirCategoria(categoria.id);
      this.categorias = await categoriasApi.buscarTodasAsCategorias();
    },
    editar(categoria) {
      Object.assign(this.categoria, categoria);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h3 class="display-8 text-center text-body-emphasis">
        Cadastro de categorias
      </h3>
    </div>
    <div class="form-input">
      <input type="text" v-model="categoria.nome" @keyup.enter="salvar" />
      <button
        @click="salvar"
        type="button"
        class="btn btn-success"
        data-mdb-ripple-init
      >
        Adicionar
      </button>
    </div>

    <table class="table align-middle mb-0">
      <thead class="btn-primary">
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td>
            <p class="fw-normal mb-1">{{ categoria.id }}</p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ categoria.nome }}</p>
          </td>
          <td>
            <button
              @click="editar(categoria)"
              type="button"
              class="btn btn-warning"
              data-mdb-ripple-init
            >
              Editar
            </button>
            <button
              @click="excluir(categoria)"
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

<style>
.form-input {
  padding-top: 10px;
  display: flex;
  justify-content: center;
  border-radius: 15px;
}
</style>
