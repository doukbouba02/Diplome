import React, { Component } from 'react';
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Button from "react-bootstrap/esm/Button.js";
import '../css/diplome.css';
import Qrcode from 'qrcode.react';
import DiplomeModal from './DiplomeModal';
import Diplome from '../models/DiplomeModel';
import * as service from "../services/DiplomeService";


export default class DiplomeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDiplome: [],
            toastShow: false,
            toastLibelle: "",
            tableRows: [],
            searchWord: "",
            qrcodeValue: "",
        };
    }
  
    //Methode to fetch data
    getLIstDiplome() {
        service.getDiplomes().then((diplomes) => {
            let list = [];
            diplomes.forEach((diplome) => {
                let d = new Diplome(
                    diplome.id,
                    diplome.nom,
                    diplome.date_nais,
                    diplome.lieu,
                    diplome.matricule,
                    diplome.dp,
                    diplome.session,
                    diplome.filiere,
                    diplome.mention,
                    diplome.date_deliv,
                    diplome.qr_code,
                );
                list.push(d);
            });
            this.setState(
                {
                    listDiplome: list,
                },
                () => { }
            );
        });
    }

    componentDidMount() {
        this.getLIstDiplome();
    }
    onSave = (diplome) => {
        service.saveDiplome(diplome).then((result) => {
            this.getLIstDiplome();
            let msg =
                result.msg === "success"
                    ? "Ajout effectué avec succès."
                    : "Une erreur est intervenu lors de l'ajout.";
            this.toggleToastShow(msg);
        });
    };
    onUpdate = (diplome) => {
        service.updateDiplome(diplome).then((result) => {
            this.getLIstDiplome();
            let msg =
                result.msg === "success"
                    ? "Modification effectué avec succès."
                    : "Une erreur est intervenu lors de la modification.";
            this.toggleToastShow(msg);
        });
    };
    onDelete = (diplome) => {
        service.deleteDiplome(diplome.id).then((result) => {
            this.getLIstDiplome();
            let msg =
                result.msg === "success"
                    ? "Suppression effectué avec succès."
                    : "Suppression impossible! Nous avons des opérations lié à ce utilisateurs.";
            this.toggleToastShow(msg);
        });
    };
    toggleToastShow = (libelle) => {
        this.setState({
            toastShow: !this.state.toastShow,
            toastLibelle: libelle,
        });
    };

    handleChange = (event) => {
        let fieldVal = event.target.value;
        this.setState({
            searchWord: fieldVal
        });
        console.log("searchWord: ", this.state.searchWord);
    };

    checkForm = () => {
        let isword = false;

        if (this.state.searchWord != null) {
            if (this.state.searchWord.length > 0) {
                isword = true;
            }
        }

        this.setState({
            formOK: isword,
        });
    };

    Qrcode = (ads) => {
        this.setState({
            qrcodeValue: "",
            qrcodeValue: ads,
        }, () => { console.log("the value in qrcode: ", this.state.qrcodeValue) });
    }

    search = () => {
        
        if (this.state.searchWord.length > 0) {
            this.setState({ tableRows: [...this.state.diplomes].filter((diplome) => diplome.matricule.includes(this.state.searchWord))});
            console.log("tableRows: ", this.state.tableRows);
        } else {
            //setTableRows(diplomes);
        }
    }

    render() {
        return (
            <>
                <h2 className="text-center display-4">
                    Diplome
                </h2>
                {/* <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">{/* <h1>Liste des clients</h1> </div>
                        </div>
                    </div>
                </section> */}
                {/* <div id="ajout" className="row">
                    <div className="col-md-9"></div>
                    <div className="col-md-3"><DiplomeModal
                        libelle={"Nouvelle diplome"}
                        add={true}
                        diplome={null}
                        btnStyle="btn btn-block btn-success"
                        btnIcon="bi-plus-circle"
                        width="100px"
                        onSave={this.onSave}
                    />
                    </div>
                </div> */}
                {/* {this.state.diplomes.length > 0 ? ( */}
                    <div id="ajout" className="row">
                        <div className="col-md-9">
                            {/* <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="basic-addon1" name="qrcodeValue" onChange={handleChange.bind(this)} value={qrcodeValue} /> */}
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-9">
                                <input type="text" className="input" placeholder='Recherche' name="searchWord"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.searchWord} />
                                </div>
                                <div className="col-md-3">
                                    <Button
                                        className="btn btn-block btn-sm"
                                        variant="success"
                                        onClick={this.search}
                                    >
                                        <i className="bi bi-search"></i>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* ) : null} */}
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-success card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">Liste des diplomes</h3>
                                </div>
                                <div className="card-body">
                                    <DiplomeModal
                                        libelle={"Nouveau diplome"}
                                        add={true}
                                        diplome={null}
                                        btnStyle="btn btn-block btn-success"
                                        btnIcon="bi-plus-circle"
                                        onSave={this.onSave}
                                    />
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#Matricule</th>
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
                                            {this.state.listDiplome.map((diplome, index) => (
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
                                                    <td>
                                                        <DiplomeModal
                                                            // title
                                                            libelle={"Editer diplome"}
                                                            add={true}
                                                            diplome={diplome}
                                                            btnStyle="button is-small is-info"
                                                            onSave={this.onUpdate}
                                                            onDelete={this.onDelete}
                                                            btnIcon="bi bi-pencil"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {this.state.listDiplome.length > 0 ? null : (
                                        <h2 className="text-center display-4">
                                            Aucun élément trouvé
                                        </h2>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ToastContainer className="p-3" position="top-end">
                    <Toast
                        show={this.state.toastShow}
                        onClose={this.toggleToastShow}
                        delay={3000}
                        autohide
                    >
                        <Toast.Header closeButton={false}>
                            <img
                                src="images/diplome2.jpeg"
                                className="rounded me-2"
                                alt="boost"
                            />
                            <strong className="me-auto">Diplome.ESGIC</strong>
                        </Toast.Header>
                        <Toast.Body>{this.state.toastLibelle}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        )
    }

}

