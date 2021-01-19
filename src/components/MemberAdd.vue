<template>
  <teleport to="#modals">
    <div class="modal">
      <div class="w3-container w3-blue">
        <h2>Add Member</h2>
      </div>

      <div class="w3-container">
        <p>
          <label>Club Number</label>
          <input id="clubnumber" class="w3-input" type="text" />
        </p>
        <p>
          <label>First Name</label>
          <input id="firstname" class="w3-input" type="text" />
        </p>
        <p>
          <label>Last Name</label>
          <input id="lastname" class="w3-input" type="text" />
        </p>
        <p>
          <label>Email</label>
          <input id="email" class="w3-input" type="text" />
        </p>
        <p>
          <label>Cell Phone</label>
          <input id="cellphone" class="w3-input" type="text" />
        </p>
        <p>
          <label>Home Phone</label>
          <input id="homephone" class="w3-input" type="text" />
        </p>
        <div class="w3-bar">
          <button class="w3-button w3-red" @click="cancelAdd">Cancel</button>
          <button class="w3-button w3-green" @click="commitMember">
            Commit
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  emits: ["cancelAdd", "commitMember"],
  setup(props, context) {
    function cancelAdd() {
      context.emit("cancelAdd", "Add has been cancelled");
    }

    function commitMember() {
      context.emit("commitMember", {
        clubnumber: document.getElementById("clubnumber").value,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        cellphone: document.getElementById("cellphone").value,
        homephone: document.getElementById("homephone").value,
      });
    }
    return {
      cancelAdd,
      commitMember,
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
  background: gray;
  text-align: center;
}
</style>

v