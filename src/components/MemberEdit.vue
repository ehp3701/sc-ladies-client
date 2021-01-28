<template>
  <teleport to="#modals">
    <div class="modal">
      <div class="w3-container w3-blue">
        <h2>Edit Member</h2>
      </div>

      <div class="w3-container">
        <p>
          <label>Club Number</label>
          <input id="clubnumber" class="w3-input" type="text" :value="member.clubnumber"/>
        </p>
        <p>
          <label>First Name</label>
          <input id="firstname" class="w3-input" type="text" :value="member.firstname" />
        </p>
        <p>
          <label>Last Name</label>
          <input id="lastname" class="w3-input" type="text" :value="member.lastname" />
        </p>
        <p>
          <label>Email</label>
          <input id="email" class="w3-input" type="text" :value="member.email" />
        </p>
        <p>
          <label>Cell Phone</label>
          <input id="cellphone" class="w3-input" type="text" :value="member.cellphone" />
        </p>
        <p>
          <label>Home Phone</label>
          <input id="homephone" class="w3-input" type="text" :value="member.homephone" />
        </p>
        <p>
          <label>Flight</label>
          <input id="flight" class="w3-input" type="text" :value="member.flight" />
        </p>
        <p>
          <label>League</label>
          <input id="league" class="w3-input" type="text" :value="member.league" />
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
import { computed } from "vue";
import { getMemberByClubNumber } from "@/store.js";

export default {
  emits: ["cancelEdit", "commitEdit"],

  props: {
    memberNumber: String,
  },
  setup(props, context) {
    const memberNum = computed(() => props.memberNumber);
    const member = computed(() => {
      return getMemberByClubNumber(memberNum.value);
    });

    function cancelEdit() {
      context.emit("cancelEdit", "Edit has been cancelled");
    }

    function commitEdit() {
      context.emit("commitEdit", {
        clubnumber: document.getElementById("clubnumber").value,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        cellphone: document.getElementById("cellphone").value,
        homephone: document.getElementById("homephone").value,
        flight: document.getElementById("flight").value,
        league: document.getElementById("league").value,
      });
    }

    return {
      cancelEdit,
      commitEdit,
      member,
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
  background: gray;
  text-align: center;
}
</style>
