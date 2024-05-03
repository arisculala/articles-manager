import express from 'express';
import {
  CreateArticleSchema,
  GetArticlesParamSchema,
  ArticleIdParamSchema,
  UpdateArticleInfoSchema,
} from '../resources/article.resource';
import expressValidation from '../middlewares/express_validator.middleware';

import { app } from '../index';

const router = express.Router();

router.post(
  '/articles',
  expressValidation({
    body: CreateArticleSchema,
  }),
  (req, res) => app.get('articleController').createArticle(req, res),
);

router.get('/articles',
expressValidation({
  body: GetArticlesParamSchema,
}),
(req, res) => app.get('articleController').getArticles(req, res));

router.get('/articles/:id',
  expressValidation({
    params: ArticleIdParamSchema,
  }),
  (req, res) => app.get('articleController').getArticle(req, res));

router.put(
  '/articles/:id',
  expressValidation({
    params: ArticleIdParamSchema,
    body: UpdateArticleInfoSchema,
  }),
  (req, res) => app.get('articleController').updateArticle(req, res),
);

router.delete('/articles/:id',
  expressValidation({
    params: ArticleIdParamSchema,
  }),
  (req, res) => app.get('articleController').deleteArticle(req, res),
);

router.put(
  '/articles/:id/restore',
  expressValidation({
    params: ArticleIdParamSchema
  }),
  (req, res) => app.get('articleController').restoreArticle(req, res),
);

export default router;
