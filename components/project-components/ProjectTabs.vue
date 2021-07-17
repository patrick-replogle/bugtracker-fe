<template>
  <b-tabs content-class="mt-3" class="tabs">
    <b-tab title="Tickets" class="tab">
      <b-list-group-item
        class="ticket"
        v-for="ticket in project.tickets"
        :key="ticket.ticketid"
      >
        <div>
          <p>
            {{ticket.title.length <= 110 ? ticket.title : ticket.title.slice(0, 110) + '...'}}
          </p>
          <p style="font-weight: bold;">
            {{map[ticket.priority]}} Priority
            <svg
              v-if="ticket.completed"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              focusable="false"
              width="2em"
              height="2em"
              style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 12 12"
            >
              <g fill="none">
                <path
                  d="M1 6a5 5 0 1 1 10 0A5 5 0 0 1 1 6zm7.354-.896a.5.5 0 1 0-.708-.708L5.5 6.543L4.354 5.396a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l2.5-2.5z"
                  fill="#28a745"
                />
              </g>
            </svg>
          </p>
          <p style="font-size: 1.2rem;">
            Created by
            {{ticket.ticketOwner.firstname.slice(0, 1).toUpperCase()}}.
            {{ticket.ticketOwner.lastname}} on
            {{generateDateString(ticket.createddate)}}
          </p>
        </div>

        <div>
          <b-button
            variant="success"
            v-if="ticket.priority ==='LOW'"
            @click="routeToTicket(ticket.ticketid)"
            >View Details</b-button
          >
          <b-button
            variant="warning"
            v-else-if="ticket.priority ==='MEDIUM'"
            @click="routeToTicket(ticket.ticketid)"
            >View Details</b-button
          >
          <b-button
            variant="danger"
            v-else
            @click="routeToTicket(ticket.ticketid)"
            >View Details</b-button
          >
        </div>
      </b-list-group-item>
    </b-tab>

    <b-tab title="Users" class="tab" v-if="user">
      <b-list-group>
        <b-list-group-item
          class="user"
          v-for="u in project.users"
          :key="u.userid"
        >
          <div style="display: flex; align-items: center;">
            <b-avatar class="mr-3"></b-avatar>
            <div style="display: flex; flex-direction: column;">
              <span>{{u.firstname}} {{u.lastname}}</span>
              <span style="font-size: 1.4rem;">{{u.email}}</span>
            </div>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            focusable="false"
            width="1em"
            height="1em"
            style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            class="icon"
            v-if="user.userid !== u.userid && user.userid === project.projectOwner.userid"
            variant="danger"
            @click="removeUser(u)"
          >
            <g fill="none">
              <path
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2zm-4.25 9.25a.75.75 0 0 0-.102 1.493l.102.007h8.5a.75.75 0 0 0 .102-1.493l-.102-.007h-8.5z"
                fill="#dc3545"
              />
            </g>
          </svg>
        </b-list-group-item>
      </b-list-group>
    </b-tab>
  </b-tabs>
</template>

<script>
import { generateDateString } from '../../util/functions';
import { axiosWithAuth } from '../../util/axiosWithAuth.js';

export default {
    props: ['project', 'removeUserFromProject'],
    data() {
      return {
        map: { 'LOW': 'Low', 'MEDIUM': 'Medium', 'HIGH': 'High'},
        generateDateString,
      }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        textDecoration(ticket) {
          if (ticket.completed) {
            return {
              'text-decoration': 'line-through'
            };
          } else {
            return {
              'text-decoration': 'none'
            };
          }
        }
    },
    methods: {
        routeToTicket(id) {
          this.$router.push({
                name: 'ticket-id',
                params: {
                    id
                }
            })
        },
        progress(ticket) {
          if (ticket.completed) {
            return 'Completed';
          } else if (!ticket.completed && !ticket.assignedUser) {
            return 'Not started';
          } else {
            return 'In progress';
          }
        },
       async removeUser(user) {
            try {
                await axiosWithAuth().delete(this.$config.baseURL + `/users/user/${user.userid}/project/${this.project.projectid}`);
                if (this.user.userid === user.userid) {
                  this.$store.commit('user/removeProject', this.project.projectid);
                }
                this.removeUserFromProject(user.userid);
            } catch (err) {
                console.dir(err);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.tabs {
  font-size: 1.6rem;
  margin-top: 1.5%;

  .tab {
    .ticket {
      display: flex;
      justify-content: space-between;
      border: 1px solid rgba(0, 0, 0, 0.125);
      margin: 1% 0;
      border-radius: 6px;

      @media (max-width: 600px) {
        flex-direction: column;
      }

      button {
        font-size: 1.4rem;
        margin-top: 30%;

        @media (max-width: 600px) {
          margin-top: 0;
        }
      }
    }

    .user {
      display: flex;
      justify-content: space-between;
      border: 1px solid rgba(0, 0, 0, 0.125);
      margin: 1% 0;
      border-radius: 6px;

      .icon {
        font-size: 4rem;
        cursor: pointer;
        @media (max-width: 600px) {
          font-size: 3rem;
          margin-top: 3%;
        }

        &:hover {
          filter: brightness(0.5);
        }
      }
    }
  }
}
</style>
