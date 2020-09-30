import fireabse from 'firebase'
export default {
    namespaced: true,
    state: {
        currentUser: "",
    },
    getters: {
        getCurrentUser(state) {
            return state.currentUser;
        },
    },
    mutations: {
        setCurrentUser(state, value) {
            state.currentUser = value;
        }
    },
    actions: {
        //user login save uid
        //user logout set uid null
        onUserChange(context, value) {
            context.commit("setCurrentUser", value);
        },
        /*
        user upload image profile
        and if upload success return image url
         - get parameter name data
          -{
              image: value,
              uid: value
          }
         */
        onUploadImage(context, data) {
            return new Promise((resolve, reject) => {
                // alert(data.image)
                if (data.image == '' || data.image == undefined) {
                    reject('not upload image profile')
                }
                else {
                    const storageRef = fireabse.storage().ref("image profile/images/" + data.uid + "/").put(data.image)
                    storageRef.on(`state_changed`, snapshot => {
                        // this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    }, err => {
                        reject('upload image profile error :' + err.message)
                        console.log('upload image profile error :' + err.message)
                    }, () => {
                        // this.uploadValue=100;
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            resolve(url)
                            console.log('load url image profile success: ' + url);
                        }).catch((err) => {
                            reject('load url image profile error :' + err)
                            console.log('load url image profile error :' + err);
                        });
                    })
                }
            })
        },
        /*
        update user info 
         */
        onUpdateProfile(context, profileInfo) {
            return new Promise((resolve, reject) => {
                // alert(profileInfo.uid)
                fireabse.firestore().collection('user info').doc(`${profileInfo.uid}`).
                    update(
                        {
                            email: profileInfo.email,
                            userName: profileInfo.userName,
                            nickName: profileInfo.nickName,
                            address: profileInfo.address,
                            city: profileInfo.city,
                            zipCode: profileInfo.zipCode,
                            image: profileInfo.image,
                            state: profileInfo.state,
                            // uid: profileInfo.uid,
                            description: profileInfo.description
                        })
                    .then((_) => {
                        resolve('update success')
                        console.log('update user info success');
                    }).catch((err) => {
                        reject('update user info error :' + err)
                        console.log('update user info error');
                    });
            })
        },

        /*
        check user login page
         */
        onCheckUserLogin(context) {
            return new Promise((resolve, reject) => {
                try {
                    fireabse.auth().onAuthStateChanged((user) => {
                        if (!user) {
                            reject("user not login  :" + err)
                            console.log("user not login  :" + err);
                        }
                        else {
                            // store.dispatch("currentUser/onUserChange", user.uid)
                            resolve(user.uid)
                            console.log('user login ' + user.uid);
                        }
                    })
                }
                catch (err) {
                    reject("user not login  :" + err)
                    console.log("user not login  :" + err);
                }
            })
        }
    }
}