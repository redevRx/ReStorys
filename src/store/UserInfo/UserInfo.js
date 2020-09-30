import firebase from "firebase";
export default
    {
        namespaced: true,
        state:
        {
            //save userinfo
            userinfo: []
        },
        getters:
        {
            //get userinfo
            //  -user name
            //email
            //other
            getUserInfo(state) {
                return state.userinfo
            }
        },
        mutations:
        {
            //set userinfo
            setUserInfo(state, value) {
                state.userinfo = value
            }
        },
        actions:
        {
            //change data in  uerinfo
            onChageUserinfo(context, data) {
                context.commit('setUserInfo', data)
            },
            //load user info from firestore
            onLoadUserInfo(context, uid) {
                return new Promise((resolve, reject) => {
                    firebase.firestore().collection('user info').doc(uid)
                    .get().then((result) => {
                        console.log('load user info :'+result.data());
                        resolve(result.data())
                    }).catch((err) => {
                        reject(err)
                    });
                })
            }
        }
    }