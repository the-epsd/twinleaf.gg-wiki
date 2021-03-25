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
  </div>
</template>

<script>
export default {
  name: "Sidebar",
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
</style>