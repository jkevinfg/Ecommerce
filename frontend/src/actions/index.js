export const loginUser = (user,idToken) => {
    return {
        type : 'LOGGED_IN_USER',
        payload : {
          name : user.name,
          email : user.email,
          token : idToken.token ,
          role : user.role,
          _id :user._id
        }
    }
}

export const logoutUser = ( ) => {
    return { 
        type : 'LOGOUT',
        payload : null
      }
}




