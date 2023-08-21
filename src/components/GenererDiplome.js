import React, { useEffect } from 'react';
import "../css/genererdiplome.css";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from "react-bootstrap/esm/Button";
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bulma/css/bulma.css";
// import jsPDF from 'jspdf';
import QRCode from "qrcode.react";
import html2pdf from 'html2pdf.js';

function GenererDiplome() {

    const [nom, setNom] = useState("");
    const [date_nais, setDate_nais] = useState("");
    const [lieu, setLieu] = useState("");
    const [matricule, setMatricule] = useState("");
    const [dp, setDp] = useState("");
    const [session, setSession] = useState("");
    const [filiere, setFiliere] = useState("");
    const [mention, setMention] = useState("");
    const [date_deliv, setDate_deliv] = useState("");
    const [qrcodeValue, setQrcodeValue] = useState("");
    const { id } = useParams();


    useEffect(() => {
        getDiplomeById();
        console.log('id diplome: ' + id);
    }, []);

    // const generateDiplome = () => {
    //     let doc = new jsPDF("l", "pt", "a4");
    //     doc.html(document.querySelector("#pd"), {
    //         callback: function (pdf) {
    //             let pageCount = doc.internal.getNumberOfPages();
    //             pdf.deletePage(pageCount);
    //             pdf.save(nom + ".pdf");
    //         }
    //     });
    // };

    // const generateDiplome2 = () => {
    //     window.onload = function () {
    //         let doc = new jsPDF("l", "pt", "a4");
    //         doc.addHTML(document.querySelector("#pd"), function () {
    //             doc.save( nom + ".pdf");
    //         });
    //     }
    // };

    const generateDiplome3 = () => {
        const element = document.getElementById('pageContent');
        const options = {
            filename: nom + '.pdf',
            image: {
                type: 'jpeg', quality: 0.98
            },
            html2canvas: { scale: 1 },
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'landscape' }
        };
        html2pdf().from(element).set(options).save();
    }

    const getDiplomeById = async () => {
        const response = await axios.get(`http://127.0.0.1/diplome/${id}`);
        setNom(response.data.nom);
        setDate_nais(response.data.date_nais);
        setLieu(response.data.lieu);
        setMatricule(response.data.matricule);
        setDp(response.data.dp);
        setSession(response.data.session);
        setFiliere(response.data.filiere);
        setMention(response.data.mention);
        setDate_deliv(response.data.date_deliv);
        setQrcodeValue(response.data.qr_code);
    }


    return (
        <>
            <div className="row">
                <div className="col-sm-7">
                    <h2 className="text-right display-4">
                        Diplome
                    </h2>
                </div>
                <div className="col-sm-3">
                    <br />
                    <Button style={{ textAlign: "right" }}
                        className="Button"
                        variant="success"
                        onClick={generateDiplome3}
                    >telecharger
                        <i className="bi bi-file-text"></i>
                    </Button>
                </div>
                <div className="col-sm-2"></div>
            </div>
            <br />

            <div id="pageContent" className="div">
                <div className="row">
                    <div className="col-sm-2">
                        <img id='image' src="/images/esgic.png" alt="Diplome Logo" />
                    </div>
                    <div className="col-sm-5">
                        <h5 style={{ color: "blue" }}>Ecole Superieur de Gestion, d'Informatique et de Comptabilité <br /></h5>
                        <h6 style={{ textAlign: "center" }}>Agrément N°03-1248 / MEN-SG</h6>
                        <h6 style={{ textAlign: "center" }}>
                            BPE 895 - Tel:(223) 20 23 01 71 / 66 72 17 58 <br />
                            Site : <a style={{ textAlign: "center" }} href='wwww.esgicbmako.com'>wwww.esgicbmako.com</a><br />
                            Email : <a style={{ textAlign: "center" }} href='comptacamara@afribone.net.ml'>comptacamara@afribone.net.ml</a>
                        </h6>
                    </div>
                    <div className="col-sm-5">
                        <h5 >REPUBLIQUE DU MALI<br />Un Peuple - Un But - Une Foi</h5>
                        <h5 >Ministère de l'Enseignement Supérieur<br /> et de la Recherche Scientifique </h5>
                        <div className="row pr-5">
                            <div className="col-sm-6">
                                {/* azerty */}
                            </div>
                            <div className="col-sm-6">
                                <br />
                                <h6 style={{ textAlign: "center", background: 'gray', padding: 4 }}>N° {id}A/CP-ESGIC</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-2'><QRCode className='h-50 w-75 pl-3' value={qrcodeValue} /></div>
                    <div className='col-sm-10 pt-3'> <br /><h1 id="h3"> ATTESTATION DU DIPLOME</h1></div>
                </div>
                <br />
                <hr className='horizontal-ligne' />
                <br />
                {/* <hr id='hr'></hr>  */}
                <h5 style={{ textAlign: "center", paddingLeft: 5 + "px" }}>Nous soussignés, Ecome Superieur de Gestion, d'Informatique et Comptabilité(ESGIC ), attestons que <strong>Mr/Mlle/Mme</strong> </h5>
                <h3 style={{ textAlign: "center" }}><strong>{nom} né(e) le {date_nais}</strong></h3>
                <h4 style={{ textAlign: "center" }}><strong>à {lieu} - <u>N°Mle :</u> {matricule}/UT</strong></h4>
                {dp === "DUT" ? (
                    <h5 style={{ textAlign: "center" }}>à été déclaré(e) définitivement admis(e) à l'examin de fin de cycle du <br /> {dp}(Diplome Universitaire de Technologie) de l'ESGIC. </h5>
                ) : (
                    <h5 style={{ textAlign: "center" }}>à été déclaré(e) définitivement admis(e) à l'examin de fin de cycle du <br /> {dp} de l'ESGIC. </h5>
                )}
                <div className="row">
                    <div className="col-sm-6">
                        <h5 style={{ paddingLeft: 20 + "px" }}><strong><u>Session de </u>: {session} - Centre de l'ESGIC</strong></h5>
                    </div>
                    <div className="col-sm-6">
                        <h5><strong><u>Filière </u>: {filiere}</strong></h5>
                    </div>
                </div>
                <h4 style={{ textAlign: "center", color: "red" }}><strong><u>Mention </u>: {mention}</strong></h4>
                <h5 style={{ textAlign: "center" }}>En foi de quoi la présente attestation lui est délivré pour servir et valoir ce que de droit.</h5>
                <h6 style={{ textAlign: "right", paddingRight: 20 + "px" }}>Bamako, le <strong>{date_deliv}</strong></h6>
                <div className="row">
                    <div className="col-sm-4">
                        <h5 style={{ textAlign: 'left', paddingLeft: 5 + "px" }}><strong>Le Directeur des Etudes</strong></h5>
                        <br />
                        <br />
                        <h5 style={{ textAlign: 'left', paddingLeft: 5 + "px", paddingBottom: 15.5 +'px' }}><strong>Aguibou OUATTARA</strong></h5>
                        
                    </div>
                    <div className="col-sm-5">
                        <img style={{ width: 120 + "px", height: 50 + "px", marginLeft: 110 + "px" }} src="/golde_medail2_reduit.jpeg" alt="Médaille" />
                        <h4 style={{ textAlign: "center", fontSize: 14 + "px", marginTop: 0 + "px" }}><br /><br /><strong><u>NB</u>: La présente attestation n'est délivrée q'une seule fois.</strong></h4>
                    </div>
                    <div className="col-sm-3">
                        <h5 style={{ textAlign: "right", paddingRight: 5 + "px" }}><strong>Le Directeur Général</strong></h5>
                        <br />
                        <br />
                        <h5 style={{ textAlign: "right", paddingRight: 5 + "px", paddingBottom: 15.5 + 'px' }}><strong>Diakaridia CAMARA</strong></h5>
                       
                    </div>
                    
                </div>
            </div>

        </>
    );
}

export default GenererDiplome;