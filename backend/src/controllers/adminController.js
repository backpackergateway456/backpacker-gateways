const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
try {
const { username, password } = req.body;


const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminUsername || !adminPassword) {
  return res.status(500).json({
    message: "Admin credentials are not configured",
  });
}

if (
  username !== adminUsername ||
  password !== adminPassword
) {
  return res.status(401).json({
    message: "Invalid username or password",
  });
}

const token = jwt.sign(
  {
    username: adminUsername,
    role: "admin",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(200).json({
  message: "Login successful",
  token,
});


} catch (error) {
console.error("Admin login error:", error);


res.status(500).json({
  message: "Server error",
});


}
};

module.exports = {
adminLogin,
};
