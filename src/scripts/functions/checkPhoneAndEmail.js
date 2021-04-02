import IMask from 'imask'

export default function () {
  document.querySelectorAll('[data-type="tel"]').forEach((item) => {
    const telMask = IMask(item, {
      mask: '+{7} 000 000 00 00'
    })

    let flagInput = true
    item.addEventListener('input', (e) => {
      if ((e.target.value === '+7 8' || e.target.value === '+7') && flagInput === true) {
        e.target.value = '+7'
        telMask.masked.reset()
        telMask.value = '+7'
        flagInput = false
      } else if (e.target.value === '') {
        flagInput = true
      }
    })

    /* Добавление и удаление класса при снятии фокуса с data-type="tel" */
    telMask.on('accept', function () {
      item.classList.remove('input-border')
    })
    telMask.on('complete', function () {
      item.classList.add('input-border')
    })
  })

  const pattern = /^[a-z0-9_.-]+@[a-z0-9_.-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i

  /* Добавление класса при снятии фокуса с data-type="email" */
  const emailInput = document.querySelectorAll('input[data-type="email"]')
  emailInput.forEach((item) => {
    item.addEventListener('blur', function () {
      if (item.value !== '') {
        if (item.value.search(pattern) === 0) {
          item.classList.remove('input-err')
          item.classList.add('input-border')
        } else {
          item.classList.add('input-err')
          item.classList.remove('input-border')
        }
      } else {
        item.classList.remove('input-err')
        item.classList.remove('input-border')
      }
    })
  })
}
