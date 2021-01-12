<template>
  <div v-if="loaded">
    <div class="header">
      <h1>{{ set.name }}</h1>
    </div>
    <div class="cards-container">
      <div class="card" v-for="card in cards" :key="card.id">
        <img :src="card.imageUrlHiRes" />
      </div>
    </div>
  </div>
  <div v-else class="loader">
    <Loader></Loader>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      set: [],
      cards: [],
      loaded: false,
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      this.loaded = false;

      this.$http
        .all([
          this.$http.get(
            "https://api.pokemontcg.io/v1/sets/" + this.$route.params.id
          ),
          this.$http.get(
            "https://api.pokemontcg.io/v1/cards?setCode=" +
              this.$route.params.id +
              "&pageSize=1000"
          ),
        ])
        .then(
          this.$http.spread((data1, data2) => {
            // output of req.
            this.loaded = true;
            this.set = data1.data.set;
            this.cards = data2.data.cards;
            console.log(this.cards);
          })
        );
    },
  },
};
</script>

<style lang="scss">
.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  padding: 10px;
  padding-bottom: 20px;
}

.cards-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0 10px;

  .card {
    height: 335px;
    width: 250px;
    margin-bottom: 10px;

    img {
      width: auto;
      height: 100%;
    }
  }
}
</style>