import { Pagination } from "./common.interface";

export enum ArticleErrorCode {
  CREATE_NEW_ARTICLE_ERROR = 'CREATE_NEW_ARTICLE_ERROR',
  ARTICLE_NOT_FOUND_ERROR = 'ARTICLE_NOT_FOUND_ERROR',
  ARTICLE_UPDATE_ERROR = 'ARTICLE_UPDATE_ERROR',
  ARTICLE_DELETED_ERROR = 'ARTICLE_DELETED_ERROR',
  GET_ARTICLES_ERROR = 'GET_ARTICLES_ERROR',
}

export interface ArticleDTO {
  id: string;
  author: Author;
  image: string;
  headline: string;
  subhead: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  profileImage: string;
}

export interface NewArticle {
  author: string;
  image: string;
  headline: string;
  subhead: string;
  content: string;
  isDeleted: boolean;
}

export interface UpdateArticle {
  image: string;
  headline: string;
  subhead: string;
  content: string;
}

export interface UpdateArticleDeleted {
  isDeleted: boolean;
}

export interface FindArticles {
  page: number;
  limit: number;
  author: string;
  headline: string;
  isDeleted: boolean;
  search: string;
}

export interface ListArticles {
  pagination: Pagination;
  articles: ArticleDTO[];
}