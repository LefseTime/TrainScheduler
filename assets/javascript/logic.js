$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDNElF5YzmuRkE_tMYvoR6pXJ47N9Rcc3k",
        authDomain: "trainz-9e94a.firebaseapp.com",
        databaseURL: "https://trainz-9e94a.firebaseio.com",
        projectId: "trainz-9e94a",
        storageBucket: "",
        messagingSenderId: "118987210645"
    };
    firebase.initializeApp(config);

    let database = firebase.database();

    //pull info from firebase on load and more info added
    database.ref("trainz").on("child_added", function (snapshot) {

        //create variable to make things less obnoxious
        let sv = snapshot.val();

        //create tr div to build row in before appending
        let newRow = $("<tr>");
        //create th div for train name
        let newName = $("<th>");
        //add snapshot value to newname div
        newName.text(sv.trainName);
        //append newName to newRow
        newRow.append(newName);

        //create td div for train destination
        let newDest = $("<td>");
        //add snapshot value to newdest div
        newDest.text(sv.destination);
        //append newName to newRow
        newRow.append(newDest);

        //create td div for train frequency
        let newFreq = $("<td>");
        //add snapshot value to newFreq div
        newFreq.text(sv.frequency);
        //append newName to newRow
        newRow.append(newFreq);

        //maths
        let startTime = moment(sv.firstTrain, "HH:mm").format("x");
        let currentTime = moment().format("x");
        let diff = currentTime - startTime;
        let minDiff = moment(diff, "x").format("mm");
        let duration = sv.frequency;

        let minTilNext = duration - (minDiff % duration);
        
        //next arrival
        let next = moment().add(minTilNext,"m");
        let nextTrain = moment(next).format("LT");
        //create td div for next train time
        let newNext = $("<td>");
        //add snapshot value to newFreq div
        newNext.text(nextTrain);
        //append newName to newRow
        newRow.append(newNext);

        //min away
        //create td div for train min away
        let newMTN = $("<td>");
        //add snapshot value to newFreq div
        newMTN.text(minTilNext);
        //append newName to newRow
        newRow.append(newMTN);

        //append newRow into html
        $("tbody").append(newRow);
    })

    //when user submits form
    $("#submit").click(function () {
        
        let trainName = $("#train-name").val();
        let destination = $("#destination").val();
        let firstTrain = $("#first-train-time").val();
        let frequency = $("#frequency").val();

        //push info up to firebase (append to previous info, not overwrite)
        database.ref("trainz").push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });
    });

    let audio = new Audio("assets/audio/atmosphere.mp3");

    //when user turns atmosphere on
    $("#on").click(function () {
        audio.play();
    });

    //when boring, mirthless user turns atmosphere off
    $("#off").click(function () {
        audio.pause();
    });
});
