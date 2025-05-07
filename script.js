// Global variable set by getVerb function
var verb = ""
var subjects = ['je', 'tu', 'iel', 'nous', 'vous', 'iels'];

// Selects a random verb from JSON data and saves as global object
// Updates HTML with verb info
// Sets solution and verb (global variables)
function getVerb() {
    fetch('./data.json')
        .then(res => res.json())
        .then(data => {
            // Clear input text from any previous entries
            document.getElementById("solution").value = "";
            // Set (global) verb object with data from JSON file
            verb = data.verbs[getRandom(0,data.verbs.length-1)];
            verb.tense = getRandomTense();
            verb.subject = getRandomSubject();
            verb.solution = getSolution();

            // Update HTML with verb data
            document.getElementById("verb").innerHTML = "Verb: " + verb.infinitive;
            document.getElementById("meaning").innerHTML = "Meaning: " + verb.meaning;
            document.getElementById("tense").innerHTML = "Verb tense: " + verb.tense;
            document.getElementById("regular").innerHTML = "Verb regularity: " + verb.group;
            document.getElementById("subject").innerHTML = getRandomDisplaySubject();
    })
}

// Returns random number between min and max (inclusive)
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Returns random verb tense
// TO DO add additional tenses
function getRandomTense() {
    var randomTense = getRandom(0, 3);
    if(randomTense == 0) {
        return "présent";
    } else if(randomTense == 1) {
        return "imparfait";
    } else if(randomTense == 2) {
        return "futur simple";
    } else if (randomTense == 3) {
        return "conditionnel présent";
    } else if (randomTense == 4) {
        return "subjonctif présent"
    } else {
        return "passé composé"
    }
}

// Returns random subject from subjects array
function getRandomSubject() {
    var subject = getRandom(0, 5);
    return subjects[subject];
}

function getSolution() {
    var ending = verb.conjugations[verb.tense][verb.subject];
    if (verb.tense !== "passé composé") { 
        return verb.infinitive.slice(0,verb.infinitive.length-2) + ending;
    } else {
        return ending
    }
}

// Returns a random subject to display
// allows for randomness in il/elle/iel or ils/elles/iels
// otherwise displays subjects normally
function getRandomDisplaySubject() {
    var random = getRandom(0,2);
    if (verb.subject === "iel") {
        var randomSubjects = ['iel', 'elle', 'il'];
    } else if (verb.subject ==="iels") {
        var randomSubjects = ['iels', 'elles', 'ils'];
    } else {
        var randomSubjects = [verb.subject];
        random = 0;
    }
    return randomSubjects[random].charAt(0).toUpperCase() + randomSubjects[random].slice(1);
}

// Prompts user that input is (in)correct 
function checkEntry() {
    // Get input text from user
    input = document.getElementById("solution").value;
    // Compare input to solution (a global variable)
    if( input === verb.solution) {
        document.getElementById("correct").innerHTML = "Correct! The answer is: " + verb.solution;
    } else {
        document.getElementById("correct").innerHTML = "Incorrect! The answer is: " + verb.solution;
    };
}