import axios from "axios"

export const createUser = async (e) => {
    e.preventDefault();
        
    let data = {
        mail: e.target.mail.value,
        password: e.target.password.value
    }
     
     await axios.post("http://localhost:1234/loggin/create", data);
}

export const allDataUsers = async () => {
    let datasUsers = await axios.get("http://localhost:1234/loggin/read"); 
    return datasUsers;
 }

 export const checkUser = async (e) => {
    let data = {
        mail: e.target.mail.value,
        password: e.target.password.value
    }
    let check = await axios.post("http://localhost:1234/loggin/verify", data);
    if(check){
        localStorage.setItem('user', check.data);
        return check.data;
    }
    return null;
 }

 export const updateUser = async (e) => {
    e.preventDefault();
    let data = { 
        id: e.target.id.value,
        password: e.target.password.value
        
    }
    await axios.put("http://localhost:1234/loggin/update", data);
 }

 export const deleteUser = async (data) => {
    await axios.delete("http://localhost:1234/loggin/delete", {data});
 }