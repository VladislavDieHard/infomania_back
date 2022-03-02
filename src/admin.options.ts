import { User } from './user/user.entity';
import * as bcrypt from 'bcrypt'
import { UserRoleType } from './user/user-role.type';
import { Department } from './department/department.entity';

const adminOptions = {
    rootPath: '/admin',
    resources: [{
      resource: User,
      options: {
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          password: {
            type: 'string',
            isVisible: {
              list: false, edit: true, filter: false, show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  password: await bcrypt.hash(request.payload.password, 10),
                }
              }
              return request
            },
          },
          edit: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  password: await bcrypt.hash(request.payload.password, 10),
                }
              }
              return request
            }
          }
        }
      }
    },
      Department
    ],
    branding: {
      softwareBrothers: false,
      companyName: 'Infomania admin',
      favicon: '/logo.png',
      logo: '/logo.png'
    }
}

const adminAuth = {
  authenticate: async (email, password) => {
    const user = await User.findOne({ username: email })
    if (!user && user.role !== UserRoleType.Admin && !user.isActive) return null
    if (!bcrypt.compareSync(password, user.password)) return null
    return {email: user.username, password: user.password}
  },
  cookieName: 'ssid',
  cookiePassword: 'ssid_p',
}

export { adminOptions, adminAuth }