import React, {Component} from 'react';
import UserModal from './UserModal';
import User from "../models/UserModel";
import * as service from "../services/UserService";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default class ListUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: [],
            toastShow: false,
            toastLibelle: "",
        };
    }

    getLIstUser() {
        service.getUsers().then((users) => {
            let list = [];
            users.forEach((user) => {
                let u = new User(
                    user.id,
                    user.nom,
                    user.prenom,
                    user.login,
                    user.password,
                    user.profil,
                );
                list.push(u);
            });
            this.setState(
                {
                    listUser: list,
                },
                () => { }
            );
        });
    }

    componentDidMount() {
        this.getLIstUser();
    }
    onSave = (user) => {
        service.saveUser(user).then((result) => {
            this.getLIstUser();
            let msg =
                result.msg === "success"
                    ? "Ajout effectué avec succès."
                    : "Une erreur est intervenu lors de l'ajout.";
            this.toggleToastShow(msg);
        });
    };
    onUpdate = (user) => {
        service.updateUser(user).then((result) => {
            this.getLIstUser();
            let msg =
                result.msg === "success"
                    ? "Modification effectué avec succès."
                    : "Une erreur est intervenu lors de la modification.";
            this.toggleToastShow(msg);
        });
    };
    onDelete = (user) => {
        service.deleteUser(user.id).then((result) => {
            this.getLIstUser();
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

    render() {
        return (
            <>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">{/* <h1>Liste des users </h1> */}</div>
                        </div>
                    </div>
                </section>
                <div className="dropdown-divider"></div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-success card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">Liste des utilisateurs</h3>
                                </div>
                                <div className="card-body">
                                    <UserModal
                                        libelle={"Nouveau Utilisateur"}
                                        add={true}
                                        user={null}
                                        btnStyle="btn btn-block btn-success"
                                        btnIcon="bi-plus-circle"
                                        onSave={this.onSave}
                                    />
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th width={50}>ID</th>
                                                <th>Nom</th>
                                                <th>Prénom</th>
                                                <th>login</th>
                                                <th>mot de passe</th>
                                                <th>Profile</th>
                                                <th width={100}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listUser.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.nom}</td>
                                                    <td>{user.prenom}</td>
                                                    <td>{user.login}</td>
                                                    <td>{user.password}</td>
                                                    <td>{user.profil}</td>
                                                    <td>
                                                        <UserModal
                                                            // title
                                                            libelle={"Editer utilisateur"}
                                                            add={true}
                                                            user={user}
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
                                    {this.state.listUser.length > 0 ? null : (
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
        );
    }
}


