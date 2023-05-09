const { User } = require("../DB_connection");

const login = async (req, res) => {
  const { password, email } = req.query;
  // /login?password=1234&email=www
  try {
    if (!password || !email)
      return res.status(401).json({ message: "Missing password or email" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Wrong email" });

    return user.password === password
      ? res.status(200).json({ access: true, id: user.id })
      : res.status(403).json({ message: "Wrong password" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/* const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) res.status(400).json({ message: "missing password or email" })
    
    const [user, created] = await User.findOrCreate({ where: { email, password }});
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
} 
*/

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) res.status(400).json({ message: "missing password or email" })

    const user = await User.create({ email, password });
    res.status(200).json({ user });

  } catch (error) {
    res.status(500).json({ message: error });
  }
}

module.exports = {
  login,
  postUser
};
