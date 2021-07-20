<template>
  <div>
    <div
      v-for="comment in ticket.comments"
      class="comment"
      :key="comment.commentid"
    >
      <p
        style="font-size: 1.4rem; font-weight: bold; cursor: pointer"
        @click="routeToUser(comment.commentOwner.userid)"
      >
        <img
          v-if="comment.commentOwner.imageurl"
          :src="comment.commentOwner.imageurl"
          alt="uploaded project avatar"
          class="avatar"
        />
        <b-avatar v-else class="avatar"></b-avatar>

        {{ comment.commentOwner.firstname }}
        {{ comment.commentOwner.lastname }}
      </p>
      <p style="font-size: 1.6rem">{{ comment.comment }}</p>
      <p style="font-size: 1.2rem">
        {{ generateDateString(ticket.createddate) }}
      </p>
      <div
        class="btnContainer"
        v-if="user && comment.commentOwner.userid === user.userid"
      >
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
  </div>
</template>

<script>
import { generateDateString } from "../../util/functions";

export default {
  props: ["ticket", "toggleCommentEdit", "deleteComment"],
  data() {
    return {
      generateDateString
    };
  },
  methods: {
    routeToUser(id) {
      this.$router.push(`/user/${id}`);
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin: 0.5% 0;
  border-radius: 6px;
  font-size: 1.6rem;

  .avatar {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
  }

  .btnContainer {
    button {
      font-size: 1rem;
    }
  }
}
</style>
