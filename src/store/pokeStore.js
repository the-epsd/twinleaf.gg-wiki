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
    }
});