'use strict'

let button = document.querySelector('#menu');
let dropdown = document.querySelector('#dropdown');
let drop = document.querySelectorAll('.drop');

button.addEventListener('click', function () {
    dropdown.classList.toggle('slide');
    for (let i = 0; i < drop.length; i++) {
        drop[i].classList.toggle('slide');
    }
});

