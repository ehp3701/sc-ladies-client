<template>
  <table class="place-table">
    <tr>
      <td></td>
      <td>
        <input
          class="w3-radio"
          type="radio"
          name="place"
          value="First"
          v-model="selectedPlace"
        />
        <label class="First">First</label>
      </td>
      <input
        class="w3-radio"
        type="radio"
        name="place"
        value="Second"
        v-model="selectedPlace"
      />
      <label class="Second">Second</label>
      <td>
        <input
          class="w3-radio"
          type="radio"
          name="place"
          value="Third"
          v-model="selectedPlace"
        />
        <label class="Third">Third</label>
      </td>
    </tr>
    <tr>
      <td>Score:</td>
      <td>
        <input
          v-model="firstScore"
          type="text"
          size="4"
          list="scores"
          @click="firstScore = ''"
        />
      </td>
      <td>
        <input
          v-model="secondScore"
          type="text"
          size="4"
          list="scores"
          @click="secondScore = ''"
        />
      </td>
      <td>
        <input
          v-model="thirdScore"
          type="text"
          size="4"
          list="scores"
          @click="thirdScore = ''"
        />
      </td>
    </tr>
  </table>
  <datalist id="scores">
    <option v-for="(score, index) in scoreList" :key="index" :value="score">
      {{ score }}
    </option>
  </datalist>
  &nbsp;&nbsp; Flight:&nbsp;
  <input
    id="flight"
    type="text"
    v-model="selectedFlight"
    size="6"
    list="flightlist"
    @click="selectedFlight = ''"
  />
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

  {{selectedFlight}}
</template>

<script>
import { computed, ref, watch } from "vue";

export default {
  emits: ["placeScoreChange"],

  setup(props, context) {
    const selectedFlight = ref("");
    const selectedPlace = ref(0);
    const firstScore = ref("");
    const secondScore = ref("");
    const thirdScore = ref("");
    const scoreList = computed(() => {
      const scores = [];
      for (let i = 65; i <= 125; i++) {
        scores.push(i);
      }
      return scores;
    });

    const scores = computed(() => {
      return {
        First: firstScore.value,
        Second: secondScore.value,
        Third: thirdScore.value,
      };
    });

    const placeScores = computed(() => {
      return { place: selectedPlace.value, scores: scores.value, flight: selectedFlight.value };
    });

    watch(placeScores, () => {
      context.emit("placeScoreChange", placeScores.value);
    });

    return {
      selectedFlight,
      selectedPlace,
      scores,
      firstScore,
      secondScore,
      thirdScore,
      scoreList,
    };
  },
};
</script>

<style scoped>
.place-table {
  margin: auto;
}
.First {
  color: lightgreen;
}
.Second {
  color: deepskyblue;
}
.Third {
  color: orange;
}
</style>