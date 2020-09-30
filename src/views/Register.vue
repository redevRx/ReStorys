<template>
  <d-container fluid>
    <d-row class="mb-2 mt-4">
      <d-col class="ml-4 mr-4 mb-2">
        <d-card class="card-small">
          <!-- Form Example -->
          <!-- card header form  -->
          <d-card-header class="border-bottom">
            <center><h6 class="m-0">Sign Up</h6></center>
          </d-card-header>

          <d-list-group flush>
            <d-list-group-item class="p-3">
              <d-row>
                <!-- make form email  -->
                <d-col>
                  <d-form validated>
                    <d-form-row>
                      <d-col md="6" class="form-group">
                        <label for="feEmailAddress">Email</label>
                        <d-input
                          v-model="txtEmail"
                          value="Vasile"
                          required
                          id="feEmailAddress"
                          type="email"
                          placeholder="Email"
                        />
                        <d-form-invalid-feedback
                          >Please Inter Email.</d-form-invalid-feedback
                        >
                      </d-col>

                      <!-- make user name for use in app  -->

                      <d-col md="6" class="form-group">
                        <label for="name">Name</label>
                        <d-input
                          v-model="userName"
                          value="Vasile"
                          required
                          id="name"
                          type="text"
                          placeholder="Name"
                        />
                        <d-form-invalid-feedback
                          >Please Inter Name.</d-form-invalid-feedback
                        >
                      </d-col>

                      <!-- make form password -->
                      <d-col md="6">
                        <label for="fePassword">Password</label>
                        <d-input-group seamless class="mb-3">
                          <d-input
                            v-model="txtPassword"
                            required
                            id="fePassword"
                            type="password"
                          />
                          <d-form-invalid-feedback
                            >Please Inter Password.</d-form-invalid-feedback
                          >
                          <d-input-group-text slot="append">
                            <i class="material-icons">lock</i>
                          </d-input-group-text>
                        </d-input-group>
                      </d-col>
                      <!-- make condrim passowrd -->
                      <d-col md="6">
                        <label for="fePassword">Password</label>
                        <d-input-group seamless class="mb-3">
                          <d-input
                            v-model="txtConfrimPassword"
                            required
                            id="fePassword"
                            type="password"
                          />
                          <d-form-invalid-feedback
                            >Please Inter Confrim
                            Password.</d-form-invalid-feedback
                          >
                          <d-input-group-text slot="append">
                            <i class="material-icons">lock</i>
                          </d-input-group-text>
                        </d-input-group>
                      </d-col>
                    </d-form-row>

                    <!-- make input get address  -->
                    <div class="form-group">
                      <label for="feInputAddress">Address</label>
                      <d-input
                        v-model="txtAddress"
                        id="feInputAddress"
                        placeholder="1234 Main St"
                      />
                    </div>

                    <!-- make form get contac -->
                    <d-form-row>
                      <d-col md="6" class="form-group">
                        <label for="feInputCity">City</label>
                        <d-input v-model="txtCity" id="feInputCity" />
                      </d-col>
                      <!-- make state  -->
                      <d-col md="4" class="form-group">
                        <label for="feInputState">State</label>
                        <d-input v-model="txtState" id="feInputState">
                        </d-input>
                      </d-col>
                      <!-- make zip code  -->
                      <d-col md="2" class="form-group">
                        <label for="feInputZip">Zip</label>
                        <d-input v-model="txtZip" id="feInputZip" />
                      </d-col>
                      <d-col md="12" class="form-group">
                        <d-checkbox required
                          >I agree with your
                          <a href="#">Privacy Policy</a>.</d-checkbox
                        >
                      </d-col>
                    </d-form-row>
                    <d-button @click="onSignUp" theme="success" type="button"
                      >Create New Account</d-button
                    >
                  </d-form>
                </d-col>
              </d-row>
            </d-list-group-item>
          </d-list-group>
        </d-card>
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import UserModel from "../model/UserInfo/UserInfo"
export default {
  data() {
    return {
      txtEmail: "",
      userName: "",
      txtPassword: "",
      txtConfrimPassword: "",
      txtAddress: "",
      txtCity: "",
      txtState: "",
      txtZip: ""
      // txtDescription: this.$store.getters["login/getEmail"]
    };
  },
  computed: {},
  methods: {
    //clear data
    clearInput()
  {
    this.userName = ""
     txtEmail = "",
      txtPassword ="",
      txtConfrimPassword ="",
      txtAddress = "",
      txtCity = "",
      txtState = "",
      txtZip = ""
  },
    // set input event change
    setInputEventChange() {
      this.$store.dispatch("login/onChangeUserName", this.userName);
      this.$store.dispatch("login/onChangeEmail", this.txtEmail);
      this.$store.dispatch("login/onChangePass", this.txtPassword);
      this.$store.dispatch(
        "login/onChangeConfrimPassword",
        this.txtConfrimPassword
      );
      this.$store.dispatch("login/onChangeAddress", this.txtAddress);
      this.$store.dispatch("login/onChangeState", this.txtState);
      this.$store.dispatch("login/onChageCity", this.txtCity);
      this.$store.dispatch("login/onChangeZipCode", this.txtZip);
    },
    onSignUp() {
      //show alert
      this.$toast.warning("Pleass wait..")
      //
      this.setInputEventChange();
      var user = {
        email: this.$store.getters["login/getEmail"],
        password: this.$store.getters["login/getPassword"],
        confrimPassword: this.$store.getters["login/getconfrimPassword"]
      };

      this.$store
        .dispatch("login/onRegister",user)
        .then(result => {
          if(result == '')
          {
            result = 'password invalid'
          }
          this.$toast.success('user id: '+result);
          this.$store.dispatch("currentUser/onUserChange", result);

          //user info model
          // var data = new  UserMode()
          // data.setEmail(this.$store.getters["login/getEmail"])
          // data.setUserName(this.$store.getters["login/getUserName"])
          // data.setAddress( this.$store.getters["login/getAddress"])
          // data.setCity(this.$store.getters["login/getCity"])
          // data.setState(this.$store.getters["login/getState"])
          // data.setZipCode(this.$store.getters["login/getZipCode"])
          // data.setUid(result)

               var data = {
          email: this.$store.getters["login/getEmail"],
          userName: this.$store.getters["login/getUserName"],
           nickName: '',
          address: this.$store.getters["login/getAddress"],
          city: this.$store.getters["login/getCity"],
          state: this.$store.getters["login/getState"],
          zipCode: this.$store.getters["login/getZipCode"],
          description: '',
          uid: result,
          image: ''
        };
        ///
          this.$store.dispatch('login/onSaveUser',data).then((it) => {
             this.$toast.success(it);

             /*
             load user info use in component
              */
             this.$store.dispatch('userInfo/onLoadUserInfo',result).then((it) => {
            this.$store.dispatch('userInfo/onChageUserinfo',it)
            console.log('load user info success')
          }).catch((err) => {
             console.log('load user info faield')
          });


             this.$router.push("/blog-overview")
          }).catch((err) => {
             this.$toast.error(err);
          });
        })
        .catch(err => {
          this.$toast.error(err);
        });

        this.clearInput()
    }
  },
};
</script>
