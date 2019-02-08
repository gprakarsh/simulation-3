const initialState = {
    username:'',
    profile_pic:''
}

const UPDATE_USER = 'UPDATE_USER'

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_USER:
        const {username,profile_pic} = payload 
        return {...state,username,profile_pic}
        default:
            return state
    }
}

export function updateUser(userObj) {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}