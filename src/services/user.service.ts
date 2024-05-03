import { v4 as uuidv4 } from 'uuid';
import { StandardError } from '../utils/standard_error';
import { HttpStatusCode } from '../lib/httpstatus';
import UserRepository from '../repositories/user.repository';
import {
  FindUserByUsernamePassword,
  FindUsers,
  ListUsers,
  NewUser,
  UpdateUser,
  UpdateUser2FA,
  UpdateUserPassword,
  User,
  UserErrorCode,
} from '../interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { SuccessResponse } from 'src/interfaces/common.interface';

class UserService {
  private static readonly defaultProfileImage: string = process.env.DEFAULT_PROFILE_IMAGE || 'default.jpg';
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(newUser: NewUser): Promise<User> {
    try {
      const userToInsert: User = {
        id: uuidv4(),
        ...newUser,
        isDeleted: false,
        is2FAEnable: false,
        username: newUser.email,
        profileImage: newUser.profileImage || UserService.defaultProfileImage,
      };
      return await this.userRepository.insert(userToInsert);
    } catch (error) {
      throw new StandardError({
        code: UserErrorCode.CREATE_NEW_USER_ERROR,
        message: 'Error encountered creating new user.',
        status: HttpStatusCode.InternalServerError,
        error: error,
      });
    }
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new StandardError({
        code: UserErrorCode.USER_NOT_FOUND_ERROR, 
        message: `User with id ${id} not found.`,
        status: HttpStatusCode.NotFound,
      });
    }
    return user;
  }

  async getFilteredUsers(filter: FindUsers): Promise<ListUsers> {
    try {
      const filterUser = new UserEntity();
      filterUser.isDeleted = filter.isDeleted;
      filterUser.is2FAEnable = filter.is2FAEnable;

      const [users, total]  = await this.userRepository.findAll(filter.page, filter.limit, filterUser);

      const listUsers: ListUsers = {
        pagination: {
          page: filter.page,
          perPage: filter.limit,
          totalPages: Math.ceil(total / filter.limit),
          totalItems: total,
        },
        users,
      };

      return listUsers;
    } catch (error) {
      throw error;
    }
  }

  async updateUserPassword(id: string, updateUserPassword: UpdateUserPassword): Promise<SuccessResponse> {
    // validate if user exist
    let user;
    try {
      user = await this.getUser(id);
    } catch (error) {
      throw error;
    }

    // validate if user current password is the same
    if (updateUserPassword.currentPassword !== user.password) {
      throw new StandardError({
        code: UserErrorCode.USER_CURRENT_PASSWORD_DOES_NOT_MATCH_ERROR,
        message: `User current password does not match`,
        status: HttpStatusCode.Conflict,
        error: null,
      });
    }

    // validate if user new password and reenter new password match
    if (updateUserPassword.newPassword !== updateUserPassword.reEnterNewPassword) {
      throw new StandardError({
        code: UserErrorCode.USER_NEW_PASSWORD_DOES_NOT_MATCH,
        message: `User new password and reenter new password does not match`,
        status: HttpStatusCode.Conflict,
        error: null,
      });
    }

    try {
      const newUserPassword = {
        password: updateUserPassword.newPassword,
      }
      const updatedUser = await this.userRepository.updateUser(id, newUserPassword);
      const isSuccess = updatedUser.affected === 1;
      return {
        success: isSuccess
      }
    } catch (error) {
      throw new StandardError({
        code: UserErrorCode.USER_PASSWORD_UPDATE_ERROR,
        message: `Error encountered updating user password with id ${id}`,
        status: HttpStatusCode.InternalServerError,
        error: error,
      });
    }
  }

  async updateUser2FA(id: string, updateUser2FA: UpdateUser2FA): Promise<SuccessResponse> {
    // validate if user exist
    try {
      await this.getUser(id);
    } catch (error) {
      throw error;
    }

    try {
      const updatedUser2FA = {
        is2FAEnable: updateUser2FA.is2FAEnable,
      }
      const updatedUser = await this.userRepository.updateUser(id, updatedUser2FA);
      const isSuccess = updatedUser.affected === 1;
      return {
        success: isSuccess
      }
    } catch (error) {
      throw new StandardError({
        code: UserErrorCode.USER_2FA_UPDATE_ERROR,
        message: `Error encountered updating user 2FA with id ${id}`,
        status: HttpStatusCode.InternalServerError,
        error: error,
      });
    }
  }

  async updateUser(id: string, updateUserData: UpdateUser): Promise<SuccessResponse> {
    // validate if user exist
    try {
      await this.getUser(id);
    } catch (error) {
      throw error;
    }

    try {
      const updatedUser = await this.userRepository.updateUser(id, updateUserData);
      const isSuccess = updatedUser.affected === 1;
      return {
        success: isSuccess
      }
    } catch (error) {
      throw new StandardError({
        code: UserErrorCode.USER_UPDATE_ERROR,
        message: `Error encountered updating user with id ${id}`,
        status: HttpStatusCode.InternalServerError,
        error: error,
      });
    }
  }

  async deleteUser(id: string, isDelete: boolean): Promise<SuccessResponse> {
    // validate if user exist
    try {
      await this.getUser(id);
    } catch (error) {
      throw error;
    }

    try {
      const updatedUserDeleted = {
        isDeleted: isDelete,
      }
      const updatedUser = await this.userRepository.updateUser(id, updatedUserDeleted);
      const isSuccess = updatedUser.affected === 1;
      return {
        success: isSuccess
      }
    } catch (error) {
      throw new StandardError({
        code: UserErrorCode.USER_DELETED_ERROR,
        message: `Error encountered updating user deleted flag with id ${id}`,
        status: HttpStatusCode.InternalServerError,
        error: error,
      });
    }
  }

  /**
   * Get user by username and password
   * @param filter 
   * @returns 
   */
  async getUserByUsernamePassword(filter: FindUserByUsernamePassword): Promise<User> {
    try {
      const filterUser = new UserEntity();
      filterUser.username = filter.username;
      filterUser.password = filter.password;

      const [users, total]  = await this.userRepository.findByUsernamePassword(filterUser);
      if (!users[0]) {
        throw new StandardError({
          code: UserErrorCode.USER_NOT_FOUND_ERROR, 
          message: `User not found.`,
          status: HttpStatusCode.NotFound,
        });
      }
      return users[0];
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
