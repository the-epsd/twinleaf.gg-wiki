<template>
  <div class="Set">
    <h1>{{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
    };
  },
  mounted() {
    this.$http
      .all([
        this.$http.get("https://api.pokemontcg.io/v1/sets?name=" + this.$route.params.id),
        this.$http.get("https://api.pokemontcg.io/v1/cards?set=" + this.$route.params.id),
      ])
      .then(
        this.$http.spread((data1, data2) => {
          // output of req.
          console.log("data1", data1.data, "data2", data2.data);
        })
      );
    // this.$http
    //   .get("https://api.pokemontcg.io/v1/cards?set=" + this.$route.params.id)
    //   .then((response) => {
    //     this.response = response.data.cards;
    //     console.log(this.response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
  },
};
</script>