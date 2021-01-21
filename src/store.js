import { ref, computed } from "vue";
import axios from 'axios'

const serverURL = "https://ehp-server.herokuapp.com";

const state = ref({
    members: [],
    games: [],
})

/* 
 * *********************************************************************
 * Games related
 * *********************************************************************
*/
const getGames = computed(() => state.value.games);

function addGame(game) {
    state.value.games.push(game);
}


function changeGame(gamedata) {
    Object.assign(state.value.games[gamedata.index], gamedata.edtGame);
}

function deleteGameByIndex(index) {
    state.value.games.splice(index,1);
}

function getGameDescFromServer() {
    axios.get('https://ehp-server.herokuapp.com/getGameDesc.php')
    .then(response => {
        state.value.games = response.data;
    } )
    .catch( error => {
        console.log(error)
    })
}

/* 
 * *********************************************************************
 * Members related
 * *********************************************************************
*/
const getMembers = computed(() => state.value.members);

function addMember(member) {
    state.value.members.push(member);
}

function deleteMember(clubnumber, index) {
    let m = state.value.members[index];
    if (clubnumber == m.clubnumber) {
        state.value.members.splice(index,1);
    }
}

function loadMembers(members) {
   state.value.members = members;
}

function loadMembersFromServer() {
    axios.get(serverURL + '/getMembers.php')
    .then(response => {
        loadMembers( response.data)
    } )
    .catch( error => {
        console.log(error)
    })
}

function getMemberByClubNumber(clubnumber) {
    return state.value.members.find( m => m.clubnumber == clubnumber );
}

function changeMember(edtMember) {
    for (let m of state.value.members) {
        if (m.clubnumber == edtMember.clubnumber) {
            Object.assign(m, edtMember);
        }
    }
}

loadMembersFromServer();
getGameDescFromServer();

export {
    getMembers,
    addMember,
    deleteMember,
    loadMembers,
    getMemberByClubNumber,
    changeMember,

    getGames,
    addGame,
    changeGame,
    deleteGameByIndex,

}