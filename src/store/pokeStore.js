import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const pokeStore = new Vuex.Store({
    state: {
        sets: [],
        setsReady: false,
        cardsReady: true,
    },
    getters: {
        // setsLength: state => {
        //     let setCount = state.sets.length;
        //     console.log(setCount);
        //     return setCount;
        // }
        setIndex: (state) => (data) => {
            let setData = state.sets.findIndex(set => set.code === data)
            return state.sets[setData];
        }
    },
    mutations: {
        setSets: (state, data) => {
            state.sets = data;
            console.log(data);
            state.setsReady = true;
        },
        toggleCardsReady: (state) => {
            state.cardsReady = !state.cardsReady
        }
    },
    actions: {
        getSets: ({ commit }) => {
            axios.get("https://api.pokemontcg.io/v1/sets").then(response => {
                commit("setSets", response.data.sets.reverse());
            }).catch(function (error) {
                // handle error
                console.log(error);
            });
        },
        getCards: ({ commit }, { setID }) => {
            axios.get("https://api.pokemontcg.io/v1/cards?setCode=" + setID + "&pageSize=1000").then(response => {
                commit("setCards", [setID, response.data.cards]);
            }).catch(function (error) {
                // handle error
                console.log(error);
            });
        },
    }
});