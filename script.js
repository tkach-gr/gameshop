let body = document.getElementsByTagName("body")[0];

let galleryImages = [
    "./images/gallery/dark-souls-3_1.jpg",
    "./images/gallery/dark-souls-3_2.jpg",
    "./images/gallery/dark-souls-3_3.jpg",
    "./images/gallery/dark-souls-3_4.jpg",
    "./images/gallery/dark-souls-3_5.jpg",
    "./images/gallery/dark-souls-3_6.jpg",
    "./images/gallery/dark-souls-3_7.jpg",
    "./images/gallery/dark-souls-3_8.jpg",
    "./images/gallery/dark-souls-3_9.jpg",
    "./images/gallery/dark-souls-3_10.jpg",
];

class Gallery {
    block;
    screen;
    closeBtn;
    imagesList;
    currentIndex;

    mobileSwipeTouch;

    constructor(obj, images) {
        this.block = obj;
        let container = this.findComponentByClass(this.block, "gallery__content");
        this.closeBtn = this.findComponentByClass(this.block, "gallery__close");
        this.screen = this.findComponentByClass(container, "gallery__screen");
        let leftArrow = this.findComponentByClass(this.screen, "gallery__left_arrow");
        let rightArrow = this.findComponentByClass(this.screen, "gallery__right_arrow");
        let list = this.findComponentByClass(container, "gallery__list");
        this.imagesList = this.findComponentByClass(list, "gallery__list_container");

        this.initImagesList(images);
        this.swipeImage(0);
        
        let gallery = this;
        document.body.onresize = function() { gallery.resize(); };
        leftArrow.onclick = function() { gallery.swipeImage(gallery.currentIndex - 1); };
        rightArrow.onclick = function() { gallery.swipeImage(gallery.currentIndex + 1); };
        this.closeBtn.onclick = function() { gallery.close(); };

        return this;
    }
    
    initImagesList(images) {
        let list = this.imagesList.parentElement;
        list.style.height = list.clientWidth / 100 * 9.5625 + "px";

        let imagesItems = this.imagesList.children;
        for(let i = 0; i < imagesItems.length; i++) {
            let gallery = this;
            imagesItems[i].onclick = function() { gallery.swipeImage(i); };

            let style = imagesItems[i].style;
            style.backgroundImage = "url(\"" + images[i] + "\")";
        }

        this.resize();
    }

    resize() {
        if(document.body.clientWidth <= 768) {
            let list = this.imagesList.parentElement;
            list.style.height = document.body.clientWidth * 0.8 / 16 * 9 + "px";
            this.enableSwipes();
        } else {
            let list = this.imagesList.parentElement;
            list.style.height = list.clientWidth / 100 * 9.5625 + "px";
            this.disableSwipes();
        }

        let imagesItems = this.imagesList.children;
        for(let i = 0; i < imagesItems.length; i++) {
            let style = imagesItems[i].style;
            style.flexBasis = (this.imagesList.clientHeight / 9 * 16) + "px";
        }

        this.swipeImage(this.currentIndex);
    }

    swipeImage(index) {
        if(index === undefined) {
            index = 0;
        }

        let imagesItems = this.imagesList.children;
        let length = imagesItems.length;
        index = (index + length) % length;

        if (this.currentIndex != undefined) {
            imagesItems[this.currentIndex].classList.remove("gallery__item-selected");
        }

        this.screen.style.backgroundImage = imagesItems[index].style.backgroundImage;
        imagesItems[index].classList.add("gallery__item-selected");

        let itemWidth = imagesItems[0].clientWidth;
        let marginSize = imagesItems[1].offsetLeft - itemWidth;

        let transformValue  = (itemWidth + marginSize) * -index;

        if(document.body.clientWidth > 768) {
            if (transformValue <= ((itemWidth + marginSize) * -(length - 4))) {
                transformValue = (itemWidth + marginSize) * -(length - 5);
            } else if (transformValue > 0) {
                transformValue = 0;
            }
        } 

        this.imagesList.style.transform = "translateX(" + transformValue + "px)";
        this.currentIndex = index;
    }

    show() {
        this.block.classList.remove("gallery-hidden");
        document.body.style.overflow = "hidden";
    }

    close() {
        this.block.classList.add("gallery-hidden");
        document.body.style.overflow = "visible";
    }

    findComponentByClass(obj, className) {
        let children = obj.children;
        
        for(let i = 0; i < children.length; i++) {
            let child = children[i];

            if (child.classList.contains(className)) {
                return child;
            }
        }
    }

    enableSwipes() {
        let imagesItems = this.imagesList.children;
        for(let i = 0; i < imagesItems.length; i++) {
            imagesItems[i].onclick = function() {};
        }

        this.imagesList.parentElement.addEventListener("touchstart", this.touchStartHandler);
        this.imagesList.parentElement.addEventListener("touchend", this.touchEndHandler);
    }

    disableSwipes() {
        this.imagesList.parentElement.removeEventListener("touchstart", this.touchStartHandler);
        this.imagesList.parentElement.removeEventListener("touchend", this.touchEndHandler);

        let gallery = this;
        let imagesItems = this.imagesList.children;
        for(let i = 0; i < imagesItems.length; i++) {
            imagesItems[i].onclick = function() { gallery.swipeImage(i); };
        }
    }

    touchStartHandler(event) {
        gallery.mobileSwipeTouch = event.changedTouches[0].clientX;
    }

    touchEndHandler(event) {
        let end = event.changedTouches[0].clientX;

        if(gallery.mobileSwipeTouch - end >= 180 
            && gallery.currentIndex + 1 < gallery.imagesList.children.length) {
            
            console.log(gallery.currentIndex + 1)
            gallery.swipeImage(gallery.currentIndex + 1);

        } else if(gallery.mobileSwipeTouch - end <= -180 
            && gallery.currentIndex - 1 >= 0) {

            console.log(gallery.currentIndex - 1);
            gallery.swipeImage(gallery.currentIndex - 1);
        }
    }
}

let poster = document.getElementById("poster");
let galleryBlock = document.getElementsByClassName("gallery")[0];
let gallery = new Gallery(galleryBlock, galleryImages);
poster.onclick = function() { gallery.show() };

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

let description = document.getElementById("description");
let descriptionOpenBtn = document.getElementById("description__open_btn");
let descriptionHiddenContent = document.getElementById("description__hidden_content");

descriptionOpenBtn.onclick = function() {
    console.log("click")
    if(descriptionHiddenContent.classList.contains("hidden")) {
        description.classList.add("opened");
        descriptionHiddenContent.classList.remove("hidden");
        descriptionOpenBtn.textContent = "Свернуть";
    } else {
        description.classList.remove("opened");
        descriptionHiddenContent.classList.add("hidden");
        descriptionOpenBtn.textContent = "Читать дальше";
    }
}

let requirements = document.getElementById("requirements");
let requirementsOpenBtn = document.getElementById("requirements__open_btn");
let requirementsHiddenContent = document.getElementById("requirements__hidden_content");

requirementsOpenBtn.onclick = function() {
    if(requirementsHiddenContent.classList.contains("hidden")) {
        requirements.classList.add("opened");
        requirementsHiddenContent.classList.remove("hidden");
        requirementsOpenBtn.textContent = "Скрыть рекомендуемые";
    } else {
        requirements.classList.remove("opened");
        requirementsHiddenContent.classList.add("hidden");
        requirementsOpenBtn.textContent = "Показать рекомендуемые";
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