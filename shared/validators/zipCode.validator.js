export const zipCode = (cep) => {
  const cepRep = cep.replace(/\D/g, '')
  if (cepRep === '') return false
  const regexValidaCep = /^[0-9]{8}$/
  const regexIsRepeted = /^(.)\1+$/
  if (regexIsRepeted.test(cepRep)) return false
  if (!regexValidaCep.test(cepRep)) return false
  return true
}

export default zipCode
