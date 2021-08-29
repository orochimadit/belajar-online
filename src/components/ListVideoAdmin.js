import { useEffect } from "react";

const ListVideoAdmin = () =>{
    // const [dataListVideo, setDataListVideo] = useState([]);
    useEffect(() =>{
        getData()
    },[]);
    
    const getData = () =>{
    const token = localStorage.getItem('dataLoginAdmin');
    const sendData = {
        token
    }
    fetch(`${process.env.REACT_APP_API}/listKonten`,{
        method:'POST',
        body: JSON.stringify(sendData),
        headers:{
            "Content-Type" : "application-Json"
        }
    })
    .then(res => res.json())
    .then(hasil =>{
        console.log('data',hasil)
    })
    .catch(err => {
        alert(err)
    })
    }
    return(
    <>
        <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            {/* <hr className="my-4"> */}
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>

        <div className="row justify-content-center">
        <div className="card m-3 col-md-4 col-lg-3" style={{width:'18rem'}}>
            <img className="card-img-top" src="..." alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        <div className="card m-3 m-3 col-md-4 col-lg-3" style={{width:'18rem'}}>
            <img className="card-img-top" src="..." alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        <div className="card m-3 m-3 col-md-4 col-lg-3" style={{width:'18rem'}}>
            <img className="card-img-top" src="..." alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        </div>
    </>
    )
}

export default ListVideoAdmin;