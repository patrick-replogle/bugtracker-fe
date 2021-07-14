import { axiosWithAuth } from "../util/axiosWithAuth";

export const state = () => ({
    user: null,
    isEditing: false,
    isLoading: false
});

export const mutations = {
    startRequest: (state) => {
        state.isLoading = true;
    },
    endRequest: (state) => {
        state.isLoading = false;
    },
    requestSuccess: (state, payload) => {
        state.user = payload;
        state.isEditing = false;
        state.isLoading = false;
    },
    addProject: (state, payload) => {
        state.user = {
            ...state.user,
            allProjects: [...state.user.allProjects, payload]
        };
    }
};

export const actions = {
    async getInitialUserData({ state, commit}) {
        if (state.user) return;

        commit('startRequest');

        try {
            const response = await axiosWithAuth().get(this.$config.baseURL + '/users/user/token')
            commit('endRequest');
            commit('requestSuccess', response.data);
        
        } catch(err) {
            console.log(err);
            commit('endRequest');
            this.$router.push('/login');
        }
    },
    async createProject({state, commit }, payload) {
        if (state.user) return;

        commit('startRequest');
  
        try {
        const response = axiosWithAuth().post(this.$config.baseURL + '/projects/project', payload)
        commit('addPorject', response.data)
        commit('endRequest');
        this.$router.push('/projects');
        
        } catch(err) {
            console.log(err);
            commit('endRequest');
            this.$router.push('/projects');
        }
      }
};
  