<template>
  <div class="w3-row">
    <div class="w3-col m6">
      <span>
        <PlaceChoice @placeScoreChange="psChange" />
      </span>
    </div>
  </div>

  <div class="w3-row">
    <div class="w3-col m6">
      <div class="member-list">
        <div
          class="member"
          v-for="m in getMembers"
          :value="m"
          :key="m.membernumber"
        >
          <span :id="m.clubnumber" class="" @click="selectMember(m, $event)">
            {{ m.firstname + " " + m.lastname }}
          </span>
        </div>
      </div>
    </div>

    <div class="w3-col m2">
      <div>
        <button @click="commitTeam">Commit Team</button>
      </div>
      <div v-for="(m, index) in currentTeam" :key="index">
        <span class="deletehover" @click="removeFromTeam(m, index)">{{
          m.firstname + " " + m.lastname
        }}</span>
      </div>
    </div>

    <div class="w3-col m4">
      <div class="placelist" v-for="(teams, windex) in winners" :key="windex">
        <strong>{{ windex }} Place: &nbsp;&nbsp;{{ scores[windex] }} </strong>
        <div
          class="w3-panel w3-border deletehover"
          v-for="(team, tindex) in teams"
          :key="tindex"
          @click="deleteTeam(windex, tindex)"
        >
          <span v-for="(m, mindex) in team" :key="mindex">
            {{ m.firstname }}&nbsp;{{ m.lastname }}
            &nbsp;&nbsp;
          </span>
        </div>
        <br /><br />
      </div>
      <button @click="commitToDatabase">Commit to Database</button>
    </div>
  </div>
</template>

<script>
import PlaceChoice from "./PlaceChoice";
import { getGames, getMembers } from "@/store.js";
import { ref, computed } from "vue";

export default {
  components: {
    PlaceChoice,
  },
  props: {
    selectedGame: Object,
  },
  setup(props) {
    const selectedGame = computed(() => props.selectedGame);

    const currentAssigned = new Set();
    const selectedPlace = ref(0);
    // const places = { 1: "First", 2: "Second", 3: "Third" };
    // const place_colors = { 1: "First", 2: "Second", 3: "Third" };
    const currentTeam = ref([]);
    const winners = ref({
      First: [],
      Second: [],
      Third: [],
    });
    const scores = ref({});

    // eslint-disable-next-line no-unused-vars
    function selectMember(m, ev) {
      if (selectedGame.value == "") {
        alert("NO GAME SELECTED");
        return;
      }

      if (selectedPlace.value == 0) {
        alert("NO PLACE SELECTED");
        return;
      }

      if (currentAssigned.has(m.clubnumber)) {
        return;
      }

      ev.target.className = "team";

      addToTeam(m);
    }

    function addToTeam(m) {
      currentTeam.value.push(m);
      currentAssigned.add(m.clubnumber);
    }

    function removeFromTeam(m, index) {
      currentAssigned.delete(m.clubnumber);
      document.getElementById(m.clubnumber).className = "";
      currentTeam.value.splice(index, 1);
    }

    function commitTeam() {
      if (currentTeam.value.length == 0) {
        return;
      }
      if (scores.value[selectedPlace.value] == "") {
        alert("Score Missing for " + selectedPlace.value + " place");
        return;
      }
      let curteam = [];
      for (const m of currentTeam.value) {
        curteam.push(Object.assign({}, m));
        document.getElementById(m.clubnumber).className = selectedPlace.value;
      }
      currentTeam.value.length = 0;
      winners.value[selectedPlace.value].push(curteam);
    }

    function deleteTeam(windex, tindex) {
      for (const m of winners.value[windex][tindex]) {
        document.getElementById(m.clubnumber).classList.remove(windex);
        currentAssigned.delete(m.clubnumber);
      }
      winners.value[windex].splice(tindex, 1);
    }

    function psChange(info) {
      selectedPlace.value = info.place;
      scores.value = Object.assign({}, info.scores);
    }

    function commitToDatabase() {
      alert("Committed to Database");
    }

    return {
      selectMember,
      getGames,
      getMembers,
      currentTeam,
      winners,
      scores,

      removeFromTeam,
      commitTeam,
      deleteTeam,
      psChange,
      commitToDatabase,
    };
  },
};
</script>

<style scoped>
.place-choice {
  margin-top: 20px;
}
.place-choice label {
  margin-left: 5px;
  margin-right: 25px;
}
.select-game {
  margin: auto;
  width: 50%;
}
.member-list {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196f3;
  padding: 10px;
  margin: 20px;
}
.member {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 10px;
  font-size: 15px;
  text-align: center;
  user-select: none;
}
.First {
  background-color: lightgreen;
}
.Second {
  background-color: deepskyblue;
}
.Third {
  background-color: orange;
}
.team {
  background-color: violet;
}
.deletehover:hover {
  background-color: red;
}
.placelist {
  text-align: left;
}
</style>
