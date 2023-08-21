export default class Diplome {
    constructor(id, nom, date_nais, lieu, matricule, dp, session, filiere, mention, date_deliv, qr_code) {
        this.id = id;
        this.nom = nom;
        this.date_nais = date_nais;
        this.lieu = lieu;
        this.matricule = matricule;
        this.dp = dp;
        this.session = session;
        this.filiere = filiere;
        this.mention = mention;
        this.date_deliv = date_deliv;
        this.qr_code = qr_code;
    }
}