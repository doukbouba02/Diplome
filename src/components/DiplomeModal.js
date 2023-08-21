import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Diplome from "../models/DiplomeModel";
import * as DiplomeService from "../services/DiplomeService";


export default class DiplomeModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            diplome: null,
            formOK: false,
            listDiplome: [],
            qrcodeValue:"",
        };
    }

    handleClose = () => {
        this.setState({
            //Vider tous les champs ici
            diplome: null,
            show: false,
            formOK: false,
        });
    };
    handleShow = () => {
        this.setState({
            show: true,
            diplome: this.props.diplome,
            formOK: this.props.diplome != null,
        });
    };

    handleChange(event) {
        // console.log(this.state);
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState(
            {
                diplome: {
                    ...this.state.diplome,
                    [fieldName]: fleldVal,
                },
            },
            () => {
                this.checkForm();
            }
        );
    }

    checkForm() {
        let isnom = false;
        let isdate_nais = false;
        let islieu = false;
        let ismatricule = false;
        let isdp = false;
        let issession = false;
        let isfiliere = false;
        let ismention = false;
        let isdate_deliv = false;
        let qr_code = "";
    
        if (this.state.diplome.nom != null) {
            if (this.state.diplome.nom.length > 0) {
                isnom = true;
            }
        }
        if (this.state.diplome.date_nais != null) {
            if (this.state.diplome.date_nais.length > 0) {
                isdate_nais = true;
            }
        }
        if (this.state.diplome.lieu != null) {
            if (this.state.diplome.lieu.length > 0) {
                islieu = true;
            }
        }
        if (this.state.diplome.matricule != null) {
            if (this.state.diplome.matricule.length > 0) {
                ismatricule = true;
            }
        }
        if (this.state.diplome.dp != null) {
            if (this.state.diplome.dp.length > 0) {
                isdp = true;
            }
        }
        if (this.state.diplome.session != null) {
            if (this.state.diplome.session.length > 0) {
                issession = true;
            }
        }
        if (this.state.diplome.filiere != null) {
            if (this.state.diplome.filiere.length > 0) {
                isfiliere = true;
            }
        }
        if (this.state.diplome.mention != null) {
            if (this.state.diplome.mention.length > 0) {
                ismention = true;
            }
        }
        if (this.state.diplome.date_deliv != null) {
            if (this.state.diplome.date_deliv.length > 0) {
                isdate_deliv = true;
            }
        }
        if (this.state.diplome.nom != null && this.state.diplome.matricule != null && this.state.diplome.filiere != null) {
            if (this.state.diplome.nom.length > 0 && this.state.diplome.matricule.length > 0 && this.state.diplome.filiere.length > 0) {
                const generateValue = `${this.state.diplome.matricule}, ${this.state.diplome.nom}, ${this.state.diplome.filiere}`;
                this.setState({
                    qrcodeValue: generateValue,
                });
                
           }
        }

        this.setState({
            formOK: isnom && isdate_nais && islieu && ismatricule && isdp && issession
                && isfiliere && ismention && isdate_deliv,
        });
    }

    getLIstDiplome() {
        DiplomeService.getDiplomes().then((diplomes) => {
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
                );
                list.push(d);
            });
            // console.log(list);
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
        this.setState({
            diplome: this.props.diplome,
        });
    }

    doSave = (event) => {
        this.state.diplome.qr_code = this.state.qrcodeValue;
        this.props.onSave(this.state.diplome);
        this.handleClose();
    };

    doUpdate = (event) => {
        this.props.onSave(this.state.diplome);
        this.handleClose();
    };

    doDelete = (event) => {
        this.props.onDelete(this.state.diplome);
        this.handleClose();
    };

    render() {
        return (
            <>
                <div className={this.props.diplome === null ? "mb-4" : ""}>
                    <Button className={this.props.btnStyle} onClick={this.handleShow}>
                        <i className={this.props.btnIcon}></i> {this.props.libelle}
                    </Button>
                </div>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    // backdrop="static"
                    keyboard={false}
                    backdrop={false}
                    animation={true}
                    centered
                    // dialogClassName="modal-90w"
                    className="modal-dialog modal-xl"
                >
                    <Modal.Header closeButton>
                        {this.props.diplome === null ? (
                            <Modal.Title>Nouveau Diplome</Modal.Title>
                        ) : (
                            <Modal.Title>Modification Diplome</Modal.Title>
                        )}
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="row">
                            <Form.Group className="mb-3 col-sm-6" controlId="formBasicEmail">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrer le nom complet"
                                    value={this.state.diplome != null ? this.state.diplome.nom : ""}
                                    name="nom"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 col-sm-6" controlId="formBasicEmail">
                                <Form.Label>Date de naissance</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Au format JJ/MM/AAAA"
                                    value={
                                        this.state.diplome != null ? this.state.diplome.date_nais : ""
                                    }
                                    name="date_nais"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 col-sm-6" controlId="formBasicEmail">
                                <Form.Label>Lieu</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrer le lieu de naissance"
                                    value={
                                        this.state.diplome != null ? this.state.diplome.lieu : ""
                                    }
                                    name="lieu"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3  col-sm-6" controlId="formBasicEmail">
                                <Form.Label>Matricule</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrer le matricule de l'etudiant"
                                    value={
                                        this.state.diplome != null ? this.state.diplome.matricule : ""
                                    }
                                    name="matricule"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Diplome</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="dp"
                                    value={
                                        this.state.diplome != null ? this.state.diplome.dp : ""
                                    }
                                    onChange={this.handleChange.bind(this)}
                                >
                                    <option value=" ">Sélectionner un diplome</option>
                                    <option value="DUT">DUT</option>
                                    <option value="Licence">Licence</option>
                                    <option value="Master">Master</option>
                                    <option value="Doctorat">Doctorat</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 col-sm-6" controlId="formBasicEmail">
                                <Form.Label>Session</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrer la session"
                                    value={this.state.diplome != null ? this.state.diplome.session : ""}
                                    name="session"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 col-sm-6" controlId="formBasicEmail">
                                <Form.Label>Filière</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrer la Filière"
                                    value={
                                        this.state.diplome != null ? this.state.diplome.filiere : ""
                                    }
                                    name="filiere"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3  col-sm-6" controlId="formBasicEmail">
                                <Form.Label>Mention</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Entrer la mention Obtenue"
                                    value={
                                        this.state.diplome != null ? this.state.diplome.mention : ""
                                    }
                                    name="mention"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3  col-sm-6" controlId="formBasicEmail">
                                <Form.Label>Date de délivrance</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Au format JJ/MM/AAAA"
                                    value={
                                        this.state.diplome != null ? this.state.diplome.date_deliv : ""
                                    }
                                    name="date_deliv"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    {this.props.diplome === null ? (
                        <Modal.Footer>
                            <Button
                                disabled={!this.state.formOK}
                                variant="success"
                                onClick={this.doSave}
                            >
                                Ajouter
                            </Button>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Annuler
                            </Button>
                        </Modal.Footer>
                    ) : (
                        <Modal.Footer>
                            <Button
                                disabled={!this.state.formOK}
                                variant="primary"
                                onClick={this.doUpdate}
                            >
                                Modifier
                            </Button>
                            <Button variant="danger" onClick={this.doDelete}>
                                Supprimer
                            </Button>
                        </Modal.Footer>
                    )}
                </Modal>
            </>
        );
    }

}