import axios from "axios";

const URL = process.env.REACT_APP_URL

export const getDiplomes = async () => {
    const response = await axios.get(URL + "diplomes");
    return response.data;
};

export const saveDiplome = async (diplome) => {
    try {
        const response = await axios.post(URL + "diplome", {
            nom: diplome.nom,
            date_nais: diplome.date_nais,
            lieu: diplome.lieu,
            matricule: diplome.matricule,
            dp: diplome.dp,
            session: diplome.session,
            filiere: diplome.filiere,
            mention: diplome.mention,
            date_deliv: diplome.date_deliv,
            qr_code: diplome.qr_code,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateDiplome = async (diplome) => {
    try {
        const response = await axios.patch(
            URL + `diplome/${diplome.id}`,
            {
                nom: diplome.nom,
                date_nais: diplome.date_nais,
                lieu: diplome.lieu,
                matricule: diplome.matricule,
                dp: diplome.dp,
                session: diplome.session,
                filiere: diplome.filiere,
                mention: diplome.mention,
                date_deliv: diplome.date_deliv,
                qr_code: diplome.qr_code,
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteDiplome = async (id) => {
    try {
        const response = await axios.delete(URL + `diplome/${id}`);
        console.log('**************\nthis is te reponse: ' + response)
        return response.data;
    } catch (error) {
        console.log('**********************\n this is the error' + error);
        return null;
    }
};

