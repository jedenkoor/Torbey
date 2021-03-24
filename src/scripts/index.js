import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
import noUiSlider from 'noUiSlider/distribute/nouislider.min.js'
import 'noUiSlider/distribute/nouislider.min.css'
import checkPhoneAndEmail from './functions/checkPhoneAndEmail.js'
import numberFormat from './functions/numberFormat.js'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'
;(() => {
  window.addEventListener('DOMContentLoaded', () => {
    // Load opacity
    setTimeout(() => {
      document.querySelector('body').style.opacity = 1
    }, 300)

    // Click checkboxes
    const labels = document.querySelectorAll('label[for]')
    if (labels.length) {
      labels.forEach((item) => {
        item.addEventListener('keyup', (e) => {
          if (e.keyCode === 13) {
            e.preventDefault()
            item.click()
          }
        })
        item.addEventListener('click', (e) => {
          const id = item.getAttribute('for')
          const elemId = document.getElementById(id)
          e.preventDefault()
          if (elemId.checked) {
            if (elemId.getAttribute('type') !== 'radio') {
              elemId.checked = false
            }
          } else {
            elemId.checked = true
          }
        })
      })
    }

    // Select input on focus
    const inputs = document.querySelectorAll('input')
    if (inputs.length) {
      inputs.forEach((item) => {
        item.addEventListener('focus', function () {
          this.select()
        })
      })
    }

    // Goods slider
    if (document.querySelectorAll('.goods-slider__container').length) {
      initSliderGoods()
    }
    function initSliderGoods() {
      const swiper = new Swiper('.goods-slider__container', {
        speed: 500,
        freeMode: true,
        spaceBetween: 24,
        slidesPerView: 3,
        slideToClickedSlide: true
      })
      setTimeout(function () {
        swiper.update()
      }, 300)
    }

    // Reviews slider
    if (document.querySelectorAll('.reviews__content').length) {
      initSliderReviews()
    }
    function initSliderReviews() {
      const galleryThumbs = new Swiper('.reviews__authors', {
        spaceBetween: 24,
        slidesPerView: 'auto',
        slidesOffsetAfter: 64,
        navigation: {
          prevEl: '.reviews__col .swiper-button-prev',
          nextEl: '.reviews__col .swiper-button-next'
        }
      })

      ;(() =>
        new Swiper('.reviews__content', {
          effect: 'fade',
          allowTouchMove: false,
          thumbs: {
            swiper: galleryThumbs,
            autoScrollOffset: 1
          }
        }))()
    }

    // Hide reviews
    const reviewsRates = document.querySelectorAll('.rate')
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
    if (formInputs.length) {
      const formCurrentBlock = document.querySelector('.form-select__current')
      const formCurrentLabel = formCurrentBlock.querySelector('label')
      formInputs.forEach((item) => {
        item.addEventListener('click', () => {
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
    const selectBtn = document.querySelectorAll('.select-open')
    const selectItem = document.querySelectorAll('.select-item')
    if (selectBtn.length) {
      selectBtn.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault()
          toggleOptions(item)
        })
        document.addEventListener('click', (e) => {
          const container = document.querySelector('.select-block')
          if (
            e.target !== container &&
            e.target.closest('.select-block') === null &&
            e.target !== item
          ) {
            item.classList.remove('active')
            item
              .closest('.select')
              .querySelector('.select-block')
              .classList.remove('active')
          }
        })
      })
      selectItem.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault()
          toggleOptions(item.closest('.select').querySelector('.select-open'))
        })
      })
    }
    function toggleOptions(btn) {
      btn.classList.toggle('active')
      btn
        .closest('.select')
        .querySelector('.select-block')
        .classList.toggle('active')
    }

    // Init price range slider
    const priceSliders = document.querySelectorAll('.price-slider')
    if (priceSliders.length) {
      priceSliders.forEach((item) => {
        const min = +item.getAttribute('data-min')
        const max = +item.getAttribute('data-max')
        const minInput = item.nextSibling.querySelector('.price-slider-from')
        const maxInput = item.nextSibling.querySelector('.price-slider-to')
        noUiSlider.create(item, {
          start: [min, max],
          step: 100,
          connect: true,
          range: {
            min: [min],
            max: [max]
          },
          format: {
            to: function (value) {
              return numberFormat(Math.round(value))
            },
            from: function (value) {
              return value
            }
          }
        })

        item.noUiSlider.on('update', function (values, handle) {
          ;(handle ? maxInput : minInput).value = values[handle]
        })

        minInput.addEventListener('change', function () {
          this.value = numberFormat(this.value)
          item.noUiSlider.set([this.value.replace(/\s/g, ''), null])
        })

        minInput.addEventListener('focus', function () {
          this.select()
        })

        maxInput.addEventListener('change', function () {
          this.value = numberFormat(this.value)
          item.noUiSlider.set([null, this.value.replace(/\s/g, '')])
        })
      })
    }

    // Good slider
    if (document.querySelectorAll('.good-content__slider').length) {
      initSliderGood()
    }
    function initSliderGood() {
      const galleryThumbs = new Swiper('.good-content__thumbs', {
        spaceBetween: 24,
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
          prevEl: '.good-content__wrap .swiper-button-prev',
          nextEl: '.good-content__wrap .swiper-button-next'
        }
      })

      ;(() =>
        new Swiper('.good-content__slider', {
          effect: 'fade',
          thumbs: {
            swiper: galleryThumbs,
            autoScrollOffset: 1
          }
        }))()
    }

    // Lightbox
    if (document.querySelectorAll('.glightbox').length) {
      ;(() =>
        new GLightbox({
          selector: '.glightbox'
        }))()
    }

    // Tabs
    if (document.querySelectorAll('.tabs').length) {
      const allTabsNavigationItems = document.querySelectorAll('.tabs__btn')
      allTabsNavigationItems.forEach((item) =>
        item.addEventListener('click', tabChange)
      )
    }

    function tabChange(e) {
      e.preventDefault()
      const tabDataAttr = e.target.getAttribute('data-tab')
      const tabContainers = e.target
        .closest('.tabs')
        .querySelectorAll('.tabs__container')
      const tabNavigationItem = e.target
        .closest('.tabs')
        .querySelectorAll('.tabs__btn')

      tabContainers.forEach((item) => {
        item.classList.remove('tabs__container--active')
        if (item.getAttribute('data-tab') === tabDataAttr) {
          item.classList.add('tabs__container--active')
        }
      })

      tabNavigationItem.forEach((item) => {
        if (item.getAttribute('data-tab') !== tabDataAttr) {
          item.classList.remove('tabs__btn--active')
        }
      })

      e.target.classList.add('tabs__btn--active')
    }

    // Achievements slider
    if (document.querySelectorAll('.achievements__slider').length) {
      initSliderAchieve()
    }
    function initSliderAchieve() {
      const swiper = new Swiper('.achievements__slider', {
        freeMode: true,
        spaceBetween: 24,
        slidesPerView: 'auto',
        watchSlidesVisibility: true
      })
      setTimeout(function () {
        swiper.update()
      }, 300)
    }
  })
})()
