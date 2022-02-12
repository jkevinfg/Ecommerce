export const loginUser = (user,idToken) => {
    return {
        type : 'LOGGED_IN_USER',
        payload : {
          email : user.email,
          token : idToken.token,
        }
    }
}

export const logoutUser = ( ) => {
    return { 
        type : 'LOGOUT',
        payload : null
      }
}




