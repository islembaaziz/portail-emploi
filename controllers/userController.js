import userModel from '../models/userModel.js';

export const updateUserController = async (req, res, next) => {
  const { name, lastName, email, adresse } = req.body;
  if (!name || !lastName || !email || !adresse) {
    next('Please Provide All Fields');
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.adresse = adresse;

  await user.save()
  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  })
}; 
