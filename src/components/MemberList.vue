<template>
  <div>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th
            v-for="k in [
              'clubnumber',
              'firstname',
              'lastname',
              'email',
              'cellphone',
              'homephone',
            ]"
            :key="k"
          >
            {{ k }}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="(mem, index) in members" :key="index">
        <td
          v-for="(k, index) in [
            'clubnumber',
            'firstname',
            'lastname',
            'email',
            'cellphone',
            'homephone',
          ]"
          :key="index"
        >
          {{ mem[k] }}
        </td>
        <td>
          <button @click="editMember(mem['clubnumber'], index)">Edit</button>
        </td>
        <td>
          <button @click="deleteClubnumberMember(mem['clubnumber'], index)">
            Del
          </button>
        </td>
      </tr>
    </table>
    <MemberEdit
      v-if="showEdit"
      @cancelEdit="cancelEdit"
      @commitEdit="commitEdit"
      :memberNumber="memberNumber"
    />
  </div>
</template>

<script>
import { getMembers, changeMember } from "@/store.js";
import { ref, computed } from "vue";
import MemberEdit from "@/components/MemberEdit";
import { deleteMember } from "@/store.js";

export default {
  components: {
    MemberEdit,
  },
  setup() {
    const showEdit = ref(false);
    const memberNumber = ref("");

    function cancelEdit() {
      showEdit.value = false;
    }

    function commitEdit(m) {
      changeMember(m);
      showEdit.value = false;
    }

    function editMember(clubnumber) {
      memberNumber.value = clubnumber;
      showEdit.value = true;
    }

    function deleteClubnumberMember(clubnumber, index) {
      deleteMember(clubnumber, index);
      showEdit.value = false;
    }

    return {
      members: computed(() => getMembers.value),
      showEdit,
      memberNumber,
      cancelEdit,
      commitEdit,
      editMember,
      deleteClubnumberMember,
    };
  },
};
</script>

<style  scoped>
tr:hover {
  background-color: #ffff99;
}
</style>