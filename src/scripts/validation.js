import checkPhoneAndEmail from './functions/checkPhoneAndEmail.js'
;(() => {
  window.addEventListener('DOMContentLoaded', () => {
    checkPhoneAndEmail()

    /* Добавление класса при снятии фокуса с текстовых инпутов */
    const noTelAndEmailInput = document.querySelectorAll(
      'input:not([data-type="tel"]):not([data-type="email"]), textarea'
    )
    noTelAndEmailInput.forEach((item) => {
      item.addEventListener('blur', function () {
        if (item.value !== '') {
          item.classList.add('input-border')
        } else {
          item.classList.remove('input-border')
        }
      })
    })

    /* Функция валидации */
    function raValidation(form) {
      const inputs = form.querySelectorAll('[data-required]')
      let temp = true
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].classList.contains('input-border')) {
          inputs[i].classList.add('input-err')
          temp = false
        } else {
          inputs[i].classList.remove('input-err')
        }
      }
      if (temp === false) {
        console.warn('Форма заполнена не корректно')
        return false
      } else {
        console.log('Форма отправлена')
        return true
      }
    }

    /* Обработка клика по кнопке отправки формы */
    const submitButton = document.querySelectorAll('button[type="submit"]')
    submitButton.forEach((item) => {
      item.addEventListener('click', function (event) {
        event.preventDefault()
        const form = this.closest('form')
        if (raValidation(form)) {
          form.submit()
          ifSuccess(form)
        }
      })
    })

    /* Функция для success */
    function ifSuccess(form) {
      const inputsAndButton = form.querySelectorAll('input, textarea, button')
      inputsAndButton.forEach((item) => {
        item.classList.remove('input-err')
        item.classList.remove('input-border')
        item.setAttribute('disabled', 'disabled')
      })
      setTimeout(() => {
        inputsAndButton.forEach((item) => {
          item.value = ''
          item.removeAttribute('disabled')
        })
      }, 2000)
    }
  })
})()
