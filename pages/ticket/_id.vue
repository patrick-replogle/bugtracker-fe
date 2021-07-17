<template>
  <div v-if="ticket" class="container">
    <TicketDetails
      :ticket="ticket"
      :toggleEditModal="toggleEditModal"
      :toggleCommentModal="toggleCommentModal"
      :setTicket="setTicket"
      :toggleDeleteTicketModal="toggleDeleteTicketModal"
    />

    <b-modal ref="edit-modal" title="Edit Ticket" hide-footer>
      <EditTicketForm
        :toggleEditModal="toggleEditModal"
        :ticket="ticket"
        :setTicket="setTicket"
      />
    </b-modal>

    <b-modal ref="comment-modal" title="Add Comment" hide-footer>
      <AddCommentForm
        :toggleCommentModal="toggleCommentModal"
        :ticket="ticket"
        :addComment="addComment"
        :cancelEdit="cancelEdit"
        :isEditing="isEditing"
        :commentToEdit="commentToEdit"
        :updateComments="updateComments"
      />
    </b-modal>

    <b-modal ref="delete-modal" hide-footer class="deleteModal">
      <p>Are you sure?</p>
      <b-button variant="outline-primary" @click="deleteTicket(ticket.ticketid)"
        >Delete
      </b-button>
      <b-button variant="outline-primary" @click="toggleDeleteTicketModal"
        >Close
      </b-button>
    </b-modal>

    <TicketComments
      :ticket="ticket"
      :toggleCommentEdit="toggleCommentEdit"
      :deleteComment="deleteComment"
    />
  </div>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth.js';
import { generateDateString, checkErrorStatus } from '../../util/functions';
import TicketDetails from '../../components/ticket-components/TicketDetails.vue';
import EditTicketForm from '../../components/ticket-components/EditTicketForm.vue';
import AddCommentForm from '../../components/ticket-components/AddCommentForm.vue';
import TicketComments from '../../components/ticket-components/TicketComments.vue';

export default {
    middleware: "auth",
    components: {
        TicketDetails,
        EditTicketForm,
        AddCommentForm,
        TicketComments,
    },

    data() {
        return {
            ticket: null,
            isLoading: false,
            showModal: false,
            commentToEdit: null,
            isEditing: false,
            generateDateString
        }
    },
    created() {
        axiosWithAuth().get(this.$config.baseURL + '/tickets/ticket/' + this.$route.params.id)
            .then(res =>{
              this.ticket = res.data;
            })
            .catch(err => {
                console.dir(err)
                checkErrorStatus(err, this.$router);
            })
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
    },
    methods: {
        toggleEditModal() {
            this.$refs['edit-modal'].toggle('#edit-modal');
        },
        toggleCommentModal() {
            this.$refs['comment-modal'].toggle('#comment-modal');
        },
        toggleDeleteTicketModal() {
            this.$refs['delete-modal'].toggle('#delete-modal');
        },
        setTicket(changes) {
            this.ticket = {
                ...this.ticket,
                ...changes
            }
        },
        addComment(comment) {
            this.ticket.comments.push(comment);
        },
        toggleCommentEdit(comment) {
            this.commentToEdit = comment;
            this.isEditing = true;
            this.toggleCommentModal();
        },
        cancelEdit() {
            this.commentToEdit = null;
            this.isEditing = false;
        },
        updateComments(comment) {
            this.ticket.comments = this.ticket.comments.map(c => {
                if (c.commentid === comment.commentid) {
                    return comment;
                }
                return c;
            })
        },
        async deleteComment(id) {
            try {
                await axiosWithAuth().delete(this.$config.baseURL + '/comments/comment/' + id);
                this.ticket.comments = this.ticket.comments.filter(c => c.commentid !== id);
            } catch (err) {
                console.dir(err)
                checkErrorStatus(err, this.$router);
            }
        },
        async deleteTicket(id) {
            try {
                await axiosWithAuth().delete(this.$config.baseURL + '/tickets/ticket/' + id);
                this.$router.push('/project/' + this.ticket.project.projectid);
                this.$store.commit('user/deleteTicket', id);
            } catch (err) {
                console.dir(err);
                checkErrorStatus(err, this.$router);
            }
        },
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 3%;
}

p {
  font-size: 1.6rem;
}

button {
  font-size: 1.6rem;
  margin-right: 1%;
}
</style>
