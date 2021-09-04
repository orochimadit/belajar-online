import { useEffect,useState } from "react";
import {Modal, Button} from 'react-bootstrap';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom";
import ReactPlayer from "react-player/lazy";
import { useHistory, Link } from "react-router-dom";

const PageListVideoUser = () =>{
    const history = useHistory();
    const [dataListVideo, setDataListVideo] = useState([]);
    const [handleShowVideo, setHandleShowVideo] = useState(false);
    const [linkVideo,setLinkVideo]= useState('');
    const [lgShow, setLgShow] = useState(false);
    const [search , setSearch]= useState('');

    useEffect(() =>{
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            cari:search,
            token,
        }

        fetch(`${process.env.REACT_APP_API}/cariKontenPublic`,{
            method:'POST',
            body: JSON.stringify(dataSend),
            headers:{
                "Content-Type"  :"application/json"
            }
        })
        .then((res)=>res.json())
        .then(hasil =>{
            if(hasil.status === 'gagal'){
                localStorage.removeItem('loginUser');
                history.replace('/')
            }
            setDataListVideo(hasil.data)
        })
        .catch(err =>{
            alert(err)
        })
    },[]);
    const handleClose = () =>{
         setHandleShowVideo(false)
    };
    const handleShow = (id) =>{
        // setShowDelete(true)
     }

  
    useEffect(() =>{
        const login = localStorage.getItem('dataLoginUser');
        if(!login){
            history.push('/');
        }
        getData()
    },[]);
    
    const getData = () =>{
    const token = localStorage.getItem('dataLoginUser');
    const sendData = {
        token
    }
    fetch(`${process.env.REACT_APP_API}/listKontenPeserta`,{
        method:'POST',
        body: JSON.stringify(sendData),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(hasil =>{
        console.log('data',hasil)
       if(hasil.status=== 'berhasil'){
        setDataListVideo(hasil.data)
        }else{
            history.push('/');
            localStorage.removeItem('dataLoginUser');
        }
    })
    .catch(err => {
        alert(err)
    })
    }

    const handleOpenVideo = (data)=>{
        setHandleShowVideo(true)
        console.log(data)
        setLinkVideo(data.link_video)
    }

   
    const logOut = () =>{
      localStorage.removeItem('dataLoginUser');
      history.push('/login-peserta')
    }
    return(
    <>

        {/* Modal play */}
        <Modal
        show={handleShowVideo}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div className="h-auto">
             {
                 <>
                 <ReactPlayer
                 pip={true}
                 config={{youtube:{
                     playerVars:{
                        showinfo:1,
                        origin:window.location.origin
                     },
                 },
                }}
                width="100%"
                height="300px"
                controls={true}
                url={`${linkVideo}`}
                 />
                 </>
             }
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
  
       
        <div className="jumbotron">
            <h1 className="display-4">Hello, world!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            {/* <hr className="my-4"> */}
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
    
            <Link to="/list-users" className="btn btn-success btn-lg ml-3" href="#" role="button">Users</Link>
            <button onClick={()=> logOut()} className="btn btn-danger btn-lg ml-3" href="#" role="button">Logout</button>
            <form className="form-inline">
                <input style={{marginLeft:'auto'}} onChange={(e)=> setSearch(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="search"/>
            </form>
        </div>

        <div className="row justify-content-center">
        {
            dataListVideo?dataListVideo.map((data, index)=>{
                return(
            <div key={index} className="card m-3 col-md-4 col-lg-3" style={{width:'18rem',height:'auto',border:'none'}}>
                <img
                onClick={()=>handleOpenVideo(data)} 
                src={data.link_thumbnail} 
                className="card-img-top"  alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{data.judul}</h5>
                    <p className="card-text">{data.keterangan}</p>
                </div>
            </div>
                )
            }):'Data Kosong'
        }
        
       
        </div>
    </>
    )
}

export default PageListVideoUser;