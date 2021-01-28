<template>
  <div>
    <label for="gamedate">Game Date:</label>
    &nbsp;
    <input type="date" id="gamedate" v-model="gamedate" />
    &nbsp;&nbsp;
    <select class="select-game" v-model="selectedGame">
      <option value="" disabled hidden selected>Choose the Game</option>
      <option v-for="(g, index) in getGames" :key="index" :value="g">
        {{ g.gamedesc }}
      </option>
    </select>
  </div>
  <div v-if="selectedGame.teamevent == 'N'">Individual Event</div>
  <div v-else-if="selectedGame.teamevent == 'Y'">Team Event</div>
  <div v-if="gamedate != ''">
    <WinnersIndividual
      v-if="selectedGame.teamevent == 'N'"
      :selectedGame="selectedGame"
    />
    <WinnersTeam
      v-else-if="selectedGame.teamevent == 'Y'"
      :selectedGame="selectedGame"
    />
  </div>
</template>

<script>
// import WinnersIndividual from "@/components/WinnersIndividual";
import WinnersIndividual from "@/components/WinnersIndividual";
import WinnersTeam from "@/components/WinnersTeam";

import { getGames } from "@/store.js";
import { ref } from "vue";
export default {
//   components: { WinnersIndividual, WinnersTeam },
  components: { WinnersIndividual, WinnersTeam },
  setup() {
    const selectedGame = ref("");
    
    const gamedate = ref("");

    return {
      getGames,
      gamedate,
      selectedGame,
    };
  },
};
</script>

<style scoped>
</style>
