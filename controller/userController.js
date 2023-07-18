const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = [];
const secretkey = process.env.SECRETKEY;
const saltRounds = 10;

const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const isCorrectPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

//send userdata if token is valid
//otherwise send null if it invalid
const register = (req, res) => {
  try {
    const registerData = req.body;

    //validation of data or user input
    // if (
    //   registerData.name == null ||
    //   registerData.email == null ||
    //   registerData.phone == null ||
    //   registerData.password == null
    // ) {
    //   return res.status(403).send("<p>Plz provide complete information.</p>");
    // }

    const user = database.find((details) => {
      if (details.email == registerData.email) return details;
      //means that the first user object that matches the condition will be assigned to the user variable.
    });

    if (user) {
      return res.send("<p>User is already registered, plz try to login.</p> ");
    }

    const hash = hashPassword(registerData.password);

    const tempObj = {
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      password: hash,
    };

    database.push(tempObj);

    const registerToken = jwt.sign(
      { userEmail: registerData.email },
      secretkey,
      {
        expiresIn: "1h",
      }
    );
    console.log(database);
    return res.send({ database, registerToken });
  } catch (error) {
    console.log(error);
    return res.send("Internal server error.");
  }
};

const login = (req, res) => {
  try {
    const loginData = req.body;

    const user = database.find((details) => {
      if (details.email == loginData.email) return details;
    });

    if (!user) {
      return res
        .status(404)
        .send("<p>You are not registered with us, firstly registered.</p>");
    }

    const validate = isCorrectPassword(loginData.password, user.password);

    if (validate) {
      const loginToken = jwt.sign({ userEmail: loginData.email }, secretkey, {
        expiresIn: "1h",
      });
      return res.send({
        msg: "User is  logged in successfully.",
        token: loginToken,
      });
    }

    return res.status(403).send("<p>Password doesn't match.</p>");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error.");
  }
};

module.exports = {
  register,
  login,
};
