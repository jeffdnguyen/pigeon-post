<template>
  <div class="post">
    <div class="profile-pic">
      <div class="img"></div>
    </div>
    <div class="content">
      <div class="header">
        <div class="name">
          <p>@{{ post.userName | trimNameLength }}</p>
        </div>
        <div class="time">
          <p>{{ post.createdOn | formatDate }}</p>
        </div>
      </div>
      <div class="body">
        <p>{{ post.content }}</p>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimNameLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 20)}...`;
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  padding: 0pt;
  margin: 0pt;

  // background-color: blue;
  border-top: solid 1pt #cccccc;
  border-right: solid 1pt #cccccc;

  width: 70vw;

  display: flex;
  justify-content: flex-start;

  .profile-pic {
    // background-color: white;
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

  .content {
    // background-color: #cccccc;
    width: 60vw;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .header {
      // background-color: skyblue;
      height: 20pt;

      margin: 2pt;

      font-weight: bold;

      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        margin: 0;
        padding: 0;
      }
    }
    .body {
      // background-color: aquamarine;
      height: 100pt;
      margin: 2pt;

      p {
        margin: 0;
        padding: 0;
      }
    }
    .footer {
      // background-color: lightsteelblue;
      height: 20pt;
      margin: 5pt;
    }
  }
}
/* Media query: Mobile devices (Using iPhone X as the standard) */
@media only screen and (max-device-width: 812px) {
  .post {
    width: 95vw;
    padding: 0pt 20pt;

    .profile-pic {
      .img {
        width: 25pt;
        height: 25pt;
        border-radius: 25pt;
      }
    }

    .content {
      width: 90vw;
    }
  }
}
</style>
