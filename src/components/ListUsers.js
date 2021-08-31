import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
const ListUsers = () => {
    const history = useHistory();
    const [dataUsers, setDataUsers] = useState([]);
    const [lgShow, setLgShow] = useState(false);
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
                // console.log(hasil)
                if (hasil.status === 'berhasil') {
                    setDataUsers(hasil.data)
                } else {
                    history.push('/login-admin')
                }
            })
    }
    // console.log(dataUsers);
    return (
        <>

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
                        <div class="form-group">
                            <label htmlFor="nama">Nama</label>
                            <input type="text" class="form-control" id="nama" aria-describedby="nama" placeholder="Masukkan nama" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="email">email</label>
                            <input type="email" class="form-control" id="email" aria-describedby="email" placeholder="Masukkan Email" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" class="form-control" id="password" aria-describedby="password" placeholder="Masukkan Password" />
                        </div>
                        <button type="submit" class="btn btn-primary">Simpan</button>
                    </form>
                </Modal.Body>
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
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.nama}</td>
                                        <td>{data.email}</td>
                                        <td><button className="btn btn-rounded btn-danger">Hapus</button></td>
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