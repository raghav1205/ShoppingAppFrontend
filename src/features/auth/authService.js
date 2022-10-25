const REACT_APP_API_URL = `https://peaceful-beyond-47525.herokuapp.com/login`

const login  = async (user, thunkAPI) => {
    try {
        const response = await fetch(REACT_APP_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const res = await response.json()
        console.log(res)
        if(response.status === 201){
            localStorage.setItem('user', JSON.stringify(res.data))  
            return res.data
        }
        else{
           return thunkAPI.rejectWithValue(res.message)
           
        }
        
    }
    catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
}
const logout = async () => {
    const REACT_APP_API_URL = `https://peaceful-beyond-47525.herokuapp.com/logout`
    const response = await fetch(REACT_APP_API_URL)
    const res = await response.json()
    console.log(res)
    console.log('hi')
    localStorage.removeItem('user')
}

const authService = {
    login, 
    logout
}

export default authService
