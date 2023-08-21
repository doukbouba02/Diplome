import React, { useState, Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../css/formulaire.css';
export default class AddDiplome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numdp: "",
            nom: "",
            date_nais: "",
            lieu: "",
            matricule: "",
            dp: "",
            session: "",
            filiere: "",
            mention: "",
            show: false,
            date_deliv: "",
            navigate: useNavigate,
            formOK: false,
        };
    }

    handleChange(event) {
        // console.log(this.state);
        // event.preventDefault();
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState(
            {
                [fieldName]: fleldVal,
            },
            () => {
                // this.checkForm();
            }
        );
    }

    handleClose = () => {
        this.setState({
            //Vider tous les champs ici
            show: false,
        });
    };
    handleShow = () => {
        this.setState({
            show: true,
        });
    };

    saveDiplome = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1/diplomes', {
                nom: this.state.nom,
                date_nais: this.state.date_nais,
                lieu: this.state.lieu,
                matricule: this.state.matricule,
                dp: this.state.dp,
                session: this.state.session,
                filiere: this.state.filiere,
                mention: this.state.mention,
                date_deliv: this.state.date_deliv,
            });
            this.handleClose();
            //navigate("/diplome");
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <>
                <div className={this.props.article === null ? "mb-4" : ""}>
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
                        <h1><strong>Ajout de diplome</strong></h1>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-sm-6">
                                <label className="label">Nom complet</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Nom complet' name="nom"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.nom} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label className="label">Date de naissance</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Date de naissance' name="date_nais"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.date_nais} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label className="label">Lieu de naissance</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Lieu de naissance' name="lieu"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.lieu} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label className="label">Matricule</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Matricule' name="matricule"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.matricule} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label className="label">Diplome</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select name="dp"
                                            onChange={this.handleChange.bind(this)}
                                            value={this.state.dp} >
                                            <option >Sélectionner un diplome</option>
                                            <option value="DUT">DUT</option>
                                            <option value="Licence">Licence</option>
                                            <option value="Master">Master</option>
                                            <option value="Doctorat">Doctorat</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label className="label">Session </label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='session' name="session"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.se} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label className="label">Filière </label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Filière' name="filiere"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.filiere} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label className="label">Mention</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Session' name="mention"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.mention} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label className="label">Date de délivrance</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Session' name="date_deliv"
                                        onChange={this.handleChange.bind(this)}
                                        value={this.state.date_deliv} />
                                </div>
                            </div>
                        </div>
                        {/* <div className="colums mt-5 is-centered">
                            <div className="column is-half">
                                <form>
                                    <div className="fied">
                                        
                                    </div>
                                    <div className="fied">
                                        
                                    </div>
                                    <div className="fied">
                                        
                                    </div>

                                    <div className="fied">
                                        
                                    </div>

                                    <div className="fied">
                                        
                                    </div>
                                    <div className="fied">
                                        
                                    </div>
                                    <div className="fied">
                                        
                                    </div>
                                    <div className="fied">
                                        
                                    </div>
                                    <div className="fied">
                                        
                                    </div>
                                </form>
                            </div>
                        </div> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="fied">
                            <button type='submit' className='button is-accent-blue' onClick={() => this.saveDiplome}>Save</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

