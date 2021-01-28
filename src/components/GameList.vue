<template>
  <div>
    <table id="gameListTable" class="w3-table-all">
      <thead>
        <tr>
          <th
            v-for="(k, index) in ['Description', 'Is Team Event']"
            :key="index"
            @click="sortTable(index)"
          >
            {{ k }}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="(game, gindex) in games" :key="gindex">
        <td v-for="(k, index) in ['gamedesc', 'teamevent']" :key="index">
          {{ game[k] }}
        </td>
        <td>
          <button @click="editGame(game, gindex)">Edit</button>
        </td>
        <td>
          <button @click="deleteGame(game, gindex)">Del</button>
        </td>
      </tr>
    </table>
    <GameEdit
      v-if="showEdit"
      @cancelEdit="cancelEdit"
      @commitEdit="commitEdit"
      :index="index"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
// eslint-disable-next-line no-unused-vars
import { getGames, putGame, deleteGameFromServer } from "@/store.js";
import GameEdit from "@/components/GameEdit";

export default {
  components: {
    GameEdit,
  },
  setup() {
    const showEdit = ref(false);
    const index = ref(null);

    const games = computed(() => getGames.value);

    function cancelEdit() {
      showEdit.value = false;
    }

    function commitEdit(gamedata) {
      putGame(gamedata);
      showEdit.value = false;
    }

    function editGame(g, i) {
      index.value = i;
      showEdit.value = true;
    }

    // eslint-disable-next-line no-unused-vars
    function deleteGame(g, i) {
      deleteGameFromServer(g);
    }

    function sortTable(n) {
      var table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
      table = document.getElementById("gameListTable");
      switching = true;
      // Set the sorting direction to ascending:
      dir = "asc";
      /* Make a loop that will continue until no switching has been done: */
      while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the first, which contains table headers): */
        for (i = 1; i < rows.length - 1; i++) {
          // Start by saying there should be no switching:
          shouldSwitch = false;
          /* Get the two elements you want to compare, one from current row and one from the next: */
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /* Check if the two rows should switch place, based on the direction, asc or desc: */
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch and mark that a switch has been done: */
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          // Each time a switch is done, increase this count by 1:
          switchcount++;
        } else {
          /* If no switching has been done AND the direction is "asc", 
          set the direction to "desc" and run the while loop again. */
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }

    return {
      index,
      games,
      showEdit,
      editGame,
      deleteGame,
      cancelEdit,
      commitEdit,
      sortTable,
    };
  },
};
</script>

<style lang="scss" scoped></style>
