import { useEffect,useState } from "react";
import {Modal, Button} from 'react-bootstrap';
import ReactPlayer from "react-player/lazy";
const ListVideoAdmin = () =>{
     const [dataListVideo, setDataListVideo] = useState([]);
     const [handleShowVideo, setHandleShowVideo] = useState(false);
     const [linkVideo,setLinkVideo]= useState('');

     const handleClose = () =>{
         setHandleShowVideo(false)
     }
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
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(hasil =>{
        console.log('data',hasil)
        setDataListVideo(hasil.data)
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
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>

        <div className="row justify-content-center">
        {
            dataListVideo.map((data, index)=>{
                return(
            <div key={index} className="card m-3 col-md-4 col-lg-3" style={{width:'18rem',height:'auto',border:'none'}}>
                <img
                onClick={()=>handleOpenVideo(data)} 
                src={data.link_thumbnail} 
                className="card-img-top"  alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{data.judul}</h5>
                    <p className="card-text">{data.keterangan}</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
                )
            })
        }
        
       
        </div>
    </>
    )
}

export default ListVideoAdmin;