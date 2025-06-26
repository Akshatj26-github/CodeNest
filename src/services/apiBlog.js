import api from "@/api";

export async function getBlogs(page) {
  try {
    const response = await api.get(`/blogs?page=${page}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
} 

export async function getBlog(id) {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  } catch (err) {
    console.error("API error while fetching blog:", err);
    throw new Error(err.message);
  }
}

export async function registerUser(data){
  try{
    const response = await api.post("/register_user/",data);
    return response.data;

  } catch(err){
    console.log(err);
    // All the errors are handled on frontend but the error of username already exists is left , so we need to add this error
    if(err.status == 400){
      throw new Error("Username already exists");
    }
    else throw new Error(err);
  }
}

export async function login(data){
  try{
    const response = await api.post("/token/", data)
    return response.data
  }
  catch(err){
    if(err.status===401){
      throw new Error("Invalid Credentials")
    }
    throw new Error(err)
  }
}

export async function getUsername() {
  try {
    const response = await api.get("/get_username/");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}


export async function getCategory() {
  try {
    const response = await api.get("/category/");
    return response.data;
  } catch (err) {
    console.error("Error fetching category:", err);
    throw new Error(err.message);
  }
}

export async function createCategory(category) {
  try {
    const response = await api.post("/category/", { category });
    return response.data;
  } catch (err) {
    console.error("Error creating category:", err);
    throw new Error(err.message);
  }
}

export async function createBlog(data) {
  try {
    const response = await api.post("/blogs/create/", data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateBlog(data, id){
  try{
    const response = await api.put(`/blogs/update/${id}`, data)
    return response.data
  }

  catch(err){
    if(err.response){
      throw new Error(err.response?.data?.message || "Failed to update blog" )
    }

    throw new Error(err.message)
  }
}

export async function deleteBlog(id){
  try{
    const response = await api.post(`/blogs/delete/${id}`)
    return response.data
  }
  catch(err){
    if(err.response){
      throw new Error(err.response?.data?.message || "Failed to delete blog" )
    }

    throw new Error(err.message)
  }
}

export async function getUserInfo(username){
  try{
    const response = await api.get(`/user/info/${username}`)
    return response.data
  }
  catch(err){
    throw new Error(err.message)
  }
}

export async function updateProfile(data) {
  try {
    const response = await api.put(`/updateprofile/`, data);
    return response.data;
  } catch (err) {
    console.log(err)
    if (err.response) {
      throw new Error(
        err?.response?.data.username[0] || "Failed to update profile"
      );
    }

    throw new Error(err.message);
  }
}

export async function likeBlog(blogId) {
  try {
    const response = await api.post(`/blogs/${blogId}/like/`);
    return response.data;
  } catch (err) {
    console.error("Error liking blog:", err);
    throw new Error("Failed to like/unlike blog.");
  }
}