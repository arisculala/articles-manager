import { Request, Response } from 'express';
import { HttpStatusCode } from '../lib/httpstatus';
import ControllerErrorHandler from '../utils/controller_error_handler';
import ArticleService from '../services/article.service';

class ArticleController {
  private articleService;

  constructor(articleService: ArticleService) {
    this.articleService = articleService;
  }

  async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const article = await this.articleService.createArticle(req.body);
      res.status(HttpStatusCode.Created).json(article);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async getArticle(req: Request, res: Response): Promise<void> {
    try {
      const article = await this.articleService.getArticle(req.params.id);
      res.status(HttpStatusCode.OK).json(article);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async getArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await this.articleService.getFilteredArticles(req.body);
      res.json(articles);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async updateArticle(req: Request, res: Response): Promise<void> {
    try {
      const updatedArticle = await this.articleService.updateArticle(req.params.id, req.body);
      res.json(updatedArticle);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async deleteArticle(req: Request, res: Response): Promise<void> {
    try {
      const updatedArticleDeleted = await this.articleService.deleteArticle(req.params.id, true);
      res.json(updatedArticleDeleted);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async restoreArticle(req: Request, res: Response): Promise<void> {
    try {
      const updatedArticleDeleted = await this.articleService.deleteArticle(req.params.id, false);
      res.json(updatedArticleDeleted);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }
}

export default ArticleController;
