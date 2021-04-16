<template>
  <div v-if="cardsReady">
    <div class="header">
      <div>
        <h3>Release date: {{ currentCards.releaseDate }}</h3>
        <h1>{{ currentCards.name }}</h1>
      </div>
      <div class="search-container">
        <div class="search">
          <input
            class="input"
            type="text"
            placeholder="Search"
            v-model="filterWord"
          />
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g data-name="Layer 2">
              <g data-name="search">
                <rect width="24" height="24" opacity="0" />
                <path
                  d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="cards-container">
      <div class="card" v-for="card in filteredList" :key="card.id">
        <img :src="card.imageUrl" />
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
      filterWord: "",
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
      if(this.cardsReady == true) {
        this.$store.dispatch("toggleCardsReady");
      }
      if (this.currentCards.cards != undefined) {
        this.$store.dispatch("toggleCardsReady");
          this.cards = this.currentCards.cards;
      } else {
        this.$store.dispatch("getCards", { setID: this.$route.params.id });
        if (this.currentCards.cards == undefined) {
          this.currentCards.cards = [];
        }
      }
    },
  },
  computed: {
    filteredList() {
      return this.currentCards.cards.filter((card) => {
        return card.name.toLowerCase().includes(this.filterWord.toLowerCase());
      });
    },
    currentCards() {
      return this.$store.getters.setIndex(this.$route.params.id);
    },
    cardsReady() {
      return this.$store.state.cardsReady;
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
  display: flex;
  justify-content: space-between;

  h1 {
    font-weight: 500;
    font-size: 32px;
    line-height: 32px;
  }

  h3 {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .search-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    height: 20px;
    border-bottom: 1px solid #bbbbbb;

    .icon {
      fill: #bbbbbb;
      width: 20px;
      height: 20px;
    }

    .input {
      background: none;
      border: none;
      color: #eeeeee;
      padding-left: 3px;
      width: 150px;

      &::placeholder {
        color: #bbbbbb;
        padding-left: 3px;
        font-weight: 400;
      }

      &:focus {
        outline: none;
      }
    }
  }
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