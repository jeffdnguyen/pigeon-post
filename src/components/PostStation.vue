<template>
  <div class="post-station">
    <div class="profile-pic">
      <div class="img"></div>
    </div>
    <form @submit.prevent>
      <div class="post">
        <div class="content">
          <ResizeableTextArea>
            <textarea
              placeholder="Whats happening?"
              rows="5"
              id="post-content"
              v-model.trim="post.content"
            ></textarea>
          </ResizeableTextArea>
        </div>
        <div class="toolbar">
          <div class="options">
            <!-- <div class="option"></div>
            <div class="option"></div>
            <div class="option"></div>
            <div class="option"></div>-->
          </div>
          <button @click="createPost" :disabled="post.content == ''" class="button">Post</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import ResizeableTextArea from "@/components/ResizeableTextArea.vue";

const fb = require("../firebaseConfig.js");

export default {
  data() {
    return {
      post: {
        content: ""
      }
    };
  },
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    userProfile: {
      type: Object,
      required: true
    }
  },
  components: {
    ResizeableTextArea
  },
  methods: {
    createPost() {
      fb.postsCollections
        .add({
          createdOn: new Date(),
          content: this.post.content,
          userId: this.currentUser.uid,
          userName: this.userProfile.name,
          comments: 0,
          likes: 0
        })
        .then(ref => {
          this.post.content = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.post-station {
  padding: 0pt 0pt;
  margin: 0pt;
  width: 70vw;

  border-bottom: solid 3pt #ccc;
  border-right: solid 1pt #cccccc;
  // background-color: darkgreen;

  display: flex;
  justify-content: flex-start;
}

.profile-pic {
  background-color: #eee;
  width: 10vw;
  .img {
    margin: 10pt auto;

    background-image: url("../assets/orange_pigeon.png");
    background-color: rgb(235, 208, 88);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    width: 50pt;
    height: 50pt;
    border-radius: 50pt;
  }
}

.post {
  background-color: #eeeeee;
  height: 100%;
  width: 60vw;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .content {
    // background-color: olive;
    margin: 2pt;

    textarea {
      box-sizing: border-box;
      resize: none;
      outline: none;
      width: 100%;

      padding-top: 15pt;
      padding-left: 10pt;

      background-color: #eee;
      font-size: 14pt;

      border: none;
      border-color: #ccc;
      border-width: 1pt;
    }
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2pt;

    // background-color: mediumseagreen;

    .options {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 5pt;

      // background-color: greenyellow;
      .option {
        margin: 10pt;

        // background-color: forestgreen;

        height: 15pt;
        width: 15pt;
        border-radius: 15pt;
      }
    }

    button {
      margin: 10pt;
      height: 20pt;
      width: 50pt;

      border: none;
      border-radius: 20px;

      color: white;
      background-color: #ff6600;
      font-weight: bold;
    }
  }
}

/* Media query: Mobile devices (Using iPhone X as the standard) */
@media only screen and (max-device-width: 812px) {
  .post-station {
    width: 100vw;
  }

  .profile-pic {
    .img {
      width: 25pt;
      height: 25pt;
      border-radius: 25pt;
    }
  }

  .post {
    width: 90vw;
  }
}
</style>
