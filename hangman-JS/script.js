function createKeyboard() {
    var keyborad = document.getElementById("keyboard");
    while (keyborad.lastElementChild) {
        keyborad.removeChild(keyborad.lastElementChild);
    }
    for (var i = 65; i < 91; i++) {
        let key = document.createElement("div");
        key.classList.add("key");
        var text = document.createTextNode(String.fromCharCode(i));
        key.onclick = function() { click_Key(key); };
        key.appendChild(text);
        keyborad.appendChild(key);
    }
}

var images = [];

function loadImage() {
    for (var i = 0; i < 12; i++) {
        images.push("Images/fault" + i.toString() + ".png");
    }

}


counterMiss = 0;
var word;
var imageMiss;
let fieldChar = [];


function randomWord() {
    var words = ["cat", "dog", "house", "apple", "banana", "elephant"];
    return words[Math.floor(Math.random() * words.length)];
}

function DoWordArea() {
    this.word = randomWord();
    counterMiss = 0;
    createKeyboard();
    fieldChar = [];
    var wordArea = document.getElementById("wordArea");
    while (wordArea.lastElementChild) {
        wordArea.removeChild(wordArea.lastElementChild);
    }
    imageMiss = document.getElementById("imageMiss");
    imageMiss.src = images[0];
    for (var i = 0; i < this.word.length; i++) {
        let charackter = document.createElement("div");
        charackter.classList.add("character");
        var text = document.createTextNode("_");
        if (i == 0) {
            text = document.createTextNode(word[i]);
        } else if (i == this.word.length - 1) {
            text = document.createTextNode(word[i]);
        }
        charackter.appendChild(text);
        wordArea.appendChild(charackter);
        fieldChar.push(charackter);
    }

}

function click_Key(key) {

    var keyValue = key.textContent;
    var hit = false;
    for (var i = 0; i < this.word.length - 1; i++) {
        if (this.word[i].toString().toLowerCase() == keyValue.toLowerCase()) {
            hit = true;
            key.style.backgroundColor = "green";
            fieldChar[i].textContent = keyValue.toLowerCase();
        }
    }
    if (hit == false) {
        counterMiss += 1;
        imageMiss.src = images[counterMiss];
        key.style.backgroundColor = "red";
    }
    if (counterMiss == 11) {
        MessageToUser("You lose");
    }
    var count = 0;
    for (var i = 0; i < this.word.length; i++) {
        if (fieldChar[i].textContent != "_") {
            count++;
        }
    }
    if (count == this.word.length) {
        MessageToUser("You win");
    }
    key.style.pointerEvents = 'none'
}

function MessageToUser(communique) {
    alert(communique);
    DoWordArea();
}

window.onload = () => {
    loadImage();
    DoWordArea();

}