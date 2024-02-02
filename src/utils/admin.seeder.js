// this file holds basically an admin seeder function for now.
const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

mongoose
  .connect(
    "mongodb+srv://bettercallpaul:sQOkWzfk5e6FTuRW@bcp-dev.el8ezcc.mongodb.net/bcb-dev"
  )
  .then(() => console.log(`connected successfully`))
  .catch((e) => console.log("error while connecting to db"));

async function adminSeeder(admin) {
  try {
    const hashedPassword = await argon2.hash(admin.password);

    const newUser = new User({
      email: admin.email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("seeded admin successfully");
  } catch (e) {
    throw e;
  }
}

const admin = {
  email: "admin@admin.com",
  password: "testpassword",
};

adminSeeder(admin).catch((e) => console.log(`Something went wrong`));
