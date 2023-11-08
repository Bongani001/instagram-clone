class App {
    constructor() {

    this.$app = document.querySelector("#app");
    this.$firebaseAuthContainer = document.querySelector("#firebaseui-auth-container");

    this.$logoutBtn = document.querySelector(".logout");
    this.$authUserText = document.querySelector(".auth-username");


    this.ui = new firebaseui.auth.AuthUI(auth);
    this.handleAuth();

    this.addEventListeners();
    }

    handleAuth() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.userId = user.uid;
                this.$authUserText.innerText = user.displayName;
                this.redirectToApp();
            } else {
                this.redirectToAuth();
            }
          });
    }

    redirectToAuth() {
        this.$firebaseAuthContainer.style.display = "block";
        this.$app.style.display = "none";
        
        this.ui.start('#firebaseui-auth-container', {
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    // this.userId = authResult.uid;
                    console.log(authResult.user.uid);
                    this.$authUserText.innerText = user.displayName;
                    this.redirectToApp();
                    return true;
                }
            },
            signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            // Other config options...
          });
    }

    redirectToApp() {
        this.$firebaseAuthContainer.style.display = "none";
        this.$app.style.display = "block";
        // this.fetchNotesFromDb();
    }

    handleLogout() {
        firebase.auth().signOut().then(() => {
            this.redirectToAuth();
          }).catch((error) => {
            console.log("ERROR OCCURED:", error);
          });
    }

    addEventListeners() {
        this.$logoutBtn.addEventListener("click", (event) => {
            this.handleLogout();
        });
    }
}

const app = new App();