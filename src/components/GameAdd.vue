<template>
  <teleport to="#modals">
    <div class="modal">
      <div class="w3-container w3-blue">
        <h2>Add Game</h2>
      </div>

      <div class="w3-container">
        <!-- <p>
          <label>Game Date</label>
          <input id="gamedate" class="w3-input" type="date" />
        </p> -->
        <p>
          <label>Game Description</label><br />
          <input class="w3-input" type="text" v-model="description" />
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
          <button class="w3-button w3-red" @click="cancelGame">Cancel</button>
          <button class="w3-button w3-green" @click="commitGame">Commit</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["cancelGame", "commitGame"],
  setup(props, context) {
    const description = ref("");
    const teamevent = ref("");
    function cancelGame() {
      context.emit("cancelGame", "Game cancelled");
    }

    function commitGame() {
      context.emit("commitGame", {
        gamedesc: description.value,
        teamevent: teamevent.value,
      });
    }

    return {
      description,
      teamevent,
      cancelGame,
      commitGame,
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
  width: 500px;
  background: gray;
  text-align: center;
}
</style>

v
