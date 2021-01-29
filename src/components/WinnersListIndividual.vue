<template>
  <div class="w3-display-container">
    <h1>Individual Winners</h1>

    <p>
      <!-- {{first[0].flight}} {{first[0].lastname}} -->
      {{ first[1] }}
    </p>
    <p>
      {{ second }}
    </p>
    <p>
      {{ third }}
    </p>

    <!-- First:    <div v-for="(m, index) in first" :key="index">
      {{ m.firstname + " " + m.lastname }}
    </div> <br>
    Second:    <div v-for="(m, index) in second" :key="index">
      {{ m.firstname + " " + m.lastname }}
    </div> <br>
    Third:    <div v-for="(m, index) in third" :key="index">
      {{ m.firstname + " " + m.lastname }}
    </div> <br> -->
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    winners: Object,
  },
  setup(props) {
    const first = computed(() => props.winners.First);
    const second = computed(() => props.winners.Second);
    const third = computed(() => props.winners.Third);

    const flights = computed(() => {
      const f = Set();
      for (const winner of first) {
        f.add(winner.flight);
      }
      for (const winner of second) {
        f.add(winner.flight);
      }
      for (const winner of first) {
        f.add(winner.third);
      }
      console.log(f);
      return f;
    });

    return {
      first,
      second,
      third,
      flights,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>