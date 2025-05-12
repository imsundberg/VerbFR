// Global variable set by getVerb function
var verb = ""; // verb has format {infinitive, meaning, group, conjugation, tense, subject, solution}
var subjects = ['je', 'tu', 'iel', 'nous', 'vous', 'iels'];

// Selects a random verb from JSON data
// Updates HTML with verb info
// Sets solution and verb (global variables)
function getVerb() {
    fetch('./data.json')
        .then(res => res.json())
        .then(data => {
            // Clear input text from previous entry (if any)
            document.getElementById("solution").value = "";
            // Set (global) verb object with data from JSON file
            verb = data.verbs[getRandom(0,data.verbs.length-1)]; // verb defined globally
            verb.tense = getRandomTense();
            verb.subject = getRandomSubject();
            // TO DO: change to error if tense is not chosen by user?
            if ( verb.tense != undefined) {
                verb.conjugation = verb.conjugations[verb.tense];
                delete verb.conjugations; // only store conjugation for specific tense
                verb.solution = getSolution();
                // Update HTML with verb data
                document.getElementById("verb").innerHTML = "Verb: " + verb.infinitive;
                document.getElementById("solution").placeholder = verb.infinitive;
                document.getElementById("meaning").innerHTML = "Meaning: " + verb.meaning;
                document.getElementById("tense").innerHTML = "Verb tense: " + verb.tense.replace("_", " ");
                document.getElementById("regular").innerHTML = "Verb regularity: " + verb.regular;
                document.getElementById("subject").innerHTML = getRandomDisplaySubject();
            } else {
                // Prompt user to provide tense
                document.getElementById('tense').innerHTML = "Please select tense(s) to study.";
                // Clear text from previous verb
                document.getElementById("solution").placeholder = "";
                document.getElementById("verb").innerHTML = "";
                document.getElementById("meaning").innerHTML = "";
                document.getElementById("regular").innerHTML = "";
                document.getElementById("subject").innerHTML = "";
                document.getElementById("correct").innerHTML = "";
            }
    })
}

// Returns random number inclusively between nonnegative integers min and max
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Returns random tense from user selected tenses (checkboxes)
// TO DO: throw error if user has not selected any tense checkboxes (currently fixed with if-then statement in getVerb)
function getRandomTense() {
    var tenses = document.getElementsByClassName("tense"); // list of all checkboxes with class="tense"
    var selectedTenses = []; // list of all selected tenses (as strings from element id)
    for (var i = 0; i < tenses.length; i++) {
        if (tenses[i].checked) {
            selectedTenses.push(tenses[i].id.replace(" ", "_"));
        }
    }
    return selectedTenses[getRandom(0, selectedTenses.length-1)];
}

// Returns random subject from subjects array (global variable)
function getRandomSubject() {
    var subject = getRandom(0, subjects.length-1);
    return subjects[subject];
}

// Returns a random subject to display
// allows for randomness in il/elle/on/iel or ils/elles/iels
// otherwise displays subjects normally
function getRandomDisplaySubject() {
    if (verb.subject === "iel") {
        var random = getRandom(0,3);
        var randomSubjects = ['iel', 'on', 'elle', 'il'];
    } else if (verb.subject ==="iels") {
        var random = getRandom(0,2);
        var randomSubjects = ['iels', 'elles', 'ils'];
    } else {
        var random = 0;
        var randomSubjects = [verb.subject];
    }
    return randomSubjects[random].charAt(0).toUpperCase() + randomSubjects[random].slice(1);
}

// Returns conjugation of infinitive for given tense and subject
function getSolution() {
    return verb.conjugation[verb.subject]
}

// Prompts user that input is (in)correct 
function checkEntry() {
    // Get input text from user
    input = document.getElementById("solution").value.toLowerCase();
    // Compare input to solution (a global variable)
    if( input === verb.solution) {
        document.getElementById("correct").innerHTML = "Correct! The answer is: " + verb.solution;
    } else {
        document.getElementById("correct").innerHTML = "Incorrect! The answer is: " + verb.solution;
    };
}