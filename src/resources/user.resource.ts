import Joi from 'joi';

export const UserIdParamSchema = Joi.object({
  id: Joi.string().uuid().trim().required(),
});

export const CreateUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
  is2FAEnable: Joi.boolean().optional(),
  phoneNumber: Joi.string().optional(),
  profileImage: Joi.string().optional().allow(null, ''),
});

export const UpdateUserInfoSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().optional(),
});

export const GetUsersParamSchema = Joi.object({
  page: Joi.number().min(1).required(),
  limit: Joi.number().min(1).max(50).required(),
  is2FAEnable: Joi.boolean().optional(),
  isDeleted: Joi.boolean().optional(),
});

export const UpdateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
  profileImage: Joi.string().optional(),
});

export const UpdatePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(10).required(),
  newPassword: Joi.string().min(10).required(),
  reEnterNewPassword: Joi.string().min(10).required(),
});

export const UpdateUserDeletedSchema = Joi.object({
  isDeleted: Joi.boolean().required(),
});

export const UpdateUser2FASchema = Joi.object({
  is2FAEnable: Joi.boolean().required(),
});

export const UserLoginSchema = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});