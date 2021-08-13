<template>
  <div>
    <div v-if="isLoading">
      <LoadingSpinner />
    </div>
    <div v-else-if="!isLoading && !ticket">
      <NotFound />
    </div>
    <div v-else class="container">
      <TicketDetails
        :ticket="ticket"
        :toggleEditModal="toggleEditModal"
        :toggleCommentModal="toggleCommentModal"
        :setTicket="setTicket"
        :toggleDeleteTicketModal="toggleDeleteTicketModal"
        :toggleAssignUserModal="toggleAssignUserModal"
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

      <b-modal ref="delete-modal" hide-footer hide-header class="deleteModal">
        <DeleteModalContent
          :deleteTicket="deleteTicket"
          :ticket="ticket"
          :toggleDeleteTicketModal="toggleDeleteTicketModal"
          :isLoading="isLoading"
        />
      </b-modal>

      <b-modal
        ref="assign-user-modal"
        hide-footer
        hide-header
        class="assign-user-modal"
      >
        <AssignUser
          :assignUser="assignUser"
          :ticket="ticket"
          :toggleAssignUserModal="toggleAssignUserModal"
          :unassignUser="unassignUser"
        />
      </b-modal>

      <TicketComments
        :ticket="ticket"
        :toggleCommentEdit="toggleCommentEdit"
        :deleteComment="deleteComment"
      />
    </div>
  </div>
</template>

<script>
import { axiosWithAuth } from "../../util/axiosWithAuth.js";
import {
  generateDateString,
  checkErrorStatus,
  generateMinimumUserFields
} from "../../util/functions";
import TicketDetails from "../../components/ticket-components/TicketDetails.vue";
import EditTicketForm from "../../components/ticket-components/EditTicketForm.vue";
import AddCommentForm from "../../components/ticket-components/AddCommentForm.vue";
import TicketComments from "../../components/ticket-components/TicketComments.vue";
import AssignUser from "../../components/ticket-components/AssignUser.vue";
import DeleteModalContent from "../../components/ticket-components/DeleteModalContent.vue";
import LoadingSpinner from '../../components/other/LoadingSpinner.vue';
import NotFound from '../../components/other/NotFound.vue';

export default {
  middleware: "auth",
  components: {
    TicketDetails,
    EditTicketForm,
    AddCommentForm,
    TicketComments,
    AssignUser,
    DeleteModalContent,
    LoadingSpinner,
    NotFound
  },

  data() {
    return {
      ticket: null,
      isLoading: false,
      showModal: false,
      commentToEdit: null,
      isEditing: false,
      generateDateString
    };
  },
  async created() {
    this.isLoading = true;
    axiosWithAuth()
      .get(this.$config.baseURL + "/tickets/ticket/" + this.$route.params.id)
      .then((res) => {
        this.isLoading = false;
        this.ticket = res.data;
        this.ticket.comments.sort((a, b) => a.createddate - b.createddate);
      })
      .catch((err) => {
        console.dir(err);
        this.isLoading = false;
        checkErrorStatus(err, this.$router);
      });
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },
  methods: {
    toggleEditModal() {
      this.$refs["edit-modal"].toggle("#edit-modal");
    },
    toggleCommentModal() {
      this.$refs["comment-modal"].toggle("#comment-modal");
    },
    toggleDeleteTicketModal() {
      this.$refs["delete-modal"].toggle("#delete-modal");
    },
    toggleAssignUserModal() {
      this.$refs["assign-user-modal"].toggle("#assign-user-modal");
    },
    setTicket(changes) {
      this.ticket = {
        ...this.ticket,
        ...changes
      };
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
      this.ticket.comments = this.ticket.comments.map((c) => {
        if (c.commentid === comment.commentid) {
          return comment;
        }
        return c;
      });
    },
    async deleteComment(id) {
      try {
        this.isLoading = true;
        await axiosWithAuth().delete(
          this.$config.baseURL + "/comments/comment/" + id
        );
        this.isLoading = false;
        this.ticket.comments = this.ticket.comments.filter(
          (c) => c.commentid !== id
        );
      } catch (err) {
        console.dir(err);
        this.isLoading = false;
        checkErrorStatus(err, this.$router);
      }
    },
    async deleteTicket(id) {
      try {
        this.isLoading = true;
        await axiosWithAuth().delete(
          this.$config.baseURL + "/tickets/ticket/" + id
        );
        this.isLoading = false;
        this.$store.commit("user/deleteTicket", id);
        this.$router.push("/project/" + this.ticket.project.projectid);
      } catch (err) {
        console.dir(err);
        this.isLoading = false;
        checkErrorStatus(err, this.$router);
      }
    },
    async assignUser(u) {
      const assignedUser = { assignedUser: generateMinimumUserFields(u) };
      try {
        const res = await axiosWithAuth().patch(
          this.$config.baseURL + "/tickets/ticket/" + this.$route.params.id,
          assignedUser
        );
        if (u.userid === this.user.userid) {
          this.$store.commit("user/addTicket", res.data);
        }
        this.setTicket(assignedUser);
      } catch (err) {
        console.dir(err);
        checkErrorStatus(err, this.$router);
      }
    },
    async unassignUser(u) {
      try {
        await axiosWithAuth().patch(
          this.$config.baseURL + "/tickets/ticket/" + this.$route.params.id,
          this.ticket
        );
        this.setTicket({ assignedUser: null });
        if (u.userid === this.user.userid) {
          this.$store.commit("user/deleteTicket", this.ticket.ticketid);
        }
      } catch (err) {
        console.dir(err);
        checkErrorStatus(err, this.$router);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 3%;
}
</style>
