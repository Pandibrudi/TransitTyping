const textarea = document.getElementById("textarea");
const alertbox = document.getElementById("warning");
const wordcount = document.getElementById("wordcount")

// BASIC DOM FUNCTIONS

function get_element_value(obj){
    current_value = obj.value;
    return current_value
}

// PREPROCESSING

function get_word_list(str){
    var text = str.toLowerCase();
    var text = remove_punctuation(text);
    var text = remove_double_whitespaces(text); 
    var all_words = text.split(" ");
    // remove possible empty string at the end!
    return all_words
}

function remove_punctuation(str) {
    return str.replace(/[!"“#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');
}

function remove_double_whitespaces(str) {
    return str.replace(/[\s+]/g, " ");
}

// FOR TRANSIT-TYPING

function check_duplicates(){
    var textarea_value = get_element_value(textarea)
    var all_words = get_word_list(textarea_value)
    var num_words = all_words.length;
    const duplicates = all_words.filter((item, index) => all_words.indexOf(item) !== index);
    if (duplicates != 0) {
        if (alertbox.classList.contains("alert-success")){
            change_alert_color(alertbox, "danger")
        }
        change_alert_text(alertbox, "Doppelte Wörter gefunden " + "<b>" + duplicates + "</b>")

    } else {
        if (alertbox.classList.contains("alert-danger")){
            change_alert_color(alertbox, "success")
        }
        change_alert_text(alertbox, "Keine doppelten Wörter gefunden! Guten Flug! ✈️")
    }
    update_wordcount(num_words)
}

// WORDCOUNT

function update_wordcount(int) {
    wordcount.innerHTML = int.toString()
}

// ALERTBOX

function change_alert_text(alertbox, text) {
    alertbox.innerHTML = text
}

// using the bootstrap descriptions: 
// primary, secondary, success, danger
// warning, info, light, dark
function change_alert_color(alertbox, color) {
    const currentClass = [...alertbox.classList].find(c => c.startsWith('alert-'));
    if (currentClass) {
        alertbox.classList.replace(currentClass, `alert-${color}`);
    }
}

textarea.addEventListener('keydown', check_duplicates)
textarea.addEventListener('keyup', check_duplicates)