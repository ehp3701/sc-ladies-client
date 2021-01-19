<template>
  <div>
    <span v-if="selectedGame.teamevent == 'N'"> Individual Event </span>
    <span v-else-if="selectedGame.teamevent == 'Y'"> Team Event </span>
    &nbsp;&nbsp;
    <select class="select-game" v-model="selectedGame">
      <option value="" disabled hidden selected>Choose the Game</option>
      <option v-for="g in getGames" :key="g.gamedate" :value="g">
        {{ g.gamedate.concat("\xa0\xa0\xa0\xa0").concat(g.gamedesc) }}
      </option>
    </select>
    &nbsp;&nbsp;
    Flight:&nbsp;
    <input id="flight" type="text" v-model="selectedFlight" size="6" list="flightlist" @click="selectedFlight=''">
    <datalist id="flightlist">
        <option value="A+B">A+B</option>
        <option value="A+D">A+D</option>
        <option value="B+C">B+C</option>
        <option value="C+D">C+D</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
    </datalist>

  </div>

  <WinnersIndividual
    v-if="selectedGame.teamevent == 'N'"
    :selectedGame="selectedGame"
  />
  <WinnersTeam v-else-if="selectedGame.teamevent == 'Y'" />
</template>

<script>
import WinnersIndividual from "@/components/WinnersIndividual";
import WinnersTeam from "@/components/WinnersTeam";

import { getGames } from "@/store.js";
import { ref } from "vue";
export default {
  components: { WinnersIndividual, WinnersTeam },
  setup() {
    const selectedGame = ref("");
    const selectedFlight = ref("")
    return {
      getGames,
      selectedGame,
      selectedFlight,
    };
  },
};
</script>

<style scoped>
</style>
