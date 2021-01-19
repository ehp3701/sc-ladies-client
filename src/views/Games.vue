<template>
  <div>
    <button class="w3-button w3-light-blue w3-right" @click="showAdd = true">
      Add Game
    </button>
    <GameList />
  </div>
  <GameAdd
    v-if="showAdd"
    @cancelGame="cancelGame"
    @commitGame="commitGame"
  />
</template>

<script>
import { ref } from "vue";
import GameList from "@/components/GameList";
import GameAdd from "@/components/GameAdd";
import { addGame } from "@/store.js";
export default {
  components: {
    GameList,
    GameAdd,
  },
  setup() {
    const showAdd = ref(false);

    function cancelGame() {
      showAdd.value = false;
    }

    function commitGame(gamedata) {
      addGame(gamedata);
      showAdd.value = false;
    }

    return {
      showAdd,
      cancelGame,
      commitGame,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>