<template>
  <div>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th v-for="k in ['Description', 'Is Team Event']" :key="k">
            {{ k }}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="(game, gindex) in games" :key="gindex">
        <td v-for="(k, index) in ['desc', 'teamevent']" :key="index">
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
import { getGames, changeGame, deleteGameByIndex } from "@/store.js";
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
      changeGame(gamedata);
      showEdit.value = false;
    }

    function editGame(g, i) {
      index.value = i;
      showEdit.value = true;
    }

    function deleteGame(g, i) {
      deleteGameByIndex(i);
    }

    return {
      index,
      games,
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
