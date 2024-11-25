<script>
import axios from 'axios';

export default {
  data() {
    return {
      planetas: [], 
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:4000/planetas');
      this.planetas = response.data; 
    } catch (error) {
      console.error('Erro ao carregar planetas:', error);
      alert('Erro ao carregar planetas');
    }
  },
};

</script>
<template>
  <div class="px-4 my-5 text-center">
    <h1 class="display-4 fw-bold text-body-emphasis">
      Bem vindo ao Space Explorer!
    </h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">
        Explore dados sobre planetas e outros corpos celestes. Adicione, edite e
        visualize informações detalhadas, como tipo, tamanho e imagens, em uma
        interface simples e intuitiva.
      </p>
    </div>
    <div class="overflow-hidden" style="max-height: 50vh; max-width: 500vh">
      <div class="container px-5">
        <img
          src="https://www.nasa.gov/wp-content/uploads/2023/09/astronaut.jpg?w=1920"
          class="img-fluid border rounded-3 shadow-lg mb-4"
          alt="Example image"
          width="700"
          height="1000"
          loading="lazy"
        />
      </div>
    </div>
  </div>

  <h3 class="display-6 text-body-emphasis">Conheça os planetas</h3>

  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="planeta in planetas" :key="planeta.id">
      <div class="card">
        <img
          :src="`http://localhost:4000${planeta.foto}`"
          class="card-img-top fixed-image"
          alt="Imagem do planeta"
          width="50px"
          height="500px"
        />
        <div class="card-body">
          <h5 class="card-title">{{ planeta.nome }}</h5>
          <p class="card-text">{{ planeta.descricao }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  color: blue;
}
.fixed-image {
  width: 100%; 
  height: 300px; 
  object-fit: cover; 
}
</style>
