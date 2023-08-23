import axios from "axios";

const URL = process.env.URL

export const getUsers = async () => {
  const response = await axios.get(URL + "users");
  return response.data;
};

export const saveUser = async (user) => {
  try {
    const response = await axios.post(URL + "user", {
      nom: user.nom,
      prenom: user.prenom,
      login: user.login,
      password: user.password,
      profil: user.profil,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = async (user) => {
  try {
    const response = await axios.patch(
      URL + `user/${user.id}`,
      {
        nom: user.nom,
        prenom: user.prenom,
        login: user.login,
        password: user.password,
        profil: user.profil,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(URL + `user/${id}`);
    console.log('**************\nthis is te reponse: ' + response)
    return response.data;
  } catch (error) {
    console.log('**********************\n this is the error'+error);
    return null;
  }
};

export const getUserByLoginAndPassword = async (login, passWord) => {
  try {
    const response = await axios.post(
      URL + `userByLoginAndPass/`,
      {
        login: login,
        password: passWord,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
