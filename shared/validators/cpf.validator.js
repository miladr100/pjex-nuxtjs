export const cpf = (cpf = '') => {
  const num = cpf.replace(/[^\d]+/g, '')
  if (num && num.length === 11) {
    if (
      !num ||
      num.length !== 11 ||
      num === '00000000000' ||
      num === '11111111111' ||
      num === '22222222222' ||
      num === '33333333333' ||
      num === '44444444444' ||
      num === '55555555555' ||
      num === '66666666666' ||
      num === '77777777777' ||
      num === '88888888888' ||
      num === '99999999999'
    ) {
      return false
    }

    let soma = 0

    let resto

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(num.substring(i - 1, i)) * (11 - i)
    }

    resto = (soma * 10) % 11

    if (resto === 10 || resto === 11) {
      resto = 0
    }
    if (resto !== parseInt(num.substring(9, 10))) {
      return false
    }
    soma = 0
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(num.substring(i - 1, i)) * (12 - i)
    }
    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) {
      resto = 0
    }
    if (resto !== parseInt(num.substring(10, 11))) {
      return false
    }
    return true
  }
  return false
}

export default cpf
