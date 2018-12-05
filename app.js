//model

const cats = [
    cat1 = {
        name: 'Aisel',
        img: 'img/cat01.jpg',
        counter: 5
    },

    cat2 = {
        name: 'Serhan',
        img: 'img/cat02.jpg',
        counter: 100
    },

    cat3 = {
        name: 'Esra',
        img: 'img/cat03.jpg',
        counter: 555
    },

    cat4 = {
        name: 'Neni',
        img: 'img/cat04.jpg',
        counter: 12
    }
]



//view

// main cat view (left-side)

const catView = (function (DOM_Element) {

    const catDisplay = DOM_Element;

    function init() {
        catDisplay.addEventListener('click', octopus.catWasClicked);
    }

    function render(cat) {
        catDisplay.innerHTML = `
            <div class='entry-body'>
                <img src='${cat.img}' class='cat-img'/>
                <h2 class='cat-name'>${cat.name}</h2>
            </div> 
            <h2>Clicked: <span class="click-count">${cat.counter}</span>
        `;
    };

    return {
        init,
        render
    } 

})(document.querySelector('.cat-entry'));


// cats list (right side)

const listView = (function(DOM_Element) {

    const listDisplay = DOM_Element;

    function init() {
        listDisplay.addEventListener('click', function(e) {
            octopus.updateCurrentCat(e.target.textContent);
            console.log('octopus:', octopus);
        });
    }


    function render(array) {
        listDisplay.innerHTML = "";
        array.forEach((cat) => {
            listDisplay.innerHTML += '<li class="cat_list_item">'+ cat.name + '</li>';
            console.log('catForEach:', cat);
        });
    }

    return {
        render,
        init
    }


})(document.querySelector('.cat_list_ul'));


//controller

const octopus = (function(){

    selectedCat = cats[0];
    

    function init(){
        catView.init();
        listView.init();
        catView.render(selectedCat);
        listView.render(cats);
        console.log('listView:', listView.render(cats));
        console.log('catView:', catView.render(selectedCat));

    }

    function updateCurrentCat(name) {
        selectedCat = cats.find((cat) => {
            return cat.name === name;
        });
        selectedCat.selected = true;
        catView.render(selectedCat);
    }

    function catWasClicked() {
        selectedCat.counter++;
        catView.render(selectedCat)
    }
    
    return {
        init,
        catWasClicked,
        updateCurrentCat
    }

})();

document.addEventListener('DOMContentLoaded', octopus.init);



