import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

const Registrasi = ()=>{
const history = useHistory();
const [email, setEmail] = useState('');
const [nama, setNama] = useState('');
const [password,SetPassword] = useState('');
const [konfirmPassword, setKonfirmPassword] = useState('');

useEffect(() =>{
    const login = localStorage.getItem('dataLoginUser');
    if(login){
        // history.push('/list-video-admin');
    }
},[]);


const handleSubmit = (e)=> {
    e.preventDefault();
    const dataSend = {
        email,
        password,
        konfirmPassword,
        nama
    }
    if(email==='' || password==='' || konfirmPassword==='' ||nama===''){
        swal('Failed','form harus diisi!','error');
    }else{
        fetch(`${process.env.REACT_APP_API}/registrasi`,{
            method:'POST',
            headers:{
                'Content-Type'  : 'application/json'
            },
            body:JSON.stringify(dataSend)
            
        })
        .then(res => res.json())
        .then(hasil => {
            console.log(hasil)
            // if(hasil.status==='Berhasil'){
            //     localStorage.setItem('dataLoginUser',hasil.token);
            //     // history.push('/list-video-admin');
            // }
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
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" placeholder="username"/>
                        </div>

                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-user"></i>
                                </div>
                            </div>
                            <input value={nama} onChange={(e)=>setNama(e.target.value)} type="text" className="form-control" placeholder="nama"/>
                        </div>

                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                <i className="fas fa-key"></i>
                                </div>
                            </div>
                            <input value={password} onChange={(e)=>SetPassword(e.target.value)} type="password" className="form-control" placeholder="password"/>
                        </div>

                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                <i className="fas fa-key"></i>
                                </div>
                            </div>
                            <input value={konfirmPassword} onChange={(e)=>setKonfirmPassword(e.target.value)} type="password" className="form-control" placeholder="konfirmasi password"/>
                        </div>
                        {password!== konfirmPassword && (password.length >0 || konfirmPassword.length> 0) ? <span style={{color:'red',fontSize:14}}>Password dan kofirmasi passowrd harus sama</span>:''}
                        <div className="form-group">
                        <button onClick ={(e)=>handleSubmit(e)} className="btn float-right login_btn">Registrasi</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
           
        </div>
    )
}

export default Registrasi;