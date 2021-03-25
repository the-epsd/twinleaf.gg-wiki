<template>
  <div id="nav" class="nav">
    <router-link to="/">
      <h1>TCG-wiki</h1>
    </router-link>
    <div class="pk-sets" v-if="setsLength > 0">
      <router-link
        v-for="set in sets"
        :key="set.code"
        :to="`/${set.code}`"
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
    setsLength() {
      return this.$store.getters.setsLength;
    },
  },
};
</script>

<style lang="scss">
.nav {
  width: 250px;
  height: 100vh;
  background: #181818;
  padding: 10px;

  h1 {
    font-size: 22px;
    font-weight: 500;
    height: 40px;
  }
}

.pk-sets {
  overflow-y: auto;
  height: calc(100vh - 60px);

  .pk-set {
    display: flex;
    justify-content: flex-start;
    transition: all 0.2s ease;
    border-radius: 3px;
    // border-bottom: 1px solid #535353;
    // border-top: 1px solid #535353;

    .img {
      position: relative;
      height: 30px;
      width: 30px;
      // background-color:#535353;
      padding: 5px;
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
      background-color: #535353;
      cursor: pointer;
      transition: all 0.2s ease;
    }
  }
}

.active {
  background-color: #535353;
}
</style>