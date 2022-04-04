import axios from 'axios';

export const createOrUpdateUser = async (authtoken) => {
  return await axios( {
    url : `${process.env.REACT_APP_API}/auth/create-or-update`,
    headers : {
      authtoken
    },
    method : 'post'
  })

}

export const currentUser = async (authtoken) => {
  return await axios( {
    url : `${process.env.REACT_APP_API}/auth/current-user`,
    headers : {
      authtoken
    },
    method : 'post'
  })
}