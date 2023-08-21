import axios from "axios";

export const getUsers = async () => {
  const response = await axios.get("http://127.0.0.1/users");
  return response.data;
};

export const saveUser = async (user) => {
  try {
    const response = await axios.post("http://127.0.0.1/user", {
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
      `http://127.0.0.1/user/${user.id}`,
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
    const response = await axios.delete(`http://127.0.0.1/user/${id}`);
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
      `http://127.0.0.1/userByLoginAndPass/`,
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
