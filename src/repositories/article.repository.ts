import { ArticleEntity } from '../entities/article.entity';
import { Connection, FindManyOptions, ILike, Repository, UpdateResult } from 'typeorm';

class ArticleRepository {
  save(articleToInsert: ArticleEntity) {
    throw new Error('Method not implemented.');
  }
  private articleRepository: Repository<ArticleEntity>;

  constructor(private connection: Connection) {
    this.articleRepository = this.connection.getRepository(ArticleEntity);
  }

  /**
   * Insert new article
   * @param newArticle - partial new article info
   * @returns 
   */
  async insert(newArticle: Partial<ArticleEntity>): Promise<ArticleEntity> {
    try {
      const insertArticle = this.articleRepository.create(newArticle); // Create a new article entity instance
      const savedArticle = await this.articleRepository.save(insertArticle); // Save the new article entity to the database
      return savedArticle;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get article info
   * @param id - unique uuid of the article
   * @returns 
   */
  async findOne(id: string): Promise<ArticleEntity | null> {
    try {
      const article = await this.articleRepository.findOne({ where: { id: id } });
      return article;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find list of articles with pagination based on filter
   * @param page 
   * @param limit 
   * @param filter 
   * @returns 
   */
  async findAll(page: number, limit: number, filter?: Partial<ArticleEntity>): Promise<[ArticleEntity[], number]> {
    try {
        // calculate the offset based on page number and limit
        const offset = (page - 1) * limit;

        // create options for find query
        const options: FindManyOptions<ArticleEntity> = {
            where: { ...filter }, // apply filter if provided
            take: limit,   // limit the number of results
            skip: offset,  // skip records based on offset
            relations: ['user'],
            order: { updatedAt: 'DESC' },
        };

        // If filter contains author, add it to the where condition
        if (filter?.author) {
          options.where = { ...options.where, author: filter.author };
        }

        // If filter contains headline, add it to the where condition
        if (filter?.headline) {
          options.where = { ...options.where, headline: ILike(`%${filter.headline}%`) };
        }

        // If filter contains subhead, add it to the where condition
        if (filter?.subhead) {
          options.where = { ...options.where, subhead: ILike(`%${filter.subhead}%`) };
        }

        // If filter contains content, add it to the where condition
        if (filter?.content) {
          options.where = { ...options.where, content: ILike(`%${filter.content}%`) };
        }

        // find articles based on options
        return await this.articleRepository.findAndCount(options);
    } catch (error) {
        throw error;
    }
  }

  /**
   * Update specific article data of the given unique article id
   * @param id 
   * @param updateData 
   * @returns 
   */
  async updateArticle(id: string, updateData: Partial<ArticleEntity>): Promise<UpdateResult> {
    try {
      const result = await this.articleRepository.update(id, updateData);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default ArticleRepository;
