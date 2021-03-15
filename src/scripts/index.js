import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
;(() => {
  window.addEventListener('DOMContentLoaded', () => {
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
    initSliderGoods()
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
  })
})()
