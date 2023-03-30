const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for sensor readings
const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const HigoElement = document.getElementById("higo");
const LightElement = document.getElementById("light");
const CO2Element = document.getElementById("co2");

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPathTemp = '01/' + '/Sensores' + '/Temperatura';
    var dbPathHum = '/01' + '/Humedad';
    var dbPathHigo = '/01' + uid.toString() + '/Higometria';
    var dbPathLight = '/01' + '/IntensidadLuz';
    var dbPathCO2 = '/01' + uid.toString() + '/CO2';

    // Database references
    var dbRefTemp = firebase.database().ref().child(dbPathTemp);
    var dbRefHum = firebase.database().ref().child(dbPathHum);
    var dbRefHigo = firebase.database().ref().child(dbPathHigo);
    var dbRefLight = firebase.database().ref().child(dbPathLight);
    var dbRefCO2 = firebase.database().ref().child(dbPathCO2);

    // Update page with new readings
    dbRefTemp.on('value', snap => {
      tempElement.innerText = snap.val().toFixed(2);
    });

    dbRefHum.on('value', snap => {
      humElement.innerText = snap.val().toFixed(2);
    });

    dbRefHigo.on('value', snap => {
      HigoElement.innerText = snap.val().toFixed(2);
    });
    dbRefLight.on('value', snap => {
      LightElement.innerText = snap.val().toFixed(2);
    });
    dbRefCO2.on('value', snap => {
      CO2Element.innerText = snap.val().toFixed(2);
    });

  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}