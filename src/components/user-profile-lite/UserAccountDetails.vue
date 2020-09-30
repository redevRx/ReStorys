<template>
  <d-card class="card-small mb-4">
    <!-- Card Header -->
    <d-card-header class="border-bottom">
      <h6 class="m-0">{{ title }}</h6>
    </d-card-header>

    <d-list-group flush>
      <d-list-group-item class="p-3">
        <d-row>
          <d-col>
            <d-form>
              <d-form-row>
                <!-- user Name -->
                <d-col md="6" class="form-group">
                  <label for="userName">User Name</label>
                  <d-form-input
                    type="text"
                    id="userName"
                    placeholder="User Name"
                    v-model="txtUserName"
                  />
                </d-col>

                <!-- uid -->
                <d-col md="6" class="form-group">
                  <label for="uid">UID</label>
                  <d-form-input
                    disabled
                    type="text"
                    id="uid"
                    placeholder="UID"
                    :value="this.$store.getters['userInfo/getUserInfo'].uid"
                  />
                </d-col>
              </d-form-row>

              <d-form-row>
                <!-- Email -->
                <d-col md="6" class="form-group">
                  <label for="feEmail">Email</label>
                  <d-form-input
                    type="email"
                    v-model="txtEmail"
                    id="feEmail"
                    placeholder="Email Address"
                  />
                </d-col>

                <!-- nickName -->
                <d-col md="6" class="form-group">
                  <label for="nickName">Nick Name</label>
                  <d-form-input
                    type="text"
                    id="nickName"
                    placeholder="Nick Name"
                    v-model="txtNickName"
                  />
                </d-col>
              </d-form-row>

              <!-- Address -->
              <div class="form-group">
                <label for="feInputAddress">Address</label>
                <d-form-input
                  type="text"
                  id="feInputAddress"
                  placeholder="1234 Main St"
                  v-model="txtAddress"
                />
              </div>

              <d-form-row>
                <!-- City -->
                <d-col md="6" class="form-group">
                  <label for="feInputCity">City</label>
                  <d-form-input
                    type="text"
                    id="feInputCity"
                    v-model="txtCity"
                  />
                </d-col>

                <!-- State -->
                <d-col md="4" class="form-group">
                  <label for="feInputState">State</label>
                  <d-input id="feInputState" v-model="txtState"> </d-input>
                </d-col>

                <!-- Zip Code -->
                <d-col md="2" class="form-group">
                  <label for="inputZip">Zip</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputZip"
                    v-model="txtZipCode"
                  />
                </d-col>
              </d-form-row>

              <d-form-row>
                <!-- upload image profile -->
                <d-col md="12" class="form-group">
                  <!-- User Avatar preview -->
                  <div class="mb-3 mx-auto">
                    <img
                      class="rounded-circle"
                      :src="url"
                      alt="Image Profile"
                      width="110"
                    />
                  </div>
                  <!-- Custom File Upload -->
                  <strong class="text-muted d-block mb-2"
                    >Profile Upload</strong
                  >
                  <div class="custom-file mb-3">
                    <input
                      @change="onFileChange"
                      type="file"
                      class="custom-file-input"
                      id="customFile2"
                    />
                    <label class="custom-file-label" for="customFile2">{{
                      imageFile.name
                    }}</label>
                  </div>
                </d-col>
              </d-form-row>

              <d-form-row>
                <!-- Description -->
                <d-col md="12" class="form-group">
                  <label for="feDescription">Description</label>
                  <d-textarea
                    name="feDescription"
                    rows="6"
                    v-model="txtDescription"
                  ></d-textarea>
                </d-col>
              </d-form-row>

              <d-button type="button" class="btn-accent" @click="updateUserInfo"
                >Update Account</d-button
              >
            </d-form>
          </d-col>
        </d-row>
      </d-list-group-item>
    </d-list-group>
  </d-card>
</template>

<script>
export default {
  name: "user-account-details",
  props: {
    /**
     * The component title.
     */
    title: {
      type: String,
      default: "Account Details",
    },
  },
  data() {
    return {
      txtEmail: this.$store.getters["userInfo/getUserInfo"].email,
      txtUserName: this.$store.getters["userInfo/getUserInfo"].userName,
      txtNickName: this.$store.getters["userInfo/getUserInfo"].nickName,
      txtAddress: this.$store.getters["userInfo/getUserInfo"].address,
      txtCity: this.$store.getters["userInfo/getUserInfo"].city,
      txtState: this.$store.getters["userInfo/getUserInfo"].state,
      txtZipCode: this.$store.getters["userInfo/getUserInfo"].zipCode,
      txtDescription: this.$store.getters["userInfo/getUserInfo"].description,
      url:
        "https://cdn.iconscout.com/icon/free/png-512/user-employee-avatar-man-person-businessman-11-16779.png",
      imageFile: "",
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.imageFile = file;
      this.url = URL.createObjectURL(file); //create url image local host
      // this.url = file.name
    },
    updateUserInfo() {
      //show plase wait
      this.$toast.warning("Pleass wait..");

      //make upload data
      const uploadData = {
        image: this.imageFile,
        uid: this.$store.getters["userInfo/getUserInfo"].uid,
      };

      /*
      user click update info 
       - upload image and get url
       - save info with image url 
      */
      this.$store
        .dispatch("currentUser/onUploadImage", uploadData)
        .then((url) => {
          // alert(url)
          //create data of user info
          const data = {
            email: this.txtEmail,
            userName: this.txtUserName,
            nickName: this.txtNickName,
            address: this.txtAddress,
            city: this.txtCity,
            state: this.txtState,
            zipCode: this.txtZipCode,
            description: this.txtDescription,
            uid: this.$store.getters["userInfo/getUserInfo"].uid,
            image: url,
          };
          // upload image success
          this.$store
            .dispatch("currentUser/onUpdateProfile", data)
            .then((result) => {
              this.$toast.success("Update Successfully..", {
                onClose() {
                  window.location.reload();
                },
              });
            })
            .catch((err) => {
              this.$toast.error(err);
            });

          //
        })
        .catch((err) => {
          // this.$toast.warning(err);
          //create data of user info
          const data = {
            email: this.txtEmail,
            userName: this.txtUserName,
            nickName: this.txtNickName,
            address: this.txtAddress,
            city: this.txtCity,
            state: this.txtState,
            zipCode: this.txtZipCode,
            description: this.txtDescription,
            uid: this.$store.getters["userInfo/getUserInfo"].uid,
            image: this.$store.getters["userInfo/getUserInfo"].image == "" ? "" : this.$store.getters["userInfo/getUserInfo"].image,
            imageType: ""
          };
          if (uploadData.imageType == "" || uploadData.imageType == undefined) {
            //not upload image success
            this.$store
              .dispatch("currentUser/onUpdateProfile", data)
              .then((result) => {
                this.$toast.success("Update Successfully..", {
                  onClose() {
                    window.location.reload();
                  },
                });
              })
              .catch((err) => {
                this.$toast.error(err);
              });
          }
          console.log(err);
        });
    },
  },
};
</script>
