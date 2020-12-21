<template>
  <div id="app" class="app-body">
    <div id="nav" class="nav">
      <h1>TCG-wiki</h1>
      <div class="pk-sets">
        <router-link
          v-for="set in response"
          :key="set.code"
          :to="`/set/${set.code}`"
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
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response: [],
    };
  },
  mounted() {
    this.$http
      .get("https://api.pokemontcg.io/v1/sets")
      .then((response) => {
        this.response = response.data.sets;
        console.log(this.response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
@import url("https://use.typekit.net/eqp3quc.css");

* {
  white-space: -moz-pre-wrap;
  word-wrap: break-word;
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: sofia-pro;

  a {
    color: #eeeeee;
  }
}

:root {
  --app-height: 100%;
}

html,
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: #121212;
  color: #eeeeee;

  @media not all and (hover: hover) {
    height: var(--app-height);
  }
}

.app-body {
  display: flex;

  .nav {
    width: 250px;
    height: 100vh;
    background: #181818;
    padding: 10px;
    font-size: 400;

    h1 {
      font-size: 22px;
      font-weight: 500;
      height: 40px;
    }
  }

  .content {
    width: calc(100% - 250px);
    height: 100vh;
  }
}

.pk-sets {
  overflow-y: auto;
  height: calc(100vh - 60px);

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: unset;
  }

  &::-webkit-scrollbar-thumb {
    background: #282828;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #2e2e2e;
    border-radius: 5px;
    cursor: pointer;
  }

  .pk-set {
    display: flex;
    justify-content: flex-start;
    
    .img {
      height: 30px;
      width: 30px;
      img {
        height: auto;
        width: 30px;
      }
    }

    span {
      font-size: 14px;
    }
  }
}
</style>
