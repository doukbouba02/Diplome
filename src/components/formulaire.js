import React, { Component } from 'react';
import '../css/formulaire.css'
import Diplome from './diplome';
class Formulaire extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            centre_p: "",
            Ecole: "",
            centre: "",
            Num_place: "",
            Date_nais: "",
            np_pere: "",
            np_mere: "",
            session: "",
            date_deliv: "",

        }
    };
    
    setData=(event)=>{
        this.setState({
            centre_p: event.target.value
        })
        console.log(this.state.centre_p)
      }

    //Pour donner au diplome dans Diplome le state contenant les data
    loadDiplome() {
        return <Diplome 
            diplome={this.state}
        />;
    }


    render() {
        return (
            <div className="containers">
                <div className="heading">Renseignement</div>
                <form action='#'>
                    <div className="card-details">
                        <div className="card-box">
                            <span className="details">Centre d'animation pédagogique de</span>
                            {/*Lier l'input au data cenntre_p */}<input type="text" onChange={() => this.state.centre_p} placeholder="Centre d'animation pédagogique de" />
                        </div>
                        <div className="card-box">
                            <span className="details">Ecole</span>
                            <input type="text" placeholder="Ecole" />
                        </div>
                        <div className="card-box">
                            <span className="details">Centre</span>
                            <input type="text" placeholder="Centre" />
                        </div>
                        <div className="card-box">
                            <span className="details">N° place</span>
                            <input type="text" placeholder="Numéro de place" />
                        </div>
                        <div className="card-box">
                            <span className="details">Date et lieu de naissance</span>
                            <input type="text" placeholder="Date et lieu de naissance" />
                        </div>
                        <div className="card-box">
                            <span className="details">Nom et prenom du père</span>
                            <input type="text" placeholder="Entrer le nom complet du père" />
                        </div>
                        <div className="card-box">
                            <span className="details">Nom et prenom de la mère</span>
                            <input type="text" placeholder="Entrer le nom complet de la mère" />
                        </div>
                        <div className="card-box">
                            <span className="details">Session</span>
                            <input type="text" placeholder="Session de" />
                        </div>
                        <div className="card-box">
                            <span className="details">Date de délivrance</span>
                            <input type="text" placeholder="Date de délivrance" />
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Génerer diplôme" onClick={() => this.loadDiplome} />
                    </div>
                </form >
            </div >
        );
    }
}

export default Formulaire;