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
                    break;
                }
            }
        }
    });

    // Timer

    let deadline = '2018-11-28';

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

    //Плавный скрол по сайту при клике по меню

    let linkMenu = document.querySelectorAll('[href^="#"]'), 
        speed = 0.7; 
    for (let i = 0; i < linkMenu.length; i++) {
        linkMenu[i].addEventListener('click', function (event) { 
            event.preventDefault();
            let widthTop = document.documentElement.scrollTop, 
                hash = this.href.replace(/[^#]*(.*)/, '$1'),
                toBlock = document.querySelector(hash).getBoundingClientRect().top, 
                start = null;
            requestAnimationFrame(step); 
            function step(time) {
                if (start === null) start = time;
                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));
                document.documentElement.scrollTo(0, r);
                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash 
                }
            }

        }, false);
    }
});