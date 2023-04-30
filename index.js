window.isiOS = !1;
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.isiOS = !0
}
window.isiOSVersion = '';
if (window.isiOS) {
    var version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (version !== null) {
        window.isiOSVersion = [parseInt(version[1], 10), parseInt(version[2], 10), parseInt(version[3] || 0, 10)]
    }
}
function t_throttle(fn, threshhold, scope) {
    var last;
    var deferTimer;
    threshhold || (threshhold = 250);
    return function() {
        var context = scope || this;
        var now = +new Date();
        var args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}
function t142_checkSize(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var button = rec.querySelector('.t142__submit');
    if (!button)
        return;
    var buttonStyle = getComputedStyle(button, null);
    var buttonPaddingTop = parseInt(buttonStyle.paddingTop) || 0;
    var buttonPaddingBottom = parseInt(buttonStyle.paddingBottom) || 0;
    var buttonHeight = button.clientHeight - (buttonPaddingTop + buttonPaddingBottom) + 5;
    var textHeight = button.scrollHeight;
    if (buttonHeight < textHeight) {
        button.classList.add('t142__submit-overflowed')
    }
}
function t702_initPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t702');
    if (!container)
        return;
    rec.setAttribute('data-animationappear', 'off');
    rec.setAttribute('data-popup-subscribe-inited', 'y');
    rec.style.opacity = 1;
    var documentBody = document.body;
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var analitics = popup.getAttribute('data-track-popup');
    var popupCloseBtn = popup.querySelector('.t-popup__close');
    var hrefs = rec.querySelectorAll('a[href*="#"]');
    var submitHref = rec.querySelector('.t-submit[href*="#"]');
    if (popupTooltipHook) {
        var recBlocks = document.querySelectorAll('.r');
        for (var i = 0; i < recBlocks.length; i++) {
            recBlocks[i].addEventListener('click', function(event) {
                var target = event.target;
                var href = target.closest('a[href="' + popupTooltipHook + '"]') ? target : !1;
                if (!href)
                    return;
                event.preventDefault();
                t702_showPopup(recId);
                t702_resizePopup(recId);
                t702__lazyLoad();
                if (analitics) {
                    Tilda.sendEventToStatistics(analitics, popupTooltipHook)
                }
            })
        }
    }
    popup.addEventListener('scroll', t_throttle(function() {
        t702__lazyLoad()
    }));
    popup.addEventListener('click', function(event) {
        var windowWithoutScrollBar = window.innerWidth - 17;
        if (event.clientX > windowWithoutScrollBar)
            return;
        if (event.target === this)
            t702_closePopup()
    });
    popupCloseBtn.addEventListener('click', t702_closePopup);
    if (submitHref) {
        submitHref.addEventListener('click', function() {
            if (documentBody.classList.contains('t-body_scroll-locked')) {
                documentBody.classList.remove('t-body_scroll-locked')
            }
        })
    }
    for (var i = 0; i < hrefs.length; i++) {
        hrefs[i].addEventListener('click', function() {
            var url = this.getAttribute('href');
            if (!url || url.substring(0, 7) != '#price:') {
                t702_closePopup();
                if (!url || url.substring(0, 7) == '#popup:') {
                    setTimeout(function() {
                        documentBody.classList.add('t-body_popupshowed')
                    }, 300)
                }
            }
        })
    }
}
function t702_lockScroll() {
    var documentBody = document.body;
    if (!documentBody.classList.contains('t-body_scroll-locked')) {
        var bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || documentBody.parentNode || documentBody).scrollTop;
        documentBody.classList.add('t-body_scroll-locked');
        documentBody.style.top = '-' + bodyScrollTop + 'px';
        documentBody.setAttribute('data-popup-scrolltop', bodyScrollTop)
    }
}
function t702_unlockScroll() {
    var documentBody = document.body;
    if (documentBody.classList.contains('t-body_scroll-locked')) {
        var bodyScrollTop = documentBody.getAttribute('data-popup-scrolltop');
        documentBody.classList.remove('t-body_scroll-locked');
        documentBody.style.top = null;
        documentBody.removeAttribute('data-popup-scrolltop');
        document.documentElement.scrollTop = parseInt(bodyScrollTop)
    }
}
function t702_showPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t702');
    if (!container)
        return;
    var popup = rec.querySelector('.t-popup');
    var popupContainer = popup.querySelector('.t-popup__container');
    var range = rec.querySelector('.t-range');
    var documentBody = document.body;
    popup.style.display = 'block';
    if (range)
        t702__triggerEvent(range, 'popupOpened');
    setTimeout(function() {
        popupContainer.classList.add('t-popup__container-animated');
        popup.classList.add('t-popup_show')
    }, 50);
    documentBody.classList.add('t-body_popupshowed');
    documentBody.classList.add('t702__body_popupshowed');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream && window.isiOSVersion && window.isiOSVersion[0] === 11) {
        setTimeout(function() {
            t702_lockScroll()
        }, 500)
    }
    document.addEventListener('keydown', t702_escClosePopup);
    t702__lazyLoad()
}
function t702_escClosePopup(event) {
    if (event.key === 'Escape')
        t702_closePopup()
}
function t702_closePopup() {
    var popupAll = document.querySelectorAll('.t-popup');
    document.body.classList.remove('t-body_popupshowed');
    document.body.classList.remove('t702__body_popupshowed');
    for (var i = 0; i < popupAll.length; i++) {
        popupAll[i].classList.remove('t-popup_show')
    }
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream && window.isiOSVersion && window.isiOSVersion[0] === 11) {
        t702_unlockScroll()
    }
    setTimeout(function() {
        var popupHide = document.querySelectorAll('.t-popup:not(.t-popup_show)');
        for (var i = 0; i < popupHide.length; i++) {
            popupHide[i].style.display = 'none'
        }
    }, 300);
    document.removeEventListener('keydown', t702_escClosePopup)
}
function t702_resizePopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var popupContainer = rec.querySelector('.t-popup__container');
    if (!popupContainer)
        return;
    var popupStyle = getComputedStyle(popupContainer, null);
    var popupPaddingTop = parseInt(popupStyle.paddingTop) || 0;
    var popupPaddingBottom = parseInt(popupStyle.paddingBottom) || 0;
    var popupHeight = popupContainer.clientHeight - (popupPaddingTop + popupPaddingBottom);
    if (popupHeight > (window.innerHeight - 120)) {
        popupContainer.classList.add('t-popup__container-static')
    } else {
        popupContainer.classList.remove('t-popup__container-static')
    }
}
function t702_sendPopupEventToStatistics(popupName) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupName.substring(0, 7) == '#popup:') {
        popupName = popupName.substring(7)
    }
    virtPage += popupName;
    virtTitle += popupName;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    'hitType': 'pageview',
                    'page': virtPage,
                    'title': virtTitle
                })
            }
        }
        if (window.mainMetrika && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}
function t702_onSuccess(form) {
    if (!(form instanceof Element))
        form = form[0];
    var inputsWrapper = form.querySelector('.t-form__inputsbox');
    var inputsWrapperStyle = getComputedStyle(inputsWrapper, null);
    var inputsWrapperPaddingTop = parseInt(inputsWrapperStyle.paddingTop) || 0;
    var inputsWrapperPaddingBottom = parseInt(inputsWrapperStyle.paddingBottom) || 0;
    var inputsWrapperHeight = inputsWrapper.clientHeight - (inputsWrapperPaddingTop + inputsWrapperPaddingBottom);
    var inputsOffset = inputsWrapper.getBoundingClientRect().top + window.pageYOffset;
    var inputsBottom = inputsWrapperHeight + inputsOffset;
    var successBox = form.querySelector('.t-form__successbox');
    var successBoxOffset = successBox.getBoundingClientRect().top + window.pageYOffset;
    var target = 0;
    var windowHeight = window.innerHeight;
    var body = document.body;
    var html = document.documentElement;
    var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    if (window.innerWidth > 960) {
        target = successBoxOffset - 200
    } else {
        target = successBoxOffset - 100
    }
    var tildaLabel = document.querySelector('.t-tildalabel');
    if (successBoxOffset > window.scrollY || (documentHeight - inputsBottom) < (windowHeight - 100)) {
        inputsWrapper.classList.add('t702__inputsbox_hidden');
        setTimeout(function() {
            if (windowHeight > documentHeight && tildaLabel) {
                t702__fadeOut(tildaLabel)
            }
        }, 300)
    } else {
        t702__scroll(target);
        setTimeout(function() {
            inputsWrapper.classList.add('t702__inputsbox_hidden')
        }, 400)
    }
    var successUrl = $(form).data('success-url');
    if (successUrl) {
        setTimeout(function() {
            window.location.href = successUrl
        }, 500)
    }
}
function t702__fadeOut(el) {
    if (el.style.display === 'none')
        return;
    var opacity = 1;
    var timer = setInterval(function() {
        el.style.opacity = opacity;
        opacity -= 0.1;
        if (opacity <= 0.1) {
            clearInterval(timer);
            el.style.display = 'none';
            el.style.opacity = null
        }
    }, 50)
}
function t702__scroll(target) {
    var duration = 400;
    var start = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
    var change = target - start;
    var currentTime = 0;
    var increment = 16;
    document.body.setAttribute('data-scrollable', 'true');
    function t702__easeInOutCubic(currentTime) {
        if ((currentTime /= duration / 2) < 1) {
            return change / 2 * currentTime * currentTime * currentTime + start
        } else {
            return change / 2 * ((currentTime -= 2) * currentTime * currentTime + 2) + start
        }
    }
    function t702__animateScroll() {
        currentTime += increment;
        window.scrollTo(0, t702__easeInOutCubic(currentTime));
        if (currentTime < duration) {
            setTimeout(t702__animateScroll, increment)
        } else {
            document.body.removeAttribute('data-scrollable')
        }
    }
    t702__animateScroll()
}
function t702__lazyLoad() {
    if (window.lazy === 'y' || document.getElementById('allrecords').getAttribute('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function() {
            t_lazyload_update()
        })
    }
}
function t702__triggerEvent(el, eventName) {
    var event;
    if (typeof window.CustomEvent === 'function') {
        event = new CustomEvent(eventName)
    } else if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, !0, !1)
    } else if (document.createEventObject) {
        event = document.createEventObject();
        event.eventType = eventName
    }
    event.eventName = eventName;
    if (el.dispatchEvent) {
        el.dispatchEvent(event)
    } else if (el.fireEvent) {
        el.fireEvent('on' + event.eventType, event)
    } else if (el[eventName]) {
        el[eventName]()
    } else if (el['on' + eventName]) {
        el['on' + eventName]()
    }
}
