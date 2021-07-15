<template>
  <div>
    <div
      v-for="comment in ticket.comments"
      class="comment"
      :key="comment.commentid"
    >
      <p style="font-size: 1.4rem; font-weight: bold;">
        <b-avatar class="mr-3"></b-avatar>
        {{comment.commentOwner.firstname}}
        {{comment.commentOwner.lastname}}
      </p>
      <p style="font-size: 1.6rem;">{{comment.comment}}</p>
      <p style="font-size: 1.2rem;">
        Last updated {{generateDateString(ticket.lastmodifieddate)}}
      </p>
      <div class="btnContainer">
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
import { generateDateString } from '../util/functions';

export default {
    props: ['ticket', 'toggleCommentEdit', 'deleteComment'],
    data() {
        return {
            generateDateString
        }
    }
}
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

  .btnContainer {
    button {
      font-size: 1rem;
    }
  }
}
</style>
