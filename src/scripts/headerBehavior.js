;(() => {
  window.addEventListener('DOMContentLoaded', () => {
    let directionScroll = []
    document.addEventListener('scroll', (e) => {
      directionScroll.push(window.pageYOffset)
      if (directionScroll[0] < directionScroll[1] && window.pageYOffset > 200) {
        directionScroll = directionScroll.slice(0, 0)
        document.querySelector('.header__row:nth-child(2)').classList.add('header__row--hidden')
      }
      if (directionScroll[0] > directionScroll[1]) {
        directionScroll = directionScroll.slice(0, 0)
        document.querySelector('.header__row:nth-child(2)').classList.remove('header__row--hidden')
      }
    })

    const searchBtn = document.querySelector('.header-icons__link--search')
    searchBtn.addEventListener('click', () => {
      searchBtn.closest('.header-icons__item').querySelector('svg').style.display = 'none'
      searchBtn.closest('.header-icons__item').querySelector('.header-icons__search').style.display = 'block'
    })
    document.addEventListener('click', (e) => {
      const container = document.querySelector('.header-icons__item')
      if (
        e.target !== container &&
        e.target.closest('.header-icons__item') === null &&
        e.target !== searchBtn &&
        e.target.closest('.header-icons__link--search') === null
      ) {
        searchBtn.closest('.header-icons__item').querySelector('svg').style.display = 'block'
        searchBtn.closest('.header-icons__item').querySelector('.header-icons__search').style.display = 'none'
      }
    })
  })
})()
