



window.addEventListener("DOMContentLoaded", function() {

    'use strict';

    let input = document.querySelector("input"),
        maska = "+7 (___) ___-____";

    input.value = maska;

    input.addEventListener("input", mask);

    
     
    function mask() {
        let i = 0,
            constant = maska.replace(/\D/g, ""),
            inputValue = this.value.replace(/\D/g, "");

        if (constant.length >= inputValue.length) inputValue = constant;

        this.value = maska.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < inputValue.length ? inputValue.charAt(i++) : i >= inputValue.length ? "" : a            
        });             
    };
});