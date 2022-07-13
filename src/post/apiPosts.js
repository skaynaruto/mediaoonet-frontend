export const  createPost = (userId,token,post) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${userId}/new`,{
        method:"POST",
        headers:{
        Accept:"application/json",
        Authorization:` Bearer ${token}`
        },
        body:post
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const  fetchPost = (page) =>{
    return fetch(`${process.env.REACT_APP_API_URL}posts/?page=${page}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const  fetchSinglePost = (postId) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const  postByuser = (userId,token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${userId}/allPosts`,{
        method:"GET",
        headers:{
        Accept:"application/json",
        "content-Type":"application/json",
        Authorization:` Bearer ${token}`
        },
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const  removePost = (userId,postId,token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${userId}/${postId}/delete`,{
        method:"DELETE",
        headers:{
        Accept:"application/json",
        "content-type":"application/json",
        Authorization:` Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const  editPost = (postId,userId,token,post) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${userId}/${postId}/update`,{
        method:"PUT",
        headers:{
        Accept:"application/json",
        Authorization:` Bearer ${token}`
        },
        body:post
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const likes = (userId,postId,token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`,{
        method:"PUT",
        headers:{
        Accept:"application/json",
        'content-Type':"application/json",
        Authorization:` Bearer ${token}`
        },
        body:JSON.stringify({userId,postId})
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const unlike = (userId,postId,token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`,{
        method:"PUT",
        headers:{
        Accept:"application/json",
        'content-Type':"application/json",
        Authorization:` Bearer ${token}`
        },
        body:JSON.stringify({userId,postId})
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const comment = (userId,postId,token,comment) =>{
    console.log(userId,postId,token,comment)
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`,{
        method:"PUT",
        headers:{
        Accept:"application/json",
        'content-Type':"application/json",
        Authorization:` Bearer ${token}`
        },
        body:JSON.stringify({userId,postId,comment})
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}
export const uncomment = (userId,postId,token,comment) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`,{
        method:"PUT",
        headers:{
        Accept:"application/json",
        'content-Type':"application/json",
        Authorization:` Bearer ${token}`
        },
        body:JSON.stringify({userId,postId,comment})
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}