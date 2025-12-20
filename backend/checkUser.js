const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const fs = require("fs");
require("dotenv").config();

async function checkUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const email = "ibrahimytemail@gmail.com";
    const user = await userModel.findOne({ email });

    let output = "";
    if (!user) {
      output = `User with email ${email} not found.`;
    } else {
      output = `User found: ${user.email}, Role: ${user.role}`;
    }
    fs.writeFileSync("user_check_output.txt", output);
  } catch (err) {
    fs.writeFileSync("user_check_output.txt", "Error: " + err.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkUser();
