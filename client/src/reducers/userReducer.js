const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        id: ''
}

export const userReducer = (state = initialState, action) => {
        switch(action.type){
                case 'LOGIN':
                                return {
                                        
                                        ...action.payload
                                }
                       
                        
                      
                      
                default:
                        return state
        }
}