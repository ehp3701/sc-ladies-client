<template>
  <div>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th v-for="k in ['gamedate', 'gamedesc', 'teamevent']" :key="k">
            {{ k }}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="(game, index) in games" :key="index">
        <td
          v-for="(k, index) in ['gamedate', 'gamedesc', 'teamevent']"
          :key="index"
        >
          {{ game[k] }}
        </td>
        <td>
          <button @click="editGame(game['gamedate'], index)">Edit</button>
        </td>
        <td>
          <!-- <button @click="deleteGame(game['gamedate'], index)">Del</button> -->
          <button @click="deleteGame(index)">Del</button>
        </td>
        <!-- <td><button>Edit</button></td>
        <td><button>Del</button></td> -->
      </tr>
    </table>
    <GameEdit
      v-if="showEdit"
      @cancelEdit="cancelEdit"
      @commitEdit="commitEdit"
      :index="index"
      :gameDate="gameDate"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { getGames, changeGame, deleteGameByIndex } from "@/store.js";
import GameEdit from "@/components/GameEdit";

export default {
  components: {
    GameEdit,
  },
  setup() {
    const showEdit = ref(false);
    const gameDate = ref("");
    const index = ref(null);

    function cancelEdit() {
      showEdit.value = false;
    }

    function commitEdit(gamedata) {
      changeGame(gamedata);
      showEdit.value = false;
    }

    function editGame(gamedate, foundIndex) {
      gameDate.value = gamedate;
      index.value = foundIndex;
      showEdit.value = true;
    }

    function deleteGame(index) {
      deleteGameByIndex(index);
    }

    return {
      gameDate,
      index,
      games: computed(() => getGames.value),
      showEdit,
      editGame,
      deleteGame,
      cancelEdit,
      commitEdit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
