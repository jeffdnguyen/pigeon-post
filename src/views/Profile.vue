<template>
  <div class="profile">
    <div class="profile-card">
      <div class="header"></div>
      <div class="profile-pic">
        <div class="img"></div>
      </div>
      <div class="profile-content">
        <div class="username">
          <p>@{{ userProfile.name }}</p>
        </div>
        <div class="bio">
          <p>{{ userProfile.bio }}</p>
        </div>
        <div class="metadata">
          <div class="createdOn">
            <p>Joined {{ userProfile.createdOn | formatDate }}</p>
          </div>
        </div>
        <div class="follow-container">
          <div class="following">
            <p>
              <span>{{ userProfile.following }}</span> Following
            </p>
          </div>
          <div class="followers">
            <p>
              <span>{{ userProfile.followers }}</span> Followers
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filteredPostsByProfile.length">
      <div class="feed">
        <Post v-for="post in filteredPostsByProfile" :key="post.id" :post="post" class="post"></Post>
      </div>
    </div>
    <div v-else>
      <p class="no-results">There are currently no posts</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Post from "@/components/Post.vue";

import moment from "moment";

export default {
  data() {
    return {};
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(["userProfile", "currentUser", "posts", "hiddenPosts"]),
    filteredPostsByProfile() {
      this.$store.dispatch("fetchUserProfile", this.profileId);
      return this.posts.filter(post => post.userId === this.userProfile.id);
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val.toDate();
      return moment(date).format("MMMM YYYY");
    }
  },
  components: {
    Post
  }
};
</script>

<style lang="scss" scoped>
.profile {
  margin: 0;
  margin-left: 150pt;
  padding: 0;

  width: 70vw;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  border-left: solid 1pt #ccc;
  border-right: solid 1pt #ccc;
  .profile-card {
    width: 100%;
    .header {
      margin: 0pt;
      padding: 0pt;

      height: 150pt;

      background-color: rgba(224, 89, 10, 0.822);
    }
    .profile-pic {
      position: absolute;
      top: 100pt;
      .img {
        margin-left: 10pt;

        background-image: url("../assets/orange_pigeon.png");
        background-color: rgb(235, 208, 88);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        border: 2pt solid #f3f4f5;

        width: 100pt;
        height: 100pt;
        border-radius: 100pt;
      }
    }
    .profile-content {
      margin: 0pt;
      margin-top: 50pt;
      padding: 0pt 0pt 0pt 10pt;
      // background-color: seagreen;
      border-bottom: solid 3pt #cccccc;

      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;

      .username {
        font-weight: bold;
      }
      .bio p {
        margin: 0;
      }
      .metadata p {
        margin: 5pt 0pt 0pt 0pt;
        color: #888;
      }
      .follow-container {
        display: flex;
        span {
          font-weight: bold;
        }
        .following {
          margin-right: 15pt;
        }
      }
    }
  }
}
/* Media query: Mobile devices (Using iPhone X as the standard) */
@media only screen and (max-device-width: 812px) {
  .profile {
    margin-left: 0pt;
    width: 100vw;

    align-items: center;

    .profile-card {
      .profile-pic {
        top: 150pt;
      }
    }
  }
}
</style>
