// this file holds basically an admin seeder function for now.
const mongoose = require("mongoose");
const argon2 = require("argon2");

mongoose
  .connect(
    `mongodb+srv://bettercallpaul:sQOkWzfk5e6FTuRW@bcp-dev.el8ezcc.mongodb.net/bcb-dev`
  )
  .then(() => console.log(`connected successfully`))
  .catch((e) => console.log("error while connecting to db"));

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
    name: {
      type: String,
      required: false,
    },
    subId: {
      type: String,
      required: false,
      default: "",
    },
    photo: { type: String, required: false },
    role: {
      type: String,
      enum: ["admin", "operator"],
      default: "admin",
    },
  },
  { timestamps: true }
);

userSchema.methods.genToken = function genToken() {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.NEXT_PUBLIC_JWT_SECRET,
    { expiresIn: "7d" }
  );
};

userSchema.methods.toJson = function toJson() {
  return {
    email: this.email,
    id: this._id,
    token: this.genToken(),
  };
};

const User = mongoose.model("User", userSchema);

async function adminSeeder(admin) {
  try {
    const hashedPassword = await argon2.hash(admin.password);

    const newUser = new User({
      email: admin.email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("seeded admin successfully");

    mongoose.connection.close();
  } catch (e) {
    throw e;
  }
}

const admin = {
  email: "admin@admin.com",
  password: "testpassword",
};

adminSeeder(admin).catch((e) => console.log(`Something went wrong`));
