import { axiosWithAuth } from "../util/axiosWithAuth";
import { checkErrorStatus } from '../util/functions';

export const state = () => ({
    user: null,
    isEditing: false,
    projectToEdit: null,
    isLoading: false,
    ticketToEdit: null
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
    },
    updateProject: (state, payload) => {
        state.user = {
            ...state.user,
            allProjects: state.user.allProjects.map(p => {
                if (p.projectid === payload.projectid) {
                    return payload;
                }
                return p;
            }),
            ownedProjects: state.user.ownedProjects.map(p => {
                if (p.projectid === payload.projectid) {
                    return payload;
                }
                return p;
            })
        }
    },
    removeProject: (state, payload) => {
        state.user = {
            ...state.user,
            allProjects: state.user.allProjects.filter(p => p.projectid !== payload),
            ownedProjects: state.user.ownedProjects.filter(p => p.projectid !== payload),
            assignedTickets: state.user.assignedTickets.filter(t => t.project.projectid !== payload)
        }
    },
    toggleProjectEdit: (state, payload) => {
        state.isEditing = true;
        state.projectToEdit = payload;
    },
    cancelEdit: (state) => {
        state.isEditing = false;
        state.projectToEdit = null;
    },
    toggleTicketEdit: (state, payload) => {
        state.isEditing = true;
        state.ticketToEdit = payload;
    },
    updateUser: (state, payload) => {
        state.user = payload;
    },
    addTicket: (state, payload) => {
        if (state.user.assignedTickets.find(t => t.ticketid === payload.ticketid)) {
            return;
        }
        state.user.assignedTickets.push(payload);
    },
    updateTicket: (state, payload) => {
        const ticket = state.user.assignedTickets.find(t => t.ticketid === payload.ticketid);
        Object.assign(ticket, payload);
    },
    deleteTicket: (state, payload) => {
        state.user.assignedTickets = state.user.assignedTickets.filter(t => t.ticketid !== payload);
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
            checkErrorStatus(err, this.$router);
        }
    },

    async createProject({state, commit }, payload) {
        commit('startRequest');
  
        try {
        const response = await axiosWithAuth().post(this.$config.baseURL + '/projects/project', payload);
        commit('addProject', response.data)
        commit('endRequest');
        this.$router.push('/project/' + response.data.projectid);
        
        } catch(err) {
            console.log(err);
            commit('endRequest');
            checkErrorStatus(err, this.$router);
        }
    },

    async updateProject({state, commit}, payload) {
        try {
            const response = await axiosWithAuth().patch(this.$config.baseURL + '/projects/project/' + state.projectToEdit.projectid, payload);
            commit('updateProject', response.data);
            commit('cancelEdit');
            this.$router.push('/project/' + response.data.projectid);
        } catch (err) {
            console.dir(err);
            checkErrorStatus(err, this.$router);
        }
    },

    async deleteProject({ state, commit }, id) {
        try {
            await axiosWithAuth().delete(this.$config.baseURL + '/projects/project/' + id);
            commit('removeProject', id);
            this.$router.push('/dashboard');
        } catch(err) {
            console.dir(err);
            checkErrorStatus(err, this.$router);
        }
    },

    async updateUser({state, commit}, payload) {
        try {
            const response = await axiosWithAuth().patch(this.$config.baseURL + '/users/user/' + state.user.userid, payload);
            commit('updateUser', response.data);
        } catch (err) {
            console.dir(err);
            checkErrorStatus(err, this.$router);
        }
    }
};
  