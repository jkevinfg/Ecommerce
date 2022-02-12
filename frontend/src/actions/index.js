export const loginUser = (user,idTokenResult) => {
    return {
        type : 'LOGGED_IN_USER',
        payload : {
          email : user.email,
          token : idTokenResult.token,
        }
    }
}

export const logoutUser = ( ) => {
    return { 
        type : 'LOGOUT',
        payload : null
      }
}




