<template>
  <d-navbar-nav class="border-left flex-row">
    <li class="nav-item border-right dropdown notifications">
      <a class="nav-link nav-link-icon text-center" v-d-toggle.notifications>
        <div class="nav-link-icon__wrapper">
          <i class="material-icons">&#xE7F4;</i>

          <!-- notify item number  -->
          <d-badge pill theme="danger">2</d-badge>
        </div>
      </a>
      <d-collapse id="notifications" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item>
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE6E1;</i>
            </div>
          </div>

          <!-- content notify  -->
          <div class="notification__content">
            <span class="notification__category">Analytics</span>
            <p>
              Your website’s active users count increased by
              <span class="text-success text-semibold">28%</span> in the last
              week. Great job!
            </p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item href="#">
          <div class="notification__icon-wrapper">
            <div class="notification__icon">
              <i class="material-icons">&#xE8D1;</i>
            </div>
          </div>
          <!-- content notify  -->
          <div class="notification__content">
            <span class="notification__category">Sales</span>
            <p>
              Last week your store’s sales count decreased by
              <span class="text-danger text-semibold">5.52%</span>. It could
              have been worse!
            </p>
          </div>
        </d-dropdown-item>
        <d-dropdown-item class="notification__all text-center"
          >View all Notifications</d-dropdown-item
        >
      </d-collapse>
    </li>
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle text-nowrap px-3"
        v-d-toggle.user-actions
      >
        <!-- User image and User name  -->
        <img
          class="user-avatar rounded-circle mr-2"
          :src="loadImage"
          alt="User Avatar"
        />
        <span class="d-none d-md-inline-block">{{
          this.$store.getters["userInfo/getUserInfo"].userName
        }}</span>
      </a>
      <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
        <d-dropdown-item to="user-profile-lite"
          ><i class="material-icons">&#xE7FD;</i> Profile</d-dropdown-item
        >
        <d-dropdown-item to="user-sign-in-page"
          ><i class="material-icons">person</i> Login</d-dropdown-item
        >
        <d-dropdown-item to="user-sign-up-page"
          ><i class="material-icons">add</i> Register</d-dropdown-item
        >
        <d-dropdown-item to="blog-posts"
          ><i class="material-icons">&#xE896;</i> Story</d-dropdown-item
        >
        <d-dropdown-divider />
        <i @click="onUserLogOut"
          ><d-dropdown-item class="text-danger">
            <i class="material-icons text-danger">&#xE879;</i> Logout
          </d-dropdown-item></i
        >
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>

<script>
export default {
  computed: {
    loadImage()
    {
      if(this.$store.getters["userInfo/getUserInfo"].image != undefined 
      &&  this.$store.getters["userInfo/getUserInfo"].image != '')
      {
        return  this.$store.getters["userInfo/getUserInfo"].image
      }
      else
      {
        return  'https://cdn.iconscout.com/icon/free/png-512/user-employee-avatar-man-person-businessman-11-16779.png'
      }
    } 
  },
  methods: {
    //user login call vuex
    onUserLogOut()
    {
    this.$store.dispatch('login/onSignOut',this.$store.getters['currentUser/getCurrentUser']).then((result) => {
         //call onUserChange -> parameter .. uid
          this.$store.dispatch("currentUser/onUserChange",'')

          //set user info = null
           this.$store.dispatch('userInfo/onChageUserinfo','')
        this.$toast.success(result);
        this.$router.push("/user-sign-in-page")
      // alert(result)
    }).catch((err) => {
      // alert('err'+err)
      this.$toast.error(err);
    });
    },
  },
}
</script>
<style>
.nav-link:hover {
  cursor: pointer;
}
</style>