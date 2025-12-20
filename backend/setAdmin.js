const mongoose = require("mongoose");
const userModel = require("./models/userModel");
require("dotenv").config();

async function setAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const email = "ibrahimytemail@gmail.com";
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log(`User with email ${email} not found.`);
    } else {
      user.role = "ADMIN";
      await user.save();
      console.log(`User ${email} role updated to ADMIN.`);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from DB");
  }
}

setAdmin();
