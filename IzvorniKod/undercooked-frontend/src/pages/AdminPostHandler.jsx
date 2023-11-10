import {redirect} from 'react-router-dom'
import { Home } from "./Home";
import AdminService from '../services/AdminService';
import secureLocalStorage from 'react-secure-storage';

export const adminPostAction = async ({request}) => {
    const data = await request.formData();
   // console.log(data.get("id"));

    // AdminService.getUserById(data.get("id")).then(res => {
    //             // this.setState({users: res.data})
    //             console.log(res.data);
    //         });

    secureLocalStorage.setItem("id", data.get("id"))
    return redirect("/admin")
}