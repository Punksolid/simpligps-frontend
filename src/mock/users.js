// import Mock from 'mockjs'

export default {
  createUser: () => ({
    data: {
      'id': 1,
      'name': 'Alvah Aufderhar',
      'lastname': 'default',
      'email': 'commodijohann32@example.com',
      'username': 'defaultx'
    }
  }),
  logout: () => 'success',
  updateSettings: () => ({
    data: {
      'name': 'Jose Palazuelos'
    }
  }),
  changePassword: () => ({
    data: {
      'message': 'Updated Succesfully'
    }
  }),
  userList: () => ({
    data: [{
      'name': 'Allah Akhbar',
      'lastname': 'default',
      'email': 'commodijohann32@example.com',
      'username': 'defaultx'
      },
      {
        'name': 'Liliane Weimann',
        'lastname': 'default',
        'email': 'molestiaecrawford.kunde@example.org',
        'username': 'defaultx'
      },
      {
        'name': 'aaa Weimann',
        'lastname': 'default',
        'email': 'molestiaecrdddawford.kunde@example.org',
        'username': 'defaultx'
      }
    ]
  })
}
