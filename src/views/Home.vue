<template>
  <div class="home-center">
    <img class="logo" alt="logo" src="../assets/twinleaf-wiki.webp" width="196px" />
    <p class="small-info">
      Welcome to Twinleaf.gg's Wiki. Click on a set to start looking which cards are currently integrated.<br>
      If a card is greyed-out, you can request it to be added, which will send a notification to our Discord server.
    </p>
    <div class="links">
      <a class="link" href="https://discord.com/invite/Y9XKnC8dE5" target="_blank">
        <img src="https://img.icons8.com/ios11/512/FFFFFF/discord-logo.png" width="32px">
      </a>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
};
</script>

<style lang="scss">
.home-center {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.logo {
  height: auto;
  margin-bottom: 10px;
}

.small-info {
  width: 450px;
  text-align: center;
  padding: 10px 10px;
}

.link {
  .icon {
    width: 25px;
    height: 25px;
    fill: var(--font);
  }
}
</style>
