<script>
import ClimasApi from "@/api/climas.js";
const climasApi = new ClimasApi();
export default {
  data() {
    return {
      clima: {},
      climas: [],
    };
  },
  async created() {
    this.climas = await climasApi.buscarTodosOsClimas();
  },
  methods: {
    async salvar() {
      if (!this.clima.nome) {
        alert("O campo deve ser preenchido.");
        return;
      }

      if (this.clima.id) {
        await climasApi.atualizarClima(this.clima);
      } else {
        await climasApi.adicionarClima(this.clima);
      }
      this.climas = await climasApi.buscarTodosOsClimas();
      this.clima = {};
    },
    async excluir(clima) {
      await climasApi.excluirClima(clima.id);
      this.climas = await climasApi.buscarTodosOsClimas();
    },
    editar(clima) {
      Object.assign(this.clima, clima);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h3 class="display-8 text-center text-body-emphasis">
        Cadastro de climas
      </h3>
    </div>
    <div class="form-input">
      <input type="text" v-model="clima.nome" @keyup.enter="salvar" />
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
        <tr v-for="clima in climas" :key="clima.id">
          <td>
            <p class="fw-normal mb-1">{{ clima.id }}</p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ clima.nome }}</p>
          </td>
          <td>
            <button
              @click="editar(clima)"
              type="button"
              class="btn btn-warning"
              data-mdb-ripple-init
            >
              Editar
            </button>
            <button
              @click="excluir(clima)"
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

<style></style>
