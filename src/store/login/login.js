import firebase, { firestore } from "firebase";
export default {
  namespaced: true,
  state: {
    // valible user in user login and user register 
    userName: "",
    txtEmail: '',
    txtPassword: '',
    txtConfrimPassword: '',
    txtAddress: '',
    txtCity: '',
    txtState: '',
    txtZip: '',
    txtDescription: ''
    // ^//
  },
  getters: {

    /* valible of text input 
    //  - email
    //  - user name
    //  - password 
    -address
    -city
    -state
    -zip
    -description
    */
    //return user name
    getUserName(state) {
      return state.userName;
    },
    //return email
    getEmail(state) {
      return state.txtEmail
    },
    // return password
    getPassword(state) {
      return state.txtPassword
    },
    //return confrim password
    getconfrimPassword(state) {
      return state.txtConfrimPassword
    },
    // return address
    getAddress(state) {
      return state.txtAddress
    },
    // return city of user
    getCity(state) {
      return state.txtCity
    },
    // return state
    getState(state) {
      return state.txtState
    },
    // return zip code
    getZipCode(state) {
      return state.txtZip
    },
    // return descrip of user
    getDescription(state) {
      return state.txtDescription
    },
    // text input ^
  },
  mutations: {

    /* valible of text input 
    //  - email
    //  - user name
    //  - password 
    -address
    -city
    -state
    -zip
    -description
    */
    //set user name
    setUserName(state, value) {
      state.userName = value;
    },
    //set email
    setEmail(state, value) {
      state.txtEmail = value
    },
    // set password
    setPassword(state, value) {
      state.txtPassword = value
    },
    //set confrim password
    setConfrimPassword(state, value) {
      state.txtConfrimPassword = value
    },
    // set address
    setAddress(state, value) {
      state.txtAddress = value
    },
    // set city of user
    setCity(state, value) {
      state.txtCity = value
    },
    // set state
    getState(state, value) {
      state.txtState = value
    },
    // set zip code
    setZipCode(state, value) {
      state.txtZip = value
    },
    // set descrip of user
    setDescription(state, value) {
      return state.txtDescription = value
    },
    // text input ^
  },
  actions: {
    // user login user firebase auth email password 
    //  valible
    // -email
    // -password
    async onLogin(context, user) {
      return new Promise((resolve, reject) => {
        firebase.auth()
          .signInWithEmailAndPassword(
            user.email.toString().trim(),
            user.password.toString().trim()
          )
          .then(value => {
            console.log(value.user);
            resolve(value.user.uid);
          }).catch(e => {
            console.log('login error :' + e);
            reject('login error :' + e);
          });
      })
    },
    // ^^//
    //
    // ****************************************************************************
    /* 
    user register with firebase auth email password
    parameter
      -email
      -password
      -address
      -state
      -city
      -zip
      -desctiption    */
    async onRegister(context, user) {
      return new Promise((resolve, reject) => {
        if (user.password == user.confrimPassword) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              user.email.toString().trim(),
              user.password.toString().trim()
            )
            .then(value => {
              console.log("onUser Register:" + value.user.uid);
              resolve(value.user.uid);
            }).catch(e => {
              console.log("on User Register :" + e);
              reject(e);
            });
        }
        else {
          reject('password invalid')
        }
      })
    },
    onSaveUser(context, data) {
      // const data =
      // {
      //   email: value.getEmail(),
      //   userName: value.getUserName(),
      //   nickName: value.getNickName(),
      //   address: value.getAddress(),
      //   city: value.getCity(),
      //   state: value.getState(),
      //   zipCode: value.getzipCode(),
      //   description: value.getDescrip(),
      //   uid: value.getUid(),
      //   image: value.getImage()
      // }
      return new Promise((resolve, reject) => {
        firebase.firestore().collection('user info').doc(data.uid).set(data).then((_) => {
          console.log("onUser save:");
          resolve('Save Success');
        }).catch((e) => {
          reject('Sign Up Error' + e)
        })
      })
    },
    // ^^^^^^^^^^^^^^^^^
    /*
    user logOut 
     -clear currentUser => uid
    */
    async onSignOut(context, data) {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut()
        if (data != "") {
          resolve("User Log Out Successfully..")
          console.log('oon User LogOut Successfully..')
        }
        else {
          console.log('user LogOut Failed')
          reject('user LogOut Failed')
        }
      })
    },
    // ^^^^^^^^^^^^^^^^//
    /* 
    user change value input login and register
      -email
      -password
      -address
      -state
      -city
      -zip
      -desctiption
    */
    //input user name
    onChangeUserName(context, data) {
      context.commit('setUserName', data)
    },
    //input email
    onChangeEmail(context, data) {
      context.commit('setEmail', data)
    },
    //input password
    onChangePass(context, data) {
      context.commit('setPassword', data)
    },
    //input confrim password
    onChangeConfrimPassword(context, data) {
      context.commit('setConfrimPassword', data)
    },
    //input address
    onChangeAddress(context, data) {
      context.commit('setAddress', data)
    },
    //input state
    onChangeState(context, data) {
      context.commit('getState', data)
    },
    //input city
    onChageCity(context, data) {
      context.commit('setCity', data)
    },
    //input zip
    onChangeZipCode(context, data) {
      context.commit('setZipCode', data)
    },
    //  ..input description
    onChageDescrip(context, data) {
      context.commit('setDescription', data)
    },
    // ...^^^^^^^^^^^^^^^^^^^^^^//
  }
};
