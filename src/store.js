import { ref, computed } from "vue";
import axios from 'axios'

const state = ref({
    members: [],
    games: [
        {gamedate: "2021-01-07", gamedesc: "Blind Draw BB of Partners", teamevent: "Y"},
        {gamedate: "2021-01-14", gamedesc: "Beat the Pro", teamevent: "N"},
        {gamedate: "2021-01-21", gamedesc: "2 Person Scramble; A+D; B+C Flighted (9 Hole Inv)", teamevent: "Y"},
        {gamedate: "2021-01-28", gamedesc: "18 Hole Invitational", teamevent: "N"}
    ]
})

const getMembers = computed(() => state.value.members);
const getGames = computed(() => state.value.games);

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

function getMemberByCN(cn) {
    return state.value.members.find( m => m.clubnumber == cn );
}

function changeMember(edtMember) {
    for (let m of state.value.members) {
        if (m.clubnumber == edtMember.clubnumber) {
            Object.assign(m, edtMember);
        }
    }
}

function loadMembersFromServer() {
    // axios.get('http://127.0.0.1/test.php')
    axios.get('https://stclb-server.herokuapp.com/test.php')
    .then(response => {
        loadMembers( response.data)
    } )
    .catch( error => {
        console.log(error)
    })
}

function addGame(game) {
    state.value.games.push(game);
}

function getGame(gamedate) {
    return state.value.games.find( g => g.gamedate == gamedate );
}

function changeGame(gamedata) {
    Object.assign(state.value.games[gamedata.index], gamedata.edtGame);
}

function deleteGameByIndex(index) {
    state.value.games.splice(index,1);
}

loadMembersFromServer();

export {
    getMembers,
    addMember,
    deleteMember,
    loadMembers,
    getMemberByCN,
    changeMember,
    loadMembersFromServer,

    getGame,
    getGames,
    addGame,
    changeGame,
    deleteGameByIndex,

}