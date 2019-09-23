const userInfo = (state = '', action) => {
    switch (action.type) {
        case 'ADD_ID':
            //console.log('userName:'+action.payload)
            return action.payload
    }
    return state
}

export default userInfo