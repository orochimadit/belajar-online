const Login = ()=>{
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
                            <input type="text" className="form-control" placeholder="username"/>
                        </div>

                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                <i className="fas fa-key"></i>
                                </div>
                            </div>
                            <input type="text" className="form-control" placeholder="password"/>
                        </div>

                        <div className="form-group">
                        <button className="btn float-right login_btn">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
           
        </div>
    )
}

export default Login;