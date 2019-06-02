
document.getElementById('sidebar').addEventListener('click', clickMenu);
document.getElementById('head').addEventListener('click', clickMenu);

document.querySelectorAll('.closePop').forEach((close) => {
    close.addEventListener('click', closePop);
});

document.querySelector('.p-up-bg .btn-blue').addEventListener('click', () => {
    document.querySelector('.p-up-bg').classList.remove('active');
    document.querySelector('.svg.done').classList.remove('active');
    document.querySelector('.svg.err').classList.remove('active');
});

document.querySelectorAll('.openStatic').forEach((open) => {
    open.addEventListener('click', openStatic);
});

document.querySelectorAll('.btn-bord').forEach(toggle => {
    toggle.addEventListener('click', hiddenForm)
});

function hiddenForm() {
    document.querySelectorAll('.auth').forEach(el => {
        if (el.hasAttribute('hidden')) el.removeAttribute('hidden');
        else (el.setAttribute('hidden', ''))
    });
}

document.querySelector('.Switcher__checkbox').addEventListener('change', () => {
    document.querySelectorAll('.accordion').forEach(el => el.classList.toggle('active'));
    document.querySelectorAll('.ul-2 .it').forEach(el => {
        console.log(el.hasAttribute('expanded'))
        if (el.hasAttribute('expanded')) {
            el.removeAttribute('expanded');
            el.querySelector('.it_con').style.transition = '0';
            el.querySelector('.it_con').style.maxHeight = '0';
        }
    })
});

function accord() {
    let isThis = this.parentElement;
    let tg = isThis.querySelector('.it_con');

    if (isThis.hasAttribute('expanded')) {
        isThis.removeAttribute('expanded');
        tg.style.transition = '250ms';
        tg.style.maxHeight = '0';


    } else {
        isThis.setAttribute('expanded', '');
        tg.style.transition = '300ms';
        tg.style.maxHeight = tg.scrollHeight+'px';
    }
}

document.querySelectorAll('.ul-2 .it header').forEach((it) => {
    it.addEventListener('click', accord)
});


function openStatic() {
    document.querySelectorAll(`.${this.getAttribute('data-target')}`).forEach((it) => {
        it.classList.toggle('active')
    })
}

function closePop(ev) {
    if (!this.hasAttribute('data-fixed')) {
        document.documentElement.classList.remove('fix');
        document.body.classList.remove('fix');
    }
    document.querySelectorAll(`.${this.getAttribute('data-target')}`).forEach((it) => {
        it.classList.remove('active')
    })
}

function clickMenu(ev) {
    ev.preventDefault();

    let tg = ev.target;

    while(tg !== this) {

        let tegName = tg.tagName.toLowerCase();

        if (tegName === 'a'){

            this.classList.remove('active');
            scroll(tg.getAttribute('href'));

            return

        } else if (tegName === 'button') {

            if (tg.getAttribute('data-close')) this.classList.remove('active');

            popUp(tg.getAttribute('data-target'));
            return
        }

        tg = tg.parentElement;
    }

}

function popUp(target) {
    document.documentElement.classList.toggle('fix');
    document.body.classList.toggle('fix');
    document.querySelectorAll('.' + target).forEach((it) => {
        it.classList.toggle('active');
        it.focus();
    });
}

function scroll(target){

    let speed = .35,
        y = window.pageYOffset,
        t = document.querySelector(target) ? document.querySelector(target).getBoundingClientRect().top : 0,
        start = null;

    requestAnimationFrame(step);

    function step(time) {
        if (start === null) start = time;

        let progress = time - start,
            sY = (t < 0 ? Math.max(y - progress/speed, y + t) : Math.min(y + progress/speed, y + t));

        window.scrollTo(0, sY);

        if (sY !== y + t) requestAnimationFrame(step)
    }
}

httpGet('/api/getVerifyAll')
    .then(
        response => document.getElementById('establishCount').innerHTML = `${response.count}<span>/${response.count2}</span>`,
        error => console.log(error)
    );

httpGet('/api/user/count')
    .then(
        response => document.getElementById('userCount').innerHTML = response.count,
        error => console.log(error)
    );

httpGet('/api/getBestVerify')
    .then(
           
        response => {            
            document.getElementById('p_1').innerHTML = response[0].about
            document.getElementById('p_2').innerHTML = response[1].about
            document.getElementById('p_3').innerHTML = response[2].about
            document.getElementById('p_4').innerHTML = response[3].about
            document.getElementById('p_5').innerHTML = response[4].about
            document.getElementById('a_1').href = `https://${response[0].subdomain}.tasteol.com`
            document.getElementById('a_2').href = `https://${response[1].subdomain}.tasteol.com`
            document.getElementById('a_3').href = `https://${response[2].subdomain}.tasteol.com`
            document.getElementById('a_4').href = `https://${response[3].subdomain}.tasteol.com`
            document.getElementById('a_5').href = `https://${response[4].subdomain}.tasteol.com`
            document.getElementById('av_1').src = response[0].av.fileName
            document.getElementById('av_2').src = response[1].av.fileName
            document.getElementById('av_3').src = response[2].av.fileName
            document.getElementById('av_4').src = response[3].av.fileName
            document.getElementById('av_5').src = response[4].av.fileName
            document.getElementById('img_1').src = response[0].av.avatar
            document.getElementById('img_2').src = response[1].av.avatar
            document.getElementById('img_3').src = response[2].av.avatar
            document.getElementById('img_4').src = response[3].av.avatar
            document.getElementById('img_5').src = response[4].av.avatar
            $('.owl-carousel').owlCarousel({
                loop:true,
                margin:0,
                dotsContainer: '.indicators',
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                responsive:{
                    0:{
                        items:1
                    }
                },
                onTranslated:callback,
                onDragged: callback
            
            });       
        },
        error => console.log(error)
    );


function httpGet(url) {

    return new Promise((resolve, reject) => {

        let req = new XMLHttpRequest();
        req.open('GET', url, true);

        req.onload = function() {
            if (this.status === 200) {
                resolve(JSON.parse(this.response))
            } else {
                let error = new ErrorEvent(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        req.onerror = function () {
            reject(new Error("Network Error"));
        };

        req.send()
    })
}

function callback(ev) {
    let index = ev.page.index;

    addRemoveClass('.zv-d', index);
    addRemoveClass('.btn-zv', index);
}

function addRemoveClass(selector, ind) {
    document.querySelectorAll(selector).forEach((el, i) => {
        if (ind === i) el.classList.add('active');
        else el.classList.remove('active');
    })
}

let authForm = document.getElementById('authorization');

authForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    fetch(authForm.getAttribute('action'), {
        method : "POST",
        body: new FormData(authForm),
    })
        .then(
            response => response.json(),
            error => console.log(error)
        )
        .then(
            response => window.location = window.location.href = response._id
        )
        .catch(alert);

});

let regForm = document.getElementById("signup");

document.getElementById('signup').addEventListener('submit', (ev) => {
    ev.preventDefault();

    fetch(regForm.getAttribute('action'), {
        method : "POST",
        body: new FormData(regForm),
    })
        .then(
            response => response.json(),
            error => console.log(error)
        )
        .then(
            response => signup(response),
        )
        .catch(alert);
});


function signup(res) {
    let msg = document.querySelector('.mail');
    if(res.login) {
        document.querySelector('.svg.done').classList.add('active');
        msg.innerHTML = `Вітаємо! На пошту ${res.login} було відправлено пароль`;
        hiddenForm();

        authForm.querySelector('[type=email]').value = res.login;
        authForm.querySelector('[type=password]').value = '';
    } else {
        document.querySelector('.svg.err').classList.add('active');
        msg.innerHTML = `Логін вже існує!`;
    }
    regForm.querySelectorAll('.inp-pop').forEach(el => el.value = '');
    document.querySelector('.p-up-bg').classList.add('active');
}


