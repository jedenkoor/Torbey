;(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('.header-icons__link--search')
    searchBtn.addEventListener('click', () => {
      searchBtn.querySelector('svg').style.display = 'none'
      searchBtn.querySelector('.header-icons__search').style.display = 'block'
    })
    document.addEventListener('click', (e) => {
      const container = document.querySelector('.header-icons__search')
      if (
        e.target !== container &&
        e.target.closest('.header-icons__search') === null &&
        e.target !== searchBtn &&
        e.target.closest('.header-icons__link--search') === null
      ) {
        searchBtn.querySelector('svg').style.display = 'block'
        searchBtn.querySelector('.header-icons__search').style.display = 'none'
      }
    })
  })
})()
