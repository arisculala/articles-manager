import { Request, Response } from 'express';
import { HttpStatusCode } from '../lib/httpstatus';
import ControllerErrorHandler from '../utils/controller_error_handler';
import UserService from '../services/user.service';

class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(HttpStatusCode.Created).json(user);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getUser(req.params.id);
      res.status(HttpStatusCode.OK).json(user);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getFilteredUsers(req.body);
      res.json(users);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await this.userService.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async updateUserPassword(req: Request, res: Response): Promise<void> {
    try {
      const updatedUserPassword = await this.userService.updateUserPassword(req.params.id, req.body);
      res.json(updatedUserPassword);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async updateUser2FA(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser2FA = await this.userService.updateUser2FA(req.params.id, req.body);
      res.json(updatedUser2FA);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUserDeleted = await this.userService.deleteUser(req.params.id, true);
      res.json(updatedUserDeleted);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async restoreUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUserDeleted = await this.userService.deleteUser(req.params.id, false);
      res.json(updatedUserDeleted);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  async getUserByUsernamePassword(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getUserByUsernamePassword(req.body);
      res.json(user);
    } catch (error: unknown) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }
}

export default UserController;
