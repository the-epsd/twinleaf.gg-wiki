<template>
  <div v-if="cardsReady">
    <div class="header">
      <div>
        <h3>
          {{ currentCards.series }} &bull; Released on:
          {{ currentCards.releaseDate }} &bull;
          {{ legalty(currentCards.legalities) }}
        </h3>
        <h1>{{ currentCards.name }}</h1>
        <!-- <h3>Release date: {{ currentCards.releaseDate }}</h3> -->
      </div>
      <div class="search-container">
        <div class="search">
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
          <input
            class="input"
            type="text"
            placeholder="Search"
            v-model="filterWord"
          />
          <svg
            class="icon delete"
            @click="clearFilter()"
            v-if="filterWord != ''"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g data-name="Layer 2">
              <g data-name="close">
                <rect
                  width="24"
                  height="24"
                  transform="rotate(180 12 12)"
                  opacity="0"
                />
                <path
                  d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="cards-container">
      <div 
        class="card" 
        v-for="card in filteredList" 
        :key="card.id"
        :class="{
          'greyscale': !isImplemented(card.id),
          'bugged': isBugged(card.id)
        }"
      >
      <div class="card-wrapper">
        <card :card="card"></card>
<button 
  v-if="!isImplemented(card.id) && !isBugged(card.id)" 
  @click="sendToDiscord(card)"
  :class="['request-button', { 'clicked': clickedCards[card.id] }]"
  :disabled="clickedCards[card.id]"
>
  <span v-if="!clickedCards[card.id]">Request Card</span>
  <span v-else>👍 Requested!</span>
</button>

      </div>
    </div>
  </div>
</div>
  <div v-else class="loader">
    <Loader></Loader>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import Card from "../components/Card.vue";
import implementedCards from '../data/implemented-cards.json'
import buggedCards from '../data/bugged-cards.json'

export default {
  components: {
    Loader,
    Card,
  },
data() {
  return {
    set: [],
    cards: [],
    loaded: false,
    filterWord: "",
    implementedCardIds: implementedCards.implementedCardIds,
    buggedCardIds: buggedCards.buggedCardIds,
    clickedCards: {}
  };
},

created() {
  this.fetchData();
  this.clickedCards = JSON.parse(localStorage.getItem('requestedCards')) || {};
},
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      if (this.cardsReady == true) {
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
    isImplemented(cardId) {
      return this.implementedCardIds.includes(cardId);
    },
    isBugged(cardId) {
      return this.buggedCardIds.includes(cardId);
    },
    sendToDiscord(card) {
    this.$set(this.clickedCards, card.id, true)
    localStorage.setItem('requestedCards', JSON.stringify(this.clickedCards))
      const webhookUrl = 'https://discord.com/api/webhooks/1325950566379290725/u99T5BE8tlZsKuSYItrfOESDQKLj30R_7Y_Eub1aL65_oPBxjPhH14mNHe3Fl42JosIm'
      const message = {
      content: `Card Implementation Request: ${card.name} (${card.id})`,
      embeds: [{
        title: card.name,
        description: `Set: ${card.set.name}`,
        image: {
          url: card.images.large
        }
      }]
    }
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify(message)
      })
    },
    clearFilter() {
      this.filterWord = "";
    },
    legalty(legal) {
      let message = [];
      if (legal.standard != undefined) {
        message.push("Standard: ✅");
      }
      if (legal.expanded != undefined) {
        message.push("Expanded: ✅");
      }

      if (legal.unlimited != undefined) {
        message.push("Unlimited: ✅");
      }

      return message.join(" • ");
    },
  },
computed: {
  filteredList() {
    let baseList = this.currentCards.cards;
    
    // Sort cards by numerical ID
    baseList = baseList.sort((a, b) => {
      const numA = parseInt(a.id.split('-')[1]);
      const numB = parseInt(b.id.split('-')[1]);
      return numA - numB;
    });

    if (this.filterWord != "") {
      return baseList.filter((card) => {
        return card.name
          .toLowerCase()
          .includes(this.filterWord.toLowerCase());
      });
    } else {
      return baseList;
    }
  },
    currentCards() {
      return this.$store.getters.setIndex(this.$route.params.id);
  },
    cardsReady() {
      return this.$store.state.cardsReady;
  },
  }
};
</script>

<style lang="scss">
@import "../style/responsive.scss";

.card.greyscale img {
  filter: grayscale(100%);
  opacity: 0.7;
}

.card.bugged img {
  filter: sepia(100%) saturate(300%) brightness(70%) hue-rotate(300deg);
}

.card-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.request-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.request-button {
  transition: all 0.3s ease;
  
  &.clicked {
    background: #4CAF50;
    transform: translate(-50%, -50%) scale(0.95);
    cursor: default;
  }
  
  &:not(.clicked):hover {
    transform: translate(-50%, -50%) scale(1.05);
  }
}

@keyframes thumbsUp {
  0% { transform: scale(1); }
  50% { transform: scale(1.2) rotate(20deg); }
  100% { transform: scale(1); }
}

.clicked span {
  display: inline-block;
  animation: thumbsUp 0.5s ease;
}

.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  padding: 20px;
  padding-bottom: 20px;
  display: block;

  h1 {
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 10px;
  }

  h3 {
    font-weight: 400;
    font-size: 12px;
    margin-bottom: 5px;
  }

  .search-container {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    height: 20px;
    padding: 5px 0px;
    border-radius: 5px;
    border: 1px solid var(--primary);
    background: var(--blue-600);

    .icon {
      fill: var(--font);
      width: 20px;
      height: 20px;
      padding: 0 2px;
    }

    .delete {
      cursor: pointer;
    }

    .input {
      background: none;
      border: none;
      color: var(--font);
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
  padding: 0 20px;
  padding-bottom: 100px;
  gap: 10px;

  .card {
    height: auto;
    width: 100%;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: auto;
    }
  }
}

//responsive
.header {
  @include respond-to("tablet") {
    h1 {
      font-size: 48px;
    }

    h3 {
      font-size: 14px;
    }
  }

  @include respond-to("phablet") {
    display: flex;
    justify-content: space-between;
  }
}

@include respond-to("mobile-lg") {
  .cards-container {
    justify-content: flex-start;
    gap: 10px;

    .card {
      height: auto;
      width: 157px;
      margin-bottom: 10px;
    }
  }
}

.cards-container {
  @include respond-to("tablet") {
    padding-bottom: 20px;
    gap: 10px;

    .card {
      height: auto;
      width: 250px;
      margin-bottom: 10px;
    }
  }
}
</style>