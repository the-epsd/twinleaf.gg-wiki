<template>
  <div id="app">
    <div v-if="setsLength > 0" class="app-body">
      <sidebar></sidebar>
      <div class="content">
        <router-view />
      </div>
    </div>
    <div v-else class="loader">
      <loader></loader>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";

import Loader from "./components/Loader";

export default {
  components: {
    Sidebar,
    Loader
  },
  data() {
    return {
    };
  },
  created() { 
    this.$store.dispatch("getSets");
  },
  computed: {
    setsLength () {
      return this.$store.getters.setsLength;
    }
  }
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

  .content {
    width: calc(100% - 250px);
    height: 100vh;
    overflow-y: auto;
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

.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
