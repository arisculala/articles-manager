import { v4 as uuidv4 } from 'uuid';
import { StandardError } from '../utils/standard_error';
import { HttpStatusCode } from '../lib/httpstatus';
import ArticleRepository from '../repositories/article.repository';
import {
  FindArticles,
  ListArticles,
  NewArticle,
  ArticleErrorCode,
  UpdateArticle,
  ArticleDTO,
} from '../interfaces/article.interface';
import { ArticleEntity } from '../entities/article.entity';
import { SuccessResponse } from 'src/interfaces/common.interface';

class ArticleService {
  private articleRepository: ArticleRepository;

  constructor(articleRepository: ArticleRepository) {
    this.articleRepository = articleRepository;
  }

  async createArticle(newArticle: NewArticle): Promise<ArticleDTO> {
    try {
      const articleToInsert = {
        id: uuidv4(),
        ...newArticle,
        isDeleted: false,
      };
      const insertedArticle = await this.articleRepository.insert(articleToInsert);
      return this.mapToArticleDTO(insertedArticle);
    } catch (error) {
      throw new StandardError({
        code: ArticleErrorCode.CREATE_NEW_ARTICLE_ERROR,
        message: 'Error encountered creating new article.',
        status: HttpStatusCode.InternalServerError,
        error: error,
      });
    }
  }

  async getArticle(id: string): Promise<ArticleDTO> {
    const article = await this.articleRepository.findOne(id);
    if (!article) {
      throw new StandardError({
        code: ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR, 
        message: `Article with id ${id} not found.`,
        status: HttpStatusCode.NotFound,
      });
    }
    return this.mapToArticleDTO(article);
  }

  async getFilteredArticles(filter: FindArticles): Promise<ListArticles> {
    try {
      const filterArticle = new ArticleEntity();
      filterArticle.isDeleted = filter.isDeleted;
      if (filter.author) {
        filterArticle.author = filter.author;
      }
      if (filter.search) {
        // search will be done in headline, subhead, content
        filterArticle.headline = filter.search;
        filterArticle.subhead = filter.search;
        filterArticle.content = filter.search;
      }

      const [articles, total]  = await this.articleRepository.findAll(filter.page, filter.limit, filterArticle);

      // Map articles to DTO
      const mappedArticles: ArticleDTO[] = articles.map(article => ({
        id: article.id,
        image: article.image,
        headline: article.headline,
        subhead: article.subhead,
        content: article.content,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        author: {
          id: article.user.id,
          firstName: article.user.firstName,
          lastName: article.user.lastName,
          profileImage: article.user.profileImage,
        },
      }));

      // Return the list of mapped articles with pagination
      return {
        pagination: {
          page: filter.page,
          perPage: filter.limit,
          totalPages: Math.ceil(total / filter.limit),
          totalItems: total,
        },
        articles: mappedArticles,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateArticle(id: string, updateArticlePassword: UpdateArticle): Promise<SuccessResponse> {
    // validate if article exist
    let article;
    try {
      article = await this.getArticle(id);
    } catch (error) {
      throw error;
    }

    try {
      const newArticlePassword = {
        ...updateArticlePassword,
      }
      const updatedArticle = await this.articleRepository.updateArticle(id, newArticlePassword);
      const isSuccess = updatedArticle.affected === 1;
      return {
        success: isSuccess
      }
    } catch (error) {
      throw new StandardError({
        code: ArticleErrorCode.ARTICLE_UPDATE_ERROR,
        message: `Error encountered updating article password with id ${id}`,
        status: HttpStatusCode.InternalServerError,
        error: error,
      });
    }
  }

  async deleteArticle(id: string, isDelete: boolean): Promise<SuccessResponse> {
    // validate if article exist
    try {
      await this.getArticle(id);
    } catch (error) {
      throw error;
    }

    try {
      const updatedArticleDeleted = {
        isDeleted: isDelete,
      }
      const updatedArticle = await this.articleRepository.updateArticle(id, updatedArticleDeleted);
      const isSuccess = updatedArticle.affected === 1;
      return {
        success: isSuccess
      }
    } catch (error) {
      throw new StandardError({
        code: ArticleErrorCode.ARTICLE_DELETED_ERROR,
        message: `Error encountered updating article deleted flag with id ${id}`,
        status: HttpStatusCode.InternalServerError,
        error: error,
      });
    }
  }

  /**
   * Function to map ArticleEntity to ArticleDTO
   * @param article - ArticleEntity
   * @returns ArticleDTO object
   */
  private mapToArticleDTO(article: ArticleEntity): ArticleDTO {
    return {
      id: article.id,
      author: article.user, // Assuming author is already an Author object
      image: article.image,
      headline: article.headline,
      subhead: article.subhead,
      content: article.content,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };
  }
}

export default ArticleService;
