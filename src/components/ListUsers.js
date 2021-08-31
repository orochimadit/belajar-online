import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import swal from "sweetalert";


const ListUsers = () => {
    const history = useHistory();
    const [dataUsers, setDataUsers] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [idHapus,setIdHapus] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem('dataLoginAdmin');
        if (!token) {
            history.push('/login-admin')
        }
        getDataUser();
    }, [])

    const getDataUser = () => {
        const token = localStorage.getItem('dataLoginAdmin');
        const dataSend = {
            token
        }

        fetch(`${process.env.REACT_APP_API}/listAdmin`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(hasil => {
                console.log(hasil)
                if (hasil.status === 'berhasil') {
                    setDataUsers(hasil.data)
                } else {
                    history.push('/login-admin')
                }
            })
    };

    const handleSimpanUser = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('dataLoginAdmin');
        const dataSend = {
            nama,
            email,
            password,
            token
        };
        if (nama === '' || email === '' || password === '') {
            swal('Failed', 'Form harus diisi semua', 'error')
            return
        }
        fetch(`${process.env.REACT_APP_API}/tambahAdmin`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(hasil => {
                console.log(hasil)
                if (hasil.status === 'berhasil') {
                    swal('success', 'Data berhasil diinputkan', 'success')
                    setLgShow(false);
                    clearState();
                    getDataUser();

                } else {
                    history.push('/login-admin')
                }
            })
            .catch(err => {
                alert(err);
            })
    }

    const clearState = () => {
        setNama('');
        setEmail('');
        setPassword('');
    }
    // console.log(dataUsers);
    const handleClose = () => {
        setShow(false)
    }
    const handleHapus=(id) =>{
        setShow(true)
        setIdHapus(id);
    }
    const handleTriggerHapus = () =>{
        const token = localStorage.getItem('dataLoginAdmin');
        const sendData = {
            token,
            id_user:idHapus
        }
        fetch(`${process.env.REACT_APP_API}/hapusAdmin`,{
            method:'POST',
            body: JSON.stringify(sendData),
            headers :{
                'Content-Type' : 'Application/json'
            }
        })
        .then(res => res.json())
        .then(hasil =>{
            console.log(hasil)
            if(hasil.status==='berhasil'){
                swal('success', 'Data berhasil dihapus', 'success');
                setShow(false)
                getDataUser()
            }else{
                history.push("/login-admin")
            }
        })
        .catch(err =>{
            alert(err)
        })
    }
    return (
        <>
            {/* modal Tambah */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Large Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nama">Nama</label>
                            <input
                                onChange={(e) => setNama(e.target.value)}
                                value={nama}
                                type="text"
                                className="form-control"
                                id="nama"
                                aria-describedby="nama"
                                placeholder="Masukkan nama" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="email"
                                placeholder="Masukkan Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                id="password"
                                aria-describedby="password"
                                placeholder="Masukkan Password" />
                        </div>
                        <button onClick={(e) => handleSimpanUser(e)} type="submit" className="btn btn-primary">Simpan</button>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah anda yakin?</Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleTriggerHapus}>
                        hapus
                    </Button>
                </Modal.Footer>
            </Modal>
            <h1 className="text-center pb-5 mb-5 mt-5">List Users</h1>
            <div className="container">
                <button onClick={() => setLgShow(true)} className="mb-4 btn btn-success rounded">Tambah User</button>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataUsers.map((data, index) => {
                                return (
                                   
                                    <tr key={index}>
                                         {console.log(data)}
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.nama}</td>
                                        <td>{data.email}</td>
                                        <td><button onClick={()=>handleHapus(data.id_user)} className="btn btn-rounded btn-danger">Hapus</button></td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListUsers;