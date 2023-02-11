const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://jimta:J1mta23@cluster0.semx3ru.mongodb.net/miapp?retryWrites=true&w=majority"
);

const User = mongoose.model("User", {
  username: String,
  edad: Number,
});

const crear = async () => {
  const user = new User({ username: "Elena Fernández", edad: 48 });
  const saveUser = await user.save();
  console.log(saveUser);
};

// crear();

const busrcarTodo = async () => {
    const users = await User.find()
    console.log(users);
}

//busrcarTodo();

const buscar = async () => {
    const user = await User.find({ username: 'Jose Ignacio' });
    console.log(user);
}

//buscar();

const buscaruno = async () => {
  const user = await User.findOne({ username: "Jose Ignacio" });
  console.log(user);
};

//buscaruno();

const actualizar = async () => {
  const user = await User.findOne({ username: "Jose Ignacio" });
  console.log(user);
  user.edad = 55;
  await user.save();
};

//actualizar();

const eliminar = async () => {
  const user = await User.findOne({ username: "Elena Fernández" });
  console.log(user);
  if (user) {
    await user.remove();
  }
};

eliminar();