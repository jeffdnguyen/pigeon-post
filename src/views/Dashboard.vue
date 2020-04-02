<template>
  <div id="dashboard">
    <PostStation :userProfile="userProfile" :currentUser="currentUser"></PostStation>
    <div v-if="filteredPostsByFollowers.length">
      <div class="feed">
        <Post v-for="post in filteredPostsByFollowers" :key="post.id" :post="post" class="post"></Post>
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
    ...mapState(["userProfile", "currentUser", "posts", "hiddenPosts"]),
    filteredPostsByFollowers() {
      this.$store.dispatch("fetchUserProfile", this.currentUser.uid);
      return this.posts;
    }
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
  margin-left: 150pt;
  padding: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  border-left: solid 1pt #ccc;
}

/* Media query: Mobile devices (Using iPhone X as the standard) */
@media only screen and (max-device-width: 812px) {
  #dashboard {
    margin-left: 0pt;
    align-items: center;
  }
}
</style>
