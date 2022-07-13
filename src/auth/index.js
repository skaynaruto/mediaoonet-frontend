export const signup = (user)=>{
    return   fetch(`${process.env.REACT_APP_API_URL}signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}
export const signIn = (user)=>{
    return   fetch(`${process.env.REACT_APP_API_URL}signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}
export const authenticate = (jwt,next)=>{
    if(typeof window !== undefined){
        localStorage.setItem("jwt",JSON.stringify(jwt))
        next();
    }
}
export const signout = next =>{
    if(typeof window !== "undefined") localStorage.removeItem("jwt")
    next();
    return fetch(`${process.env.REACT_APP_API_URL}signout`,{
        method:"GET"
    })
        .then(response => {
             console.log("signout",response);
              return response.json()
            })
        .catch(err=>console.log(err))
}
export const isAuthenticated = ()=>{
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}
export const forgotPassword = (email) =>{
    return fetch(`${process.env.REACT_APP_API_URL}forgot-password/`,{
        method:"PUT",
        headers:{
        Accept:"application/json",
        'content-Type':"application/json"
        
        },
        body:JSON.stringify({email})
    })
    .then(response =>{
        //console.log("Forgot password Response:",response)
        return response.json()
    })
    .catch(err => console.log(err))
}
export const resetPassword = (resetinfo) =>{
    //console.log(resetinfo)
    return fetch(`${process.env.REACT_APP_API_URL}reset-password/`,{
        method:"PUT",
        headers:{
        Accept:"application/json",
        'content-Type':"application/json"
        
        },
        body:JSON.stringify(resetinfo)
    })
    .then(response =>{
        //console.log("Reset password Response:",response)
        return response.json()
    })
    .catch(err => console.log(err))
}
export const socialLogin = (user) =>{
    return fetch(`${process.env.REACT_APP_API_URL}social-login`,{
        method:"POST",
        headers:{
        Accept:"application/json",
        'content-Type':"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response =>{
        console.log("signIn password Response:",response)
        return response.json()
    })
    .catch(err => console.log(err))
}
