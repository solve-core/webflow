/*
Import these first for Firebase to work
https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js
https://www.gstatic.com/firebasejs/8.6.3/firebase-auth.js

*/
const firebaseConfig = {
    apiKey: "AIzaSyAX0S0Bc2cXJzFrwpyNFceliiEOhU9mNdE",
    authDomain: "aasaanwill-71e30.firebaseapp.com",
    projectId: "aasaanwill-71e30",
    storageBucket: "aasaanwill-71e30.appspot.com",
    messagingSenderId: "763808574672",
    appId: "1:763808574672:web:bdc8320f0eb39d24eb02d5",
    measurementId: "G-KBS5KTFL8S"
};

//const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
//import { getAuth, onAuthStateChanged } from "firebase/auth";
//const auth = getAuth();
var privatePages = [
    '/payment',
    '/details'

];
var publicPages = [
    '/signup',
    '/login'
];

auth.onAuthStateChanged(user => {
    var currentPath = window.location.pathname;
    if (user) {
        //User is signed in.
        localStorage.setItem("user", JSON.stringify(user));
        if (publicPages.includes(currentPath)) {
            window.location.replace('/');
        } else {
            //console.log('User is logged in!');
            //console.log('logged in Email:' + user.email);
            // console.log('UID:' + user.uid);  
            navSignupbtn.style.display = 'none';
            loginLink.style.display = 'none';
            var herobtn = document.querySelector('.get_started_text');
            herobtn.innerHTML = "Continue with My Will";
            var gsbtn1 = document.getElementById('gsbtn1');
            gsbtn1.innerHTML = "Continue with My Will";
            var gsbtn2 = document.getElementById('gsbtn2');
            gsbtn2.innerHTML = "Continue with My Will";
            var payment1 = document.getElementById('start_an_aw_text1');
            var payment2 = document.getElementById('start_an_aw_text2');
            payment1.innerHTML = "Continue with My Will";
            payment2.innerHTML = "Continue with My Will for Couples";
            var footer_register_link = document.getElementById("footer-register_link");
            footer_register_link.innerHTML = "My Will";
            //loadingScreen.style.display = 'none';
        }

    } else {
        // User is signed out
        if (privatePages.includes(currentPath)) {
            window.location.replace('/');
            var getstartedlinksignup = document.getElementById("getStarted");
            getstartedlinksignup.setAttribute('href', "/signup");
        } else {
            //console.log('No User is logged in!');
            logoutLink.style.display = 'none';
            paymentLink.style.display = 'none';
            loadingScreen.style.display = 'none';
            detailsLink.style.display = 'none';
            var herobtn = document.querySelector('.get_started_text');
            herobtn.innerHTML = "Get Started Now";
            herobtn.setAttribute('href', "/signup");
            var gsbtn1 = document.getElementById('gsbtn1');
            gsbtn1.innerHTML = "Get Started Now";
            gsbtn1.setAttribute('href', "/signup");
            var gsbtn2 = document.getElementById('gsbtn2');
            gsbtn2.innerHTML = "Get an AasaanWill today!";
            var getstarted3 = document.getElementById("getStarted3");
            getstarted3.setAttribute('href', "/signup");
            var payment1 = document.getElementById('start_an_aw_text1');
            var payment2 = document.getElementById('start_an_aw_text2');
            payment1.innerHTML = "Start an AasaanWill";
            payment2.innerHTML = "Start an AasaanWill for Couples";
            var footer_register_link = document.getElementById("footer-register_link");
            footer_register_link.innerHTML = "Register";
            footer_register_link.setAttribute('href', "/signup");
        }
    }
});


const logout = () => {
    firebase.auth().signOut();
    window.location.replace('/');
    localStorage.clear();
}
logoutLink.addEventListener('click', logout);

const getUserDetails = () => {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
}
const getEmail = () => {
    const userDetails = getUserDetails()
    if (userDetails?.email) {
        return userDetails.email
    } else {
        throw new Error("Please log in to perform any operation")
    }
}
const isLoggedIn = () => !!getUserDetails()

console.log("GET USER", getUserDetails());


const doPayment = () => {

    if (isLoggedIn()) {} else {}
}

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",

};
window.onload = (event) => {
    var result = fetch("https://v1.nocodeapi.com/riri/webflow/zlqXhoWgqUremgjn/", requestOptions)
        .then(response => response.text())
        .then(result => {
            var count = 0;
            data = JSON.parse(result);
            var firebaseEmail = getEmail();

            for (i in data.items) {
                var paymentEmail = data.items[i].email;
                //var arrayvalues =  data.items[i];
                //console.log("paymentEmail: " + paymentEmail);    
                //console.log(arrayvalues);
                console.log("firebaseEmail:" + firebaseEmail);
                if (paymentEmail == firebaseEmail) {
                    //console.log("yayyyy");

                    document.getElementById("paymentLink").style.display = "none";
                    count++;
                    loadingScreen.style.display = 'none';
                    var getstartedlink = document.getElementById("getStarted");
                    var getstartedlink2 = document.getElementById("getStarted2");
                    var getstarted3 = document.getElementById("getStarted3");
                    getstartedlink.setAttribute('href', "/profile");
                    getstartedlink2.setAttribute('href', "/profile");
                    var footer_register_link = document.getElementById("footer-register_link");
                    footer_register_link.setAttribute('href', "/profile");
                    var herobtn = document.querySelector('.get_started_text');
                    herobtn.innerHTML = "Continue with My Will";
                    herobtn.setAttribute('href', "/profile");
                    var gsbtn1 = document.getElementById('gsbtn1');
                    gsbtn1.innerHTML = "Continue with My Will";
                    gsbtn1.setAttribute('href', "/profile");
                    var gsbtn2 = document.getElementById('gsbtn2');
                    gsbtn2.innerHTML = "Continue with My Will";
                    getstarted3.setAttribute('href', "/profile");
                    var payment1 = document.getElementById('start_an_aw_text1');
                    var payment2 = document.getElementById('start_an_aw_text2');
                    payment1.innerHTML = "Continue with My Will";
                    payment2.innerHTML = "Continue with My Will for Couples";
                    payment1.setAttribute('href', "/profile");
                    payment2.setAttribute('href', "/profile");
                    //window.location.replace('./details'); 
                    return false;

                }
            }
            if (count == 0) {
                document.getElementById("detailsLink").style.display = "none";
                var getstartedlinkpayment = document.getElementById("getStarted");
                var getstartedlinkpayment2 = document.getElementById("getStarted2");
                var getstarted3 = document.getElementById("getStarted3");
                var footer_register_link = document.getElementById("footer-register_link");
                var herobtn = document.querySelector('.get_started_text');
                var gsbtn1 = document.getElementById('gsbtn1');
                var payment1 = document.getElementById('start_an_aw_text1');
                var payment2 = document.getElementById('start_an_aw_text2');

                loadingScreen.style.display = 'none';
                if (firebase.auth().currentUser == null) {
                    getstartedlinkpayment.setAttribute('href', "/signup");
                    getstartedlinkpayment2.setAttribute('href', "/signup");
                    footer_register_link.setAttribute('href', "/signup");
                    getstarted3.setAttribute('href', "/signup");
                    payment1.innerHTML = "Start an AasaanWill";
                    payment2.innerHTML = "Start an AasaanWill for Couples";
                } else {
                    getstartedlinkpayment.setAttribute('href', "/payment");
                    getstartedlinkpayment2.setAttribute('href', "/payment");
                    footer_register_link.setAttribute('href', "/payment");
                    getstarted3.setAttribute('href', "/payment");
                    payment1.innerHTML = "Continue with My Will";
                    payment2.innerHTML = "Continue with My Will for Couples";
                    payment1.setAttribute('href', "/payment");
                    payment2.setAttribute('href', "/payment");
                }

                //window.location.replace('./payments');     
            }

        })
        .catch(error => console.log('error', error));
};