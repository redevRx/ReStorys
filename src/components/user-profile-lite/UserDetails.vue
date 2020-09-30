<template>
  <d-card class="card-small mb-4 pt-3">

    <!-- Card Header -->
    <d-card-header class="border-bottom text-center">

      <!-- User Avatar -->
      <div class="mb-3 mx-auto">
          <img class="rounded-circle" :src="loadImage" alt="Image Profile" width="110" >
      </div>

      <!-- User Name -->
      <h4 class="mb-0">{{ this.$store.getters["userInfo/getUserInfo"].userName }}</h4>

      <!-- User Job Title -->
      <span class="text-muted d-block mb-2">{{ this.$store.getters["userInfo/getUserInfo"].nickName}}</span>

      <!-- User Follow -->
      <d-button   pill outline size="sm" class="mb-2"> <i class="material-icons mr-1">person_add</i> Follow</d-button>

    </d-card-header>

    <d-list-group flush>

      <!-- User Performance Report -->
      <d-list-group-item class="px-4">
        <div class="progress-wrapper">
          <strong class="text-muted d-block mb-2">{{ userDetails.performanceReportTitle }}</strong>
          <d-progress class="progress-sm">
            <span class="progress-value">{{ userDetails.performanceReportValue }}%</span>
            <d-progress-bar :max="100" :value="userDetails.performanceReportValue" />
          </d-progress>
        </div>
      </d-list-group-item>

      <!-- User Meta -->
      <d-list-group-item>
        <strong class="text-muted d-block mb-2">{{ userDetails.metaTitle }}</strong>
        <span>{{this.$store.getters["userInfo/getUserInfo"].description }}</span>
      </d-list-group-item>
    </d-list-group>

  </d-card>
</template>

<script>
const defaultUserDetails = {
  name: 'Sierra Brooks',
  avatar: require('@/assets/images/avatars/0.jpg'),
  jobTitle: 'Project Manager',
  performanceReportTitle: 'Workload',
  performanceReportValue: 74,
  metaTitle: 'Description',
  metaValue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?',
};

export default {
  name: 'user-details',
  data() {
    return {
      // imageUrl: ''
    }
  },
  props: {
    /**
       * The user details.
       */
    userDetails: {
      type: Object,
      default() {
        return defaultUserDetails;
      },
    },
  },
  computed: {
     loadImage()
    {
      if(this.$store.getters["userInfo/getUserInfo"].image != undefined 
      &&  this.$store.getters["userInfo/getUserInfo"].image != '')
      {
        this.imageUrl= this.$store.getters["userInfo/getUserInfo"].image

        return this.imageUrl
      }
      else
      {
        this.imageUrl =   'https://cdn.iconscout.com/icon/free/png-512/user-employee-avatar-man-person-businessman-11-16779.png'
        return this.imageUrl
      }
    } 
  },
};
</script>
