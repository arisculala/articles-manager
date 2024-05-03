import { UserEntity } from '../entities/user.entity';
import { Connection, FindManyOptions, Repository, UpdateResult } from 'typeorm';

class UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor(private connection: Connection) {
    this.userRepository = this.connection.getRepository(UserEntity);
  }

  /**
   * Insert new user
   * @param newUser - partial new user info
   * @returns 
   */
  async insert(newUser: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const insertUser = this.userRepository.create(newUser); // Create a new user entity instance
      const savedUser = await this.userRepository.save(insertUser); // Save the new user entity to the database
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user info
   * @param id - unique uuid of the user
   * @returns 
   */
  async findOne(id: string): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find list of users with pagination based on filter
   * @param page 
   * @param limit 
   * @param filter 
   * @returns 
   */
  async findAll(page: number, limit: number, filter?: Partial<UserEntity>): Promise<[UserEntity[], number]> {
    try {
        // calculate the offset based on page number and limit
        const offset = (page - 1) * limit;

        // create options for find query
        const options: FindManyOptions<UserEntity> = {
            where: filter, // apply filter if provided
            take: limit,   // limit the number of results
            skip: offset,  // skip records based on offset
        };

        // find users based on options
        return await this.userRepository.findAndCount(options);
    } catch (error) {
        throw error;
    }
  }

  /**
   * Update specific user data of the given unique user id
   * @param id 
   * @param updateData 
   * @returns 
   */
  async updateUser(id: string, updateData: Partial<UserEntity>): Promise<UpdateResult> {
    try {
      const result = await this.userRepository.update(id, updateData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find user by username and password
   * @param filter 
   * @returns 
   */
  async findByUsernamePassword(filter?: Partial<UserEntity>): Promise<[UserEntity[], number]> {
    try {
        // create options for find query
        const options: FindManyOptions<UserEntity> = {
            where: filter,
        };

        // find users based on options
        return await this.userRepository.findAndCount(options);
    } catch (error) {
        throw error;
    }
  }
}

export default UserRepository;
