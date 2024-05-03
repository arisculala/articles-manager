import Joi from 'joi';

export const ArticleIdParamSchema = Joi.object({
  id: Joi.string().uuid().trim().required(),
});

export const CreateArticleSchema = Joi.object({
  author: Joi.string().required(),
  image: Joi.string().required(),
  headline: Joi.string().required(),
  subhead: Joi.string().optional(),
  content: Joi.string().required(),
});

export const UpdateArticleInfoSchema = Joi.object({
  image: Joi.string().optional(),
  headline: Joi.string().optional(),
  subhead: Joi.string().optional(),
  content: Joi.string().optional(),
});

export const GetArticlesParamSchema = Joi.object({
  page: Joi.number().min(1).required(),
  limit: Joi.number().min(1).max(50).required(),
  isDeleted: Joi.boolean().optional(),
  author: Joi.string().uuid().trim().optional(),
  search: Joi.string().trim().optional(),
});

export const UpdateArticleDeletedSchema = Joi.object({
  isDeleted: Joi.boolean().required(),
});