var body = document.getElementsByTagName("body")[0];


let allTitles = document.getElementsByClassName("tab_pages__title");
for(let i = 0; i < allTitles.length; i++) {
    let pressedTitle = allTitles[i];
    pressedTitle.onclick = function() {
        let parent = pressedTitle.parentElement.parentElement;
        let containedTitles = parent.children[0].children;
        let containedItems = parent.children[1].children;

        for(let y = 0; y < containedTitles.length; y++) {
            let el = containedTitles[y];
            if(el.classList.contains("tab_pages__title-selected") === true) {
                el.classList.remove("tab_pages__title-selected");
                containedItems[y].classList.add("hidden");
                break;
            }
        }
        
        pressedTitle.classList.add("tab_pages__title-selected");
        containedItems[i].classList.remove("hidden");
    };
}

let comment = document.getElementById("comment");
comment.value = "";
comment.oninput = function() {
    let linesAmount = 0;
    let lettersInLine = 0;
    let wordLength = 0;
    let text = comment.value;

    for(let i = 0; i < text.length; i++) {
        if(text[i] === '\n') {
            linesAmount++;
            lettersInLine = 0;
            continue;
        } else if(text[i] === ' ') {
            wordLength = 0;
        } else {
            wordLength++;
        }

        lettersInLine++;

        if(lettersInLine >= 66) {
            if(wordLength >= 66) {
                wordLength -= 66;
            }

            linesAmount++;
            lettersInLine = wordLength;
        }
    }

    comment.style.height = 97 + linesAmount * 18.6 + "px";
};

let similar__open_btn = document.getElementById("similar__open_btn");
let similar = document.getElementById("similar");

similar__open_btn.onclick = function() {
    if(!similar.classList.contains("opened")) {
        similar.classList.add("opened");
        similar__open_btn.textContent = "Свернуть";
    } else {
        similar.classList.remove("opened");
        similar__open_btn.textContent = "Смотреть все";
    }
}

let description__open_btn = document.getElementById("description__open_btn");
let description = document.getElementById("description");

description__open_btn.onclick = function() {
    if(!description.classList.contains("opened")) {
        description.classList.add("opened");
        description__open_btn.textContent = "Свернуть";
    } else {
        description.classList.remove("opened");
        description__open_btn.textContent = "Читать дальше";
    }
}

let requirements__open_btn = document.getElementById("requirements__open_btn");
let requirements = document.getElementById("requirements");

requirements__open_btn.onclick = function() {
    if(!requirements.classList.contains("opened")) {
        requirements.classList.add("opened");
        requirements__open_btn.textContent = "Скрыть рекомендуемые";
    } else {
        requirements.classList.remove("opened");
        requirements__open_btn.textContent = "Показать рекомендуемые";
    }
}

let menuBtn = document.getElementById("header__menu_btn");
menuBtn.onclick = function() {
    body.classList.toggle("dropdown_show");
    menuBtn.classList.toggle("clicked");
};


let genresBtn = document.getElementById("header__genres_btn");
let genresPanel = document.getElementById("genres_panel");
genresBtn.onclick = function() {
    body.classList.toggle("dropdown_show");
    genresPanel.classList.toggle("show");
    genresBtn.classList.toggle("clicked");
};

let searchBlock = document.getElementById("search_block");
searchBlock.onclick = function() {
    body.classList.add("dropdown_show");
    searchBlock.classList.add("clicked");
};

let searchBlockClose = document.getElementById("search_block__close");
searchBlockClose.onclick = function() {
    body.classList.remove("dropdown_show");
    searchBlock.classList.remove("clicked");
    event.stopPropagation();
};

let currencyPanelOpened = false;
let currencyBtn = document.getElementById("currency_btn");
currencyBtn.onclick = function() {
    body.classList.toggle("dropdown_show");
    currencyBtn.classList.toggle("clicked");
    currencyPanelOpened = true;
    event.stopPropagation();
};

body.onclick = function() {
    if(currencyPanelOpened === true) {
        body.classList.remove("dropdown_show");
        currencyBtn.classList.remove("clicked");
        currencyPanelOpened = false;
    }
}