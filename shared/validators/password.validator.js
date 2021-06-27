export const password = (password) => {
  // eslint-disable-next-line prefer-regex-literals
  const pattern = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&_=`´~;:><.,"\$\*\(\)\-\+\^\{\}\?\/\[\]])(?=.{8,})/
  )
  return password ? pattern.test(password) : true
}

export default password
