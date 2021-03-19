export default function numberFormat(number) {
  return number
    ? new Intl.NumberFormat().format(`${number}`.replace(/[^0-9]/g, ''))
    : 0
}
