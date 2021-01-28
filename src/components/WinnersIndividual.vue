<template>
  <div class="w3-row">
    <div class="w3-col m6">
      <PlaceChoice @placeScoreChange="psChange" />
    </div>
  </div>

  <div class="w3-row w3-container">
    <div class="w3-col m6" w3-center>
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

    <div class="w3-col m6 w3-center">
        <WinnersListIndividual :winners="winners" />

      <!-- <div v-for="(w, index) in winners" :key="index">
        <strong>{{ index }} Place: &nbsp;&nbsp;{{ scores[index] }} </strong>
        <br /><br />
        <span
          class="winnersListMember"
          v-for="(m, mindex) in w"
          :key="mindex"
          @click="removeMember(index, mindex, $event)"
        >
          {{ m.firstname + " " + m.lastname }}
          <br />
        </span>
        <br /><br />
      </div>
      <button @click="commitToDatabase">Commit to Database</button>
     -->
     </div>
  </div>
</template>

<script>
import PlaceChoice from "./PlaceChoice";
import WinnersListIndividual from "./WinnersListIndividual";
import { getGames, getMembers } from "@/store.js";
import { ref, computed } from "vue";

export default {
  components: {
    PlaceChoice, WinnersListIndividual,
  },
  props: {
    selectedGame: Object,
    // selectedFlight: String,
  },
  setup(props) {
    const selectedGame = computed(() => props.selectedGame);
    const currentAssignedClubNo = new Set();
    const selectedPlace = ref(0);
    let selectedFlight = "";

    const winners = ref({
      First: [],
      Second: [],
      Third: [],
    });

    const scores = ref({});

    function selectMember(m, ev) {
      if (selectedGame.value == "") {
        alert("NO GAME SELECTED");
        return;
      }
      if (selectedPlace.value == 0) {
        alert("NO PLACE SELECTED");
        return;
      }
      if (scores.value[selectedPlace.value] == "") {
        alert("Score not entered for " + selectedPlace.value + " place");
        return;
      }
      if (currentAssignedClubNo.has(m.clubnumber)) {
        return;
      }

      ev.target.className = selectedPlace.value;

      const winner = Object.assign({}, {
          flight: selectedFlight,
          member: m
      });
      winners.value[selectedPlace.value].push(winner);
      currentAssignedClubNo.add(winner.clubnumber);
    }

    function removeMember(index, mindex) {
      const cn = winners.value[index][mindex].clubnumber;
      document.getElementById(cn).className = "";
      winners.value[index].splice(mindex, 1);
      currentAssignedClubNo.delete(cn);
    }

    function psChange(info) {
      console.log("info", info);
      selectedPlace.value = info.place;
      scores.value = info.scores;
      selectedFlight = info.flight;
    }

    function commitToDatabase(){
        alert( "Committed to Database");
    }

    return {
      getGames,
      getMembers,
      winners,
      selectMember,
      selectedPlace,
      removeMember,
      psChange,
      scores,
      commitToDatabase,
    };
  },
};
</script>

<style scoped>
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
.winnersListMember:hover {
  background-color: red;
}
.placelist {
  text-align: left;
}
</style>
