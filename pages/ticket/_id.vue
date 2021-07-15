<template>
  <div v-if="ticket">
    <TicketDetails
      :ticket="ticket"
      :toggleEditModal="toggleEditModal"
      :toggleCommentModal="toggleCommentModal"
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
    <div v-for="comment in ticket.comments">
      <p>{{comment.comment}}</p>
      <b-button variant="outline-primary" @click="toggleCommentEdit(comment)"
        >Edit
      </b-button>
      <b-button
        variant="outline-primary"
        @click="deleteComment(comment.commentid)"
        >Delete
      </b-button>
    </div>
  </div>
</template>

<script>
import { axiosWithAuth } from '../../util/axiosWithAuth.js';
import TicketDetails from '../../components/TicketDetails.vue';
import EditTicketForm from '../../components/EditTicketForm.vue';
import AddCommentForm from '../../components/AddCommentForm.vue';

export default {
    components: {
        TicketDetails,
        EditTicketForm,
        AddCommentForm
    },

    data() {
        return {
            ticket: null,
            isLoading: false,
            showModal: false,
            commentToEdit: null,
            isEditing: false
        }
    },
    created() {
        axiosWithAuth().get(this.$config.baseURL + '/tickets/ticket/' + this.$route.params.id)
            .then(res => this.ticket = res.data)
            .catch(err => console.dir(err))
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
                if (c.commentid === comment.commendid) {
                    return comment;
                }
                return comment;
            })
        },
        async deleteComment(id) {
            try {
                await axiosWithAuth().delete(this.$config.baseURL + '/comments/comment/' + id);
                this.ticket.comments = this.ticket.comments.filter(c => c.commentid !== id);
            } catch (err) {
                console.dir(err)
            }
        }
  }
}
</script>

<style lang="scss" scoped></style>
