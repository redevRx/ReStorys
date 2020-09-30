<template>
  <d-container fluid>
    <d-row class="mb-4 mt-4">
      <d-col class="ml-4 mr-4 mb-4">
        <!-- make card login  -->
        <center>
          <d-card class="card-small mb-4">
            <d-card-header class="border-bottom">
              <center><h6 class="m-0">Sign In</h6></center>
            </d-card-header>
            <d-list-group flush>
              <d-list-group-item class="p-3">
                <d-row>
                  <!-- make form email  -->
                  <d-col>
                    <d-form validated>
                      <!-- make input get email  -->
                      <div class="form-group mt-4">
                        <label for="feEmailAddress">Email</label>
                        <d-input
                          v-model="txtEmail"
                          id="feEmailAddress"
                          type="email"
                          placeholder="Email"
                        />
                        <d-form-invalid-feedback
                          >Please Inter Email.</d-form-invalid-feedback
                        >
                      </div>

                      <!-- make input get address  -->
                      <div class="form-group mb-4 mb-4">
                        <d-input-group seamless class="mb-3">
                          <d-input
                            v-model="txtPassword"
                            id="fePassword"
                            type="password"
                          />
                          <d-form-invalid-feedback
                            >Please Inter Password.</d-form-invalid-feedback
                          >
                          <d-input-group-text slot="append">
                            <!-- <i class="material-icons">lock</i> -->
                          </d-input-group-text>
                        </d-input-group>
                      </div>
                      <!-- make form get contac -->
                      <d-form-row>
                        <d-col md="12" class="form-group mt-4">
                          <d-checkbox required
                            >I agree with your
                            <a href="#">Privacy Policy</a>.</d-checkbox
                          >
                        </d-col>
                      </d-form-row>
                      <d-form-row>
                        <d-col class="form-group md-4 mt-2">
                          <d-button
                            class="btn-outline-royal-blue"
                            type="button"
                            @click="onLogin"
                            >Login Now</d-button
                          >
                        </d-col>
                      </d-form-row>
                    </d-form>
                    <router-link to="/user-sign-up-page" theme="success">
                      <d-button
                        type="button"
                        outline
                        theme="success"
                        class="mb-2  mr-1 "
                        >Create new Account</d-button
                      ></router-link
                    >
                  </d-col>
                </d-row>
              </d-list-group-item>
            </d-list-group>
          </d-card>
        </center>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
// import firebase from 'firebase/app';
export default {
  data() {
    return {
      txtEmail: "",
      txtPassword: ""
    };
  },
  methods: {
    //clear input
    clearInput() {
      (txtEmail = ""), (txtPassword = "");
    },
    //set input change event
    setInputEventChange() {
      this.$store.dispatch("login/onChangeEmail", this.txtEmail);
      this.$store.dispatch("login/onChangePass", this.txtPassword);
    },
    onLogin() {
      //
      this.setInputEventChange();
      //
      var user = {
        email: this.$store.getters["login/getEmail"],
        password: this.$store.getters["login/getPassword"]
      };
      //call vuex login
      this.$store
        .dispatch("login/onLogin", user)
        .then(result => {
          this.$store.dispatch("currentUser/onUserChange", result + "");
          this.$toast.success("Login Successfully..");

          /*
          user login success making load user info show in compoment
           */
          this.$store.dispatch('userInfo/onLoadUserInfo',result).then((it) => {
            this.$store.dispatch('userInfo/onChageUserinfo',it)
            console.log('load user info success'+it)
          }).catch((err) => {
             console.log('load user info faield :'+err)
          });

          //
          this.$router.push("/blog-overview");
        })
        .catch(err => {
          this.$toast.error(err);
        });

      this.clearInput();
    }
  }
};
</script>

<style scoped>
.card-small {
  max-width: 320px;
}
</style>
