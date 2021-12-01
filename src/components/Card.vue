<template>
  <div class="card-container">
    <img @click="$refs.modalName.openModal()" :src="card.images.small" />
    <modal ref="modalName">
      <template v-slot:header>
        <h1>{{ card.name }}</h1>
      </template>

      <template v-slot:body>
        <div class="flex-container-row">
          <img class="large-img" :src="card.images.large" alt="Pokemon card" />
          <div class="card-details">
            <h3>Artist: {{ card.artist }}</h3>
            <div v-if="card.supertype === 'Pokémon'">
              <h3>Type: {{ card.types[0] }}</h3>
              <h3>HP: {{ card.hp }}</h3>
              <h3 v-if="card.evolvesFrom != undefined">
                Evolved from: {{ card.evolvesFrom }}
              </h3>
              <h3 v-if="card.evolvesTo != undefined">
                Evolves to:
                <span v-for="poke in card.evolvesTo" :key="poke"
                  >{{ poke }},</span
                >
              </h3>
              <h3 v-if="card.weaknesses != undefined">
                Weaknesses:
                <span v-for="poke in card.weaknesses" :key="poke"
                  >{{ poke.value }} to {{ poke.type }}</span
                >
              </h3>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <div></div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "./Modal";

export default {
  name: "Card",
  props: ["card"],
  components: {
    Modal,
  },
};
</script>

<style lang="scss">
@import "../style/responsive.scss";

.card-container {
  height: inherit;
  width: inherit;
}

.flex-container-row {
  display: flex;
  flex-direction: column;

  .large-img {
    width: 400px !important;
    height: auto !important;
    margin-right: 10px;
  }

  .card-details {
    margin-left: 20px;
    h3 {
      font-weight: 400;
      font-size: 18px;
    }
  }
}

@include respond-to("tablet") {
  .flex-container-row {
    display: flex;
    flex-direction: row;
  }
}
</style>