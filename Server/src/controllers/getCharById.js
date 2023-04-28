const axios = require('axios');
const { URL_BASE, API_KEY } = process.env;

const getCharById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios(`${URL_BASE}/character/${id}?key=${API_KEY}`)
      
    if(!data.name) throw new Error(`ID: ${id} Not found`)

    const character = {
        id: data.id.toString(), 
        name: data.name,
        gender: data.gender, 
        species: data.species, 
        origin: data.origin, 
        image: data.image, 
        status: data.status
      }
    return res.status(200).json(character)
    
  } catch (error) {
    return error.message.includes('ID')
    ? res.status(404).send(error.message)
    : res.status(500).send(error.response.data.error)
  }
}

module.exports = getCharById