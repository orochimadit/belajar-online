import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

const Login = ()=>{
const history = useHistory();
const [email, setEmail] = useState('');
const [password,SetPassword] = useState('');

useEffect(() =>{
    const login = localStorage.getItem('dataLoginAdmin');
    if(login){
        history.push('/list-video-admin');
    }
},[]);


const handleSubmit = (e)=> {
    e.preventDefault();
    const dataSend = {
        email,
        password
    }
    if(email==='' || password===''){
        swal('Failed','form harus diisi!','error');
    }else{
        fetch(`${process.env.REACT_APP_API}/loginAdmin`,{
            method:'POST',
            headers:{
                'Content-Type'  : 'application/json'
            },
            body:JSON.stringify(dataSend)
            
        })
        .then(res => res.json())
        .then(hasil => {
            console.log(hasil)
            localStorage.setItem('dataLoginAdmin',hasil.token);
           history.push('/list-video-admin');
        })
        .catch(err =>{
            alert(err)
        });
     }
    }
    return (
        <div className="container image-bg">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                <div className="card-header">
                    <h3>Login Admin</h3>
                    <div className="d-flex justify-content-end social-icon">
                        <span>
                            <i className="fab fa-facebook-square"></i>
                        </span>
                        <span>
                            <i className="fab fa-google-plus-square"></i>
                        </span>
                        <span>
                            <i className="fab fa-twitter-square"></i>
                        </span>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-user"></i>
                                </div>
                            </div>
                            <input onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" placeholder="username"/>
                        </div>

                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                <i className="fas fa-key"></i>
                                </div>
                            </div>
                            <input onChange={(e)=>SetPassword(e.target.value)} type="password" className="form-control" placeholder="password"/>
                        </div>

                        <div className="form-group">
                        <button onClick ={(e)=>handleSubmit(e)} className="btn float-right login_btn">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
           
        </div>
    )
}

export default Login;