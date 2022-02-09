const bcrypt = require("bcrypt");

// password bcrypt use this code in your db action

const getSalt = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash("123456", salt);
  console.log(hashPassword);
};

getSalt();
