<template>
  <teleport to="#modals">
    <div class="modal">
      <div class="w3-container w3-blue">
        <h2>Edit Game</h2>
      </div>

      <div class="w3-container">
        <p>
          <label>Game Description</label><br />
          <input
            class="w3-input"
            type="text"
            v-model="description"
            list="gamelist"
            @click="description = ''"
          />
          <datalist id="gamelist" style="width: 20px">
            <option
              v-for="(game, gindex) in games"
              :key="gindex"
              :value="game.gamedesc"
            >
              {{ game.gamedesc }}
            </option>
          </datalist>
        </p>
        <p>
          <span class="w3-margin">
            <input
              id="teamY"
              class="w3-radio"
              type="radio"
              name="teamevent"
              value="Y"
              v-model="teamevent"
            />
            <label>Team Event</label>
          </span>
          <span class="w3-margin">
            <input
              id="teamN"
              class="w3-radio"
              type="radio"
              name="teamevent"
              value="N"
              v-model="teamevent"
            />
            <label>Individual Event</label>
          </span>
        </p>

        <div class="w3-bar">
          <button class="w3-button w3-red" @click="cancelEdit">Cancel</button>
          <button class="w3-button w3-green" @click="commitEdit">Commit</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, computed } from "vue";

import { getGames } from "@/store.js";

import { state } from "@/store.js";

export default {
  emits: ["cancelEdit", "commitEdit"],
  props: {
    index: Number,
  },

  setup(props, context) {
    const index = computed(() => props.index);
    const game = computed(() => {
      return getGames.value[index.value];
    });
    const games = computed(() => {
      return getGames.value;
    });

    const key = game.value.key;
    const description = ref(game.value.gamedesc);
    const teamevent = ref(game.value.teamevent);

    function cancelEdit() {
      context.emit("cancelEdit", "Game cancelled");
    }

    function commitEdit() {
      context.emit("commitEdit", {
        key: key,
        gamedesc: description.value,
        teamevent: teamevent.value,
      });
    }

    return {
      cancelEdit,
      commitEdit,
      game,
      games,
      description,
      teamevent,
      state,
    };
  },
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* height: 300px;
  width: 400px; */
  width: 500px;
  background: gray;
  text-align: center;
}
</style>

v
