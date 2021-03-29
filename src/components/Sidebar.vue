<template>
  <div id="nav" class="nav">
    <div class="nav-top">
      <router-link to="/" class="logo">
        <img alt="Vue logo" src="../assets/Logo.svg" />
        <h1>TCG Wiki</h1>
      </router-link>
    </div>
    <div class="pk-sets" v-if="setsReady">
      <router-link
        v-for="set in sets"
        :key="set.code"
        :to="{ name: 'Set', params: { id: set.code } }"
        :class="{ active: set.code === $route.params.id }"
        class="pk-set"
      >
        <div class="img">
          <img :src="`${set.symbolUrl}`" :alt="`${set.name}`" />
        </div>
        <span>
          {{ set.name }}
        </span>
      </router-link>
    </div>
    <div v-else class="center">
      <loader></loader>
    </div>
  </div>
</template>

<script>
import Loader from "./Loader";

export default {
  name: "Sidebar",
  components: {
    Loader,
  },
  computed: {
    sets() {
      return this.$store.state.sets;
    },
    setsReady() {
      return this.$store.state.setsReady;
    },
  },
};
</script>

<style lang="scss">
.nav {
  width: 250px;
  height: 100vh;
  background: var(--blue-600);
  padding: 10px;

  .logo {
    display: flex;
    justify-content: flex-start;
    height: 30px;
    padding: 5px 0 15px 0;

    img {
      width: auto;
      height: 30px;
      padding: 0 7px 0 10px;
    }

    h1 {
      font-size: 22px;
      font-weight: 700;
    }
  }
}

.pk-sets {
  overflow-y: auto;
  height: calc(100vh - 60px);

  .pk-set {
    display: flex;
    justify-content: flex-start;
    transition: all 0.2s ease;
    border-radius: 25px;
    margin-bottom: 5px;
    margin-right: 5px;
    // border-bottom: 1px solid #535353;
    // border-top: 1px solid #535353;

    .img {
      position: relative;
      height: 30px;
      width: 30px;
      // background-color:#535353;
      padding: 5px 10px;
      padding-right: 10px;
      img {
        display: block;
        height: 30px;
        width: auto;
        max-width: 30px;
        margin: 0 auto;
      }
    }

    span {
      height: 24px;
      font-size: 14px;
      font-weight: 400;
      padding: 8px 0px;
    }

    &:hover {
      background-color: var(--blue-500);
      cursor: pointer;
      transition: all 0.2s ease;
    }
  }
}

.active {
  background-color: var(--primary);
  &:hover {
    background-color: var(--primary) !important;
    cursor: pointer;
    transition: all 0.2s ease;
  }
}
</style>