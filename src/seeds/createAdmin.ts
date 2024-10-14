import { userService } from '~/services/User.services'

const createAdminUser = async () => {
  const existingAdmin = await userService.getUserByRole({
    role: 'admin'
  })

  if (existingAdmin.length === 0) {
    await userService.createUser({
      user: {
        name: 'Admin User',
        role: 'admin',
        email: `${process.env.LABIF_ADMIN_EMAIL}`,
        password: `${process.env.LABIF_ADMIN_PSWD}`,
        userType: 'Outros'
      }
    })
    console.log('Admin user created!')
    return
  }
}

export default createAdminUser
