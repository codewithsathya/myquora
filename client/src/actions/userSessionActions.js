export const loginUser = (firstName, lastName, email, id) => ({
        type: 'LOGIN',
        payload: {
                firstName,
                lastName,
                email,
                id
        }
})