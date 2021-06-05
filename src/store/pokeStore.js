import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const pokeStore = new Vuex.Store({
    state: {
        sets: [],
        setsReady: false,
        cardsReady: false,
    },
    getters: {
        setIndex: (state) => (data) => {
            let setData = state.sets.findIndex(set => set.id === data)
            return state.sets[setData];
        }
    },
    mutations: {
        setSets: (state, data) => {
            state.sets = data;
            state.setsReady = true;
        },
        setCards: (state, data) => {
            let setData = state.sets.findIndex(set => set.id === data[0])
            state.sets[setData].cards = data[1];
            console.log(data[1]);
            state.cardsReady = true;
        },
        toggleCardsReady: (state) => {
            state.cardsReady = !state.cardsReady
        }
    },
    actions: {
        getSets: ({ commit }) => {
            axios.get("https://api.pokemontcg.io/v2/sets", {
                headers: {
                    'X-Api-Key': process.env.VUE_APP_API_KEY
                }
            }).then(response => {
                commit("setSets", response.data.data.reverse());
            }).catch(function (error) {
                // handle error
                console.log(error);
            });
        },
        getCards: ({ commit }, { setID }) => {
            axios.get("https://api.pokemontcg.io/v2/cards?q=set.id:" + setID + "&pageSize=1000", {
                headers: {
                    'X-Api-Key': process.env.VUE_APP_API_KEY
                }
            }).then(response => {
                commit("setCards", [setID, response.data.data]);
            }).catch(function (error) {
                // handle error
                console.log(error);
            });
        },
        toggleCardsReady: ({ commit }) => {
            commit("toggleCardsReady");
        }
    }
});