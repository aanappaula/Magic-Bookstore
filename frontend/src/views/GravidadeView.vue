<script>
import GravidadesApi from "@/api/gravidades.js";
const gravidadesApi = new GravidadesApi();
export default {
  data() {
    return {
      gravidade: {},
      gravidades: [],
    };
  },
  async created() {
    this.gravidades = await gravidadesApi.buscarTodasAsGravidades();
  },
  methods: {
    async salvar() {
      if (!this.gravidade.nome) {
        alert("O campo deve ser preenchido.");
        return;
      }
      if (this.gravidade.id) {
        await gravidadesApi.atualizarGravidade(this.gravidade);
      } else {
        await gravidadesApi.adicionarGravidade(this.gravidade);
      }
      this.gravidades = await gravidadesApi.buscarTodasAsGravidades();
      this.gravidade = {};
    },
    async excluir(gravidade) {
      await gravidadesApi.excluirGravidade(gravidade.id);
      this.gravidades = await gravidadesApi.buscarTodasAsGravidades();
    },
    editar(gravidade) {
      Object.assign(this.gravidade, gravidade);
    },
  },
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h3 class="display-8 text-center text-body-emphasis">
        Cadastro de gravidades
      </h3>
    </div>
    <div class="form-input">
      <input type="text" v-model="gravidade.nome" @keyup.enter="salvar" />
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
        <tr v-for="gravidade in gravidades" :key="gravidade.id">
          <td>
            <p class="fw-normal mb-1">{{ gravidade.id }}</p>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ gravidade.nome }}</p>
          </td>
          <td>
            <button
              @click="editar(gravidade)"
              type="button"
              class="btn btn-warning"
              data-mdb-ripple-init
            >
              Editar
            </button>
            <button
              @click="excluir(gravidade)"
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
