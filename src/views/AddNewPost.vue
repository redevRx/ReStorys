<template>
  <d-container fluid class="main-content-container px-4 pb-4">
    <!-- Page Header -->
    <d-row no-gutters class="page-header py-4">
      <!-- Page Title -->
      <d-col col sm="4" class="text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Blog Posts</span>
        <h3 class="page-title">Add New Post</h3>
      </d-col>
    </d-row>

    <d-row>
      <!-- Editor -->
      <d-col lg="9" md="12">
        <anp-editor />
      </d-col>

      <!-- Sidebar Widgets -->
      <d-col lg="3" md="12">
        <anp-sidebar-actions />
        <anp-sidebar-categories />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import SidebarActions from "@/components/add-new-post/SidebarActions.vue";
import SidebarCategories from "@/components/add-new-post/SidebarCategories.vue";
import Editor from "@/components/add-new-post/Editor.vue";

import "quill/dist/quill.snow.css";
import fireabse from 'firebase'
export default {
  components: {
    anpEditor: Editor,
    anpSidebarActions: SidebarActions,
    anpSidebarCategories: SidebarCategories,
  },
  computed() {},
  beforeCreate() {
    ////
    // this.$store
    //   .dispatch("currentUser/onCheckUserLogin")
    //   .then((uid) => {
    //     // alert(it)
    //     // this.$store.dispatch('currentUser/onUserChange', uid)
    //     if (
    //       this.$store.getters["currentUser/getCurrentUser"] == ""
    //     ) {
    //       //user not login
    //       this.$router.push("/user-sign-in-page");
    //     } else {
    //       //user login
    //       this.$router.push("/add-new-post");
    //     }
    //   })
    //   .catch((err) => {
    //     // alert(err)
    //     this.$router.push("/user-sign-in-page");
    //   });

    ///
    fireabse.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push("/user-sign-in-page");
        console.log("user not login  :" );
      } else {
        // store.dispatch("currentUser/onUserChange", user.uid)
       this.$router.push("/add-new-post");
        console.log("user login " );
      }
    });
  },
  mounted() {},
};
</script>
