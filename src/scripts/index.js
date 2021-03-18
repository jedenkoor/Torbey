import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
import checkPhoneAndEmail from './functions/checkPhoneAndEmail.js'
;(() => {
  window.addEventListener('DOMContentLoaded', () => {
    // Load opacity
    setTimeout(() => {
      document.querySelector('body').style.opacity = 1
    }, 300)

    // Header behavior
    let directionScroll = []
    document.addEventListener('scroll', (e) => {
      directionScroll.push(window.pageYOffset)
      if (directionScroll[0] < directionScroll[1]) {
        directionScroll = directionScroll.slice(0, 0)
        document
          .querySelector('.header__row:nth-child(2)')
          .classList.add('header__row--hidden')
      }
      if (directionScroll[0] > directionScroll[1]) {
        directionScroll = directionScroll.slice(0, 0)
        document
          .querySelector('.header__row:nth-child(2)')
          .classList.remove('header__row--hidden')
      }
    })

    // Goods slider
    if (document.querySelectorAll('.goods-slider__container').length) {
      initSliderGoods()
    }
    function initSliderGoods() {
      ;(() =>
        new Swiper('.goods-slider__container', {
          speed: 500,
          spaceBetween: 24,
          slidesPerView: 3,
          slideToClickedSlide: true,
          lazy: {
            loadPrevNext: true
          }
        }))()
    }

    // Reviews slider
    if (document.querySelectorAll('.reviews__content').length) {
      initSliderReviews()
    }
    function initSliderReviews() {
      const galleryThumbs = new Swiper('.reviews__content', {
        loop: true,
        effect: 'fade',
        slidesPerView: 1,
        allowTouchMove: false
      })

      ;(() =>
        new Swiper('.reviews__authors', {
          loop: true,
          speed: 500,
          spaceBetween: 24,
          slidesPerView: 'auto',
          slideToClickedSlide: true,
          navigation: {
            nextEl: '.reviews__col .swiper-button-next'
          },
          thumbs: {
            swiper: galleryThumbs,
            autoScrollOffset: 1
          }
        }))()
    }

    // Hide reviews
    const reviewsRates = document.querySelectorAll('.reviews-authors__rate')
    if (reviewsRates.length) {
      reviewsRates.forEach((item, index) => {
        const stars = item.querySelectorAll('path')
        const intPart = item.getAttribute('data-rate').split('.')[0]
        let floatPart = item.getAttribute('data-rate').split('.')[1]

        if (floatPart) {
          floatPart = floatPart * 10
          item.querySelector('svg').insertAdjacentHTML(
            'afterbegin',
            `
              <defs>
                <linearGradient id="Gradient${index}">
                  <stop class="stop1" offset="0%"/>
                  <stop class="stop2" offset="${floatPart}%"/>
                  <stop class="stop3" offset="${floatPart}%"/>
                  <stop class="stop4" offset="100%"/>
                </linearGradient>
                <style type="text/css"><![CDATA[
                  .stop1 { stop-color: #DC9360; }
                  .stop2 { stop-color: #DC9360; }
                  .stop3 { stop-color: #fff; }
                  .stop4 { stop-color: #fff; }
                ]]></style>
              </defs>
            `
          )
          if (intPart !== '5') {
            stars[intPart].setAttribute('fill', `url(#Gradient${index})`)
          }
        }

        for (let i = 0; i < intPart; i++) {
          stars[i].setAttribute('fill', '#DC9360')
        }
      })
    }

    // Change form inputs
    const formInputs = document.querySelectorAll('.form-select__item')
    const formCurrentBlock = document.querySelector('.form-select__current')
    const formCurrentLabel = formCurrentBlock.querySelector('label')
    const formCurrentBtn = formCurrentBlock.querySelector('button')
    if (formInputs.length) {
      formInputs.forEach((item) => {
        item.addEventListener('click', () => {
          toggleOptions(formCurrentBtn)
          if (!item.classList.contains('form-select__item--current')) {
            formInputs.forEach((item) => {
              item.classList.remove('form-select__item--current')
            })
            item.classList.add('form-select__item--current')
            document.querySelector('.form-select__current input').remove()

            if (item.getAttribute('data-select') === 'tel') {
              formCurrentBlock.insertAdjacentHTML(
                'afterbegin',
                '<input type="tel" id="form-input" placeholder=" " data-type="tel" data-required="">'
              )
              formCurrentLabel.innerHTML = 'Телефон'
            } else if (item.getAttribute('data-select') === 'email') {
              formCurrentBlock.insertAdjacentHTML(
                'afterbegin',
                '<input type="email" id="form-input" placeholder=" " data-type="email" data-required="">'
              )
              formCurrentLabel.innerHTML = 'E-mail'
            }
            checkPhoneAndEmail()
          }
        })
      })
    }

    // Open/close options
    const showBlockBtn = document.querySelector('.form-select__show')
    if (showBlockBtn) {
      showBlockBtn.addEventListener('click', (e) => {
        e.preventDefault()
        toggleOptions(showBlockBtn)
      })
      document.addEventListener('click', (e) => {
        const container = document.querySelector('.form-select__block')
        if (
          e.target !== container &&
          e.target.closest('.form-select__block') === null &&
          e.target !== showBlockBtn
        ) {
          showBlockBtn.classList.remove('form-select__show--active')
          showBlockBtn
            .closest('.form__select')
            .querySelector('.form-select__block ')
            .classList.remove('form-select__block--active')
        }
      })
    }

    function toggleOptions(btn) {
      btn.classList.toggle('form-select__show--active')
      btn
        .closest('.form__select')
        .querySelector('.form-select__block ')
        .classList.toggle('form-select__block--active')
    }
  })
})()
