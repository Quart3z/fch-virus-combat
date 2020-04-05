// Your web app's Firebase configuration
var firebaseConfig = {

  apiKey: "AIzaSyC1tU-A-tfwJm6mvCKPIglT5P1EH1WV9uY",
  authDomain: "tracker-701bd.firebaseapp.com",
  databaseURL: "https://tracker-701bd.firebaseio.com",
  projectId: "tracker-701bd",
  storageBucket: "tracker-701bd.appspot.com",
  messagingSenderId: "888062131196",
  appId: "1:888062131196:web:05aba93cb208c8da489079",
  measurementId: "G-H3D1P7NTKT"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function report(){

  $("#info").hide();
  $("#report_panel").css("display", "flex");

}
