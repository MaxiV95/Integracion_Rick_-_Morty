require("dotenv").config(); // process.env
const { User, Favorite } = require("../DB_connection");

const postFav = async (req, res) => {
  try {
    const {
      id,
      name,
      origin,
      status,
      image,
      species,
      gender,
      location,
      userId,
    } = req.body;
    // body - > id del userId

    if (!id || !name || !origin || !status || !image || !species || !gender)
      return res
        .status(STATUS_ERROR)
        .json({ message: "The require information is missing" });

    const character = {
      id,
      name,
      origin,
      status,
      image,
      species,
      gender,
      location,
    };
    const char = await Favorite.create(character);

    if (userId) {
      const user = await User.findByPk(userId);
      if (user) {
        // ***********************
        // ACA SE CREA LA RELACION
        await user.addFavorite(char);
      }
    }

    const favorites = await Favorite.findAll();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getFavs = async (req, res) => {
  try {
    const { idUser } = req.quer;
    if (!idUser) return res.status(400).json({ message: "id not found" });

    const favorites = await Favorite.findAll({
      include: [{ model: User, where: { id: idUser }}]
    });
    
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteFav = async (req, res) => {
  try {
    const { id } = req.params;
    const { idUser } = req.quer;

    if (!id) return res.status(400).json({ message: "id not found" });

    const fav = await Favorite.findByPk(id);
    if (fav) await fav.removeUser( idUser );

    const favorites = await Favorite.findAll();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  postFav,
  getFavs,
  deleteFav,
};
/*
Crea una función llamada postFav que reciba por parámetro los objetos req y res.
Agrega en tu arreglo de favoritos el personaje que estarás recibiendo por Body.
Finalmente devuelve tu arreglo de favoritos en formato JSON.
Crea una función llamada deleteFav que reciba por parámetro los objetos req y res.
Filtra a tus personajes favoritos de manera que elimines aquel que tiene el mismo 
id que recibes por Params.
Finalmente devuelve tu arreglo de favoritos en formato JSON.

Exporta ambas funciones.
*/
