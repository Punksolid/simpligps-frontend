// import Mock from 'mockjs'

export default {
  updateAccessKey: () => ({
    data: {
      'message': 'Wialon Access Key Updated'
    }
  }),
  getAccountsList: () => ({
      data: [
        { id: 1,
          name: 'Sanchez Trucks S.A',
          uuid: 'ABC123'
        },
        { id: 2,
          name: 'Alonzos Trucking',
          uuid: 'ABC123'
        },
        { id: 3,
          name: 'Taxis Company',
          uuid: 'ABC123'
        }
      ] }
  )
}
