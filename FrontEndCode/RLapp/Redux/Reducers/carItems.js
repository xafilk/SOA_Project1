let nextId=0
const cartItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let obj={...action.payload,...{idC:nextId++}}
            return [...state, obj ]
        case 'REMOVE_FROM_CART':
            return state.filter(cartItem => cartItem.idC !== action.payload.idC)
        case 'REMOVE_FROM_CART_ID':
            return state.filter(cartItem => cartItem.id !== action.payload.id)
    }

    return state
}

export default cartItems