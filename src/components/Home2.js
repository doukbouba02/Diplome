import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../css/home2.css';
import axios from 'axios';
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from 'react-router-dom';
import AddDiplome from './AddDiplome';
import CloseButton from 'react-bootstrap/esm/CloseButton';
// import { useSelector, useDispatch } from 'react-redux';
// import { addDiplome, deleteDiplome, updateDiplome } from '../reducer/reducer-diplome';


function Home2() {
    //Variables declarations
    const [diplomes, setDiplome] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [dp, setDp] = useState("");
    let [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        getDiplomes();
    }, []);

    const getDiplomes = async () => {
        const response = await axios.get('http://127.0.0.1/diplomes');
        setDiplome(response.data);
        setTableRows(response.data);
    };

    const handleChange = (event) => {
        let fleldVal = event.target.value;
        setSearchWord(fleldVal);
        let typedp = event.target.value;
        setDp(typedp);

    };

    const checkForm = () => {
        let isword = false;

        if (searchWord != null) {
            if (searchWord.length > 0) {
                isword = true;
            }
        }

        this.setState({
            formOK: isword,
        });
    };

    const search = () => {
        if (searchWord.length > 0) {
            if (searchWord.match(dp)) {
                setTableRows(tableRows = [...diplomes].filter((diplome) => diplome.dp.includes(searchWord)));
                console.log("tableRows: ", tableRows);
            }
        }
    }

    return (
        <>
            <div>
                <h2 className="text-center display-4">
                    Tableau de bord
                </h2>
                <div className="dropdown-divider"></div>
                <div className="row">
                    <div className="col-sm-9">
                        <select className="form-select " aria-label="Default select example"
                            name="dp" onChange={handleChange.bind(this)} value={dp}>
                            <option value="">Sélectionner un diplome</option>
                            <option value="DUT">DUT(Diplome Universitaire de Technologie)</option>
                            <option value="Licence">Licence</option>
                            <option value="Master">Master</option>
                        </select>
                        {console.log("diplome selected: ", dp)}
                    </div>
                    <div className="col-md-3">
                        <Button
                            className="btn btn-block btn-sm"
                            variant="success"
                            onClick={search}
                        >
                            <i className="bi bi-search"></i>
                        </Button>
                    </div>
                </div><br/>
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-success card-outline">
                                <div className="card-header">
                                    <h3 className="card-title text-center">Liste des diplomes</h3>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Matricule</th>
                                                <th>Filière</th>
                                                <th>Diplome</th>
                                                <th>Nom</th>
                                                <th>Date de naissance</th>
                                                <th>Lieu</th>
                                                <th>Date de délivrance</th>
                                                <th>Session</th>
                                                <th>Mention</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableRows.map((diplome, index) => (
                                                <tr key={diplome.id}>
                                                    <td>{diplome.matricule}</td>
                                                    <td>{diplome.filiere}</td>
                                                    <td>{diplome.dp}</td>
                                                    <td>{diplome.nom}</td>
                                                    <td>{diplome.date_nais}</td>
                                                    <td>{diplome.lieu}</td>
                                                    <td>{diplome.date_deliv}</td>
                                                    <td>{diplome.session}</td>
                                                    <td>{diplome.mention}</td>
                                                    <td id="action">
                                                        {/* <Link to={`edit/${diplome.id}`} className="button is-small is-info">Voir</Link> */}
                                                        <Link to={`/voir/${diplome.id}`} className="bi bi-search"></Link>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                    {diplomes.length > 0 ? null : (
                                        <h2 className="text-center display-4">
                                            Aucun diplome
                                        </h2>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    );
}

export default Home2;