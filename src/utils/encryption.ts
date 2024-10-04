import bcrypt from 'bcrypt'

export const encryptPwd = (pwd: string) => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)

  const hashedPassword = bcrypt.hashSync(pwd, salt)

  return hashedPassword
}
