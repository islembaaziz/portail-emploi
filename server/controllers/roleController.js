import roleModel from '../models/roleModel.js';

// ====== CREATE ROLE ======
export const createRoleController = async (req, res, next) => {
  const {name } = req.body;
  if (!name) {
    next('Please Provide a role name');
  }
  req.body.createdBy = req.user.userId;
  const role = await roleModel.create(req.body);
  res.status(201).json({ role });
};

// ====== GET ALL ROLES ======
export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await roleModel.find();
    res.status(200).json({ roles });
  } catch (error) {
    next(error);
  }
};