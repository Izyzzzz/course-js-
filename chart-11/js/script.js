window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    // Получение объектов манипуляции для табов.
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    // Функция скрытия табов
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);


    // Функция отображения таба переданых в нее.
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    // Обработщик клика на табам
    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    moreTabs(i);
                    break;
                }
            }
        }
    });

    // Timer

    let deadline = '2018-12-29';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function plusZero(times) {
        times < 10 ? times = '0' + times : times;
        return times;
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');

        let timeInterval = setTimeout(function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = plusZero(t.hours);
            minutes.textContent = plusZero(t.minutes);
            seconds.textContent = plusZero(t.seconds);

            if (t.hours <= 0 && t.minutes <= 0 && t.seconds <= 0) {
                stop();
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
            setTimeout(updateClock, 1000);
        });

        function stop() {
            clearTimeout(timeInterval);
        }

    }

    setClock('timer', deadline);

    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descrbtn = document.querySelectorAll('.description-btn');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    moreTabs(0);

    function moreTabs(d) {
        descrbtn[d].addEventListener('click', function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    }


    // Form

    let message = {
        loading: '<img src = "img/ajax-loader.gif" />',
        success: '<img src = "img/ok.png" />',
        failure: '<img src = "img/confused.png" />'
    };

    let form = document.querySelector('.main-form'),
        formCont = document.querySelector('#form'),        
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    let popapClose = document.querySelector('.popup-close');

    popapClose.addEventListener ('click', function() {
        form.removeChild(statusMessage);
    });
    
    [form, formCont].forEach(function (item) {
        item.addEventListener('submit', function(event) {
            event.preventDefault();
            item.appendChild(statusMessage);

            let input = item.getElementsByTagName('input');

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            let formData = new FormData(item);
            request.send(formData);

            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
                
            }
        });
    });

    //Maska

    let input = document.querySelectorAll('input[type="tel"]'),
        maska = "+7 (___) ___-____";

    for (let i=0; i<input.length; i++) {
        input[i].addEventListener("input", mask);
    }
    
     
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