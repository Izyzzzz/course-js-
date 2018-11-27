let btn = document.querySelector('.btn'),
    elem = document.querySelector('.circle'),
    wrap = document.querySelectorAll('.wrapper'),
    pos = 0,
    pos2 = 0;

function animation() {
    if (pos <= wrap[0].clientHeight - 10) {
        pos++;
        elem.style.top = pos + 'px';
        elem.style.left = pos + 'px';
    } else {
        pos = 0; 
    }
    requestAnimationFrame(animation);

}
btn.addEventListener('click', function () {
    requestAnimationFrame(animation);
});
