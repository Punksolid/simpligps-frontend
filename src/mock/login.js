import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  test: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin Test'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: () => ({
    data: {
      'message': '123123120917348572093570928458273495'
    }
  }),
  //   return userMap[username]
  //     [
  //     'access_token' => $tokenResult->accessToken,
  //     'token_type' => 'Bearer',
  //     'expires_at' => Carbon::parse(
  //     $tokenResult->token->expires_at
  //   )->toDateTimeString()
  // ]
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: function() {
    console.log('LOOOOGGGOUTUUUTT')
    return 'success'
  }
}
