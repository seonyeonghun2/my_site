const mongoose = require("mongoose");
// mongoose.set("debug", true);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      authSource: "admin",
      serverSelectionTimeoutMS: 50000
    });
    console.log("=================== DB 연결 성공 =================");
    if (!conn) {
      console.log("=================== DB 연결 실패 =================");
    }
  } catch (err) {
    console.log("=================== DB 연결 오류 =================");
    console.log(err);
  }
};

module.exports = connectDB;
