<template>
    <div>
         <button class="w3-button w3-light-blue w3-right"  @click="showAdd=true">Add Member</button>
        <MemberList />
    </div>
    <MemberAdd v-if="showAdd" @cancelAdd="cancelAddMember" @commitMember="commitMember" />
</template>

<script>
import { ref } from "vue";
import MemberList from '@/components/MemberList';
import MemberAdd from '@/components/MemberAdd';
import { addMember } from '@/store.js';
export default {
    components: {
        MemberList,
        MemberAdd,
    },
    setup () {
        const showAdd = ref(false);

        function cancelAddMember() {
            showAdd.value = false;
        }

        function commitMember(member) {
            addMember(member);
            showAdd.value = false;
        }

        return { 
            showAdd,
            cancelAddMember,
            commitMember,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>