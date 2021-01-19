<template>
  <teleport to="#modals">
    <div class="modal">
      <div class="w3-container w3-blue">
        <h2>Edit Game</h2>
      </div>

      <div class="w3-container">
        <p>
          <label>Game Date</label>
          <input
            id="gamedate"
            class="w3-input"
            type="date"
            v-model="date"
          />
        </p>
        <p>
          <label>Game Description</label><br />
          <input class="w3-input"  type="text" v-model="description" list="gamelist" @click="description=''">
          <datalist id="gamelist" style="width:20px">
            <option>18 Hole Invitational</option>
            <option>18 Hole Ladies Member Guest</option>
            <option>2 Person Blind 9; A+B;C+D Flighted BB</option>
            <option>2 Person Scramble; A+D; B+C Flighted (9 Hole Inv)</option>
            <option>2 Person Shamble A+B, C+D 1 BB Net</option>
            <option>3 Jacks and a Jill</option>
            <option>4 clubs + Putter; ABCD 1 BB net</option>
            <option>9 + 18 Closing Day Scramble ABCD</option>
            <option>ABCD 2 BB of 4</option>
            <option>BB of Partners</option>
            <option>Beat the Pro</option>
            <option>Blind Draw BB of Partners</option>
            <option>Count 1 on the 5's, 2 on the 4's 3 on the 3's</option>
            <option>Fairways&Greens +1; Random Team</option>
            <option>Front 9/Back 9 Partners A+B;C+D Partners</option>
            <option>Individual Best 9</option>
            <option>Individual Best 9</option>
            <option>Low Putts Random Team</option>
            <option>Mid Season Mixer; 9 + 18 Hole Leagues ABCD Scramble</option>
            <option>Opening Breakfast Scramble</option>
            <option>Red Blue Guess Who</option>
            <option>Red Blue Guess who</option>
            <option>Red/White/Blue ABCD 1 BB net</option>
            <option>Worst 6</option>
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
        {{date}}<br>
        {{description}}<br>
        {{teamevent}}

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
// eslint-disable-next-line no-unused-vars
import { getGame, getGames } from "@/store.js";

export default {
  emits: ["cancelEdit", "commitEdit"],
  props: {
    gameDate: String,
    index: Number,
  },
  setup(props, context) {
    const gameDate = computed(() => props.gameDate);
    const index = computed(() => props.index);

    const game = computed(() => {
      return getGames.value[index.value];
    });

    const date = ref(game.value.gamedate);
    const description = ref(game.value.gamedesc);
    const teamevent = ref(game.value.teamevent)


    function cancelEdit() {
      context.emit("cancelEdit", "Game cancelled", gameDate.value);
    }

    function commitEdit() {
      context.emit("commitEdit", {
        index: index.value,
        edtGame: {
          gamedate: date.value,
          gamedesc: description.value,
          teamevent: teamevent.value,
        },
      });
    }

    return {
      cancelEdit,
      commitEdit,
      game,
      date,
      description,
      teamevent
    };
  },
};
</script>

<style  scoped>
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