const express = require("express");
const userModel = require("./models");
const User = require("./models");
// const { ObjectId } = require('mongodb');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const { ObjectId } = mongoose.Types;


app.use(bodyParser.json());

app.put('/reset-password', async (req, res) => {
  const { username, newPassword } = req.body;

  try {
    // Kullanıcıyı kullanıcı adına göre bul
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // resetToken değerini ObjectId olarak değiştir
    user.resetToken = new ObjectId();
    user.resetTokenExpires = Date.now() + 3600000; // 1 saatlik süre ekleyebilirsiniz

    // Yeni şifreyi ayarla
    user.password = newPassword;
    await user.save();

    return res.json({ message: 'Şifre başarıyla sıfırlandı.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});







// app.post("/users", async (request, response) => {
//   const user = new userModel(request.body);

//   try {
//     await user.save();
//     response.send(user);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

app.get("/users", async (request, response) => {
  const users = await userModel.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});


// app.put("/users/:id", async (request, response) => {
//   const { id } = request.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return response.status(400).send("Geçersiz id");
//   }

//   const users = await userModel.findByIdAndUpdate( id, { name: 'Furkan A.' }, { new: true });

//   try {
//     response.send(users);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });


// app.delete("/users/:user_id", async (request, response) => {
//   const { user_id } = request.params;

//   if (!ObjectId.isValid(user_id)) {
//     return response.status(400).send("Geçersiz id");
//   }

//   try {
//     const deletedUser = await userModel.findByIdAndDelete(user_id);
//     response.send(deletedUser);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });



module.exports = app;