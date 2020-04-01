<template>
  <div id="dashboard">
    <PostStation
      :userProfile="userProfile"
      :currentUser="currentUser"
    ></PostStation>
    <div v-if="posts.length">
      <div class="feed">
        <Post
          v-for="post in posts"
          :key="post.id"
          :post="post"
          class="post"
        ></Post>
      </div>
    </div>
    <div v-else>
      <p class="no-results">There are currently no posts</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostStation from "@/components/PostStation.vue";
import Post from "@/components/Post.vue";

const fb = require("../firebaseConfig.js");
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userProfile", "currentUser", "posts", "hiddenPosts"])
  },
  components: {
    PostStation,
    Post
  }
};
</script>

<style lang="scss">
#dashboard {
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  border-left: solid 1pt #ccc;
}
</style>
