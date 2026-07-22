import { UnitOfWork } from "../infraestructure/transactions/UnitOfWork";

import { UserRepositoryPostgreSQL } from "../infraestructure/repositories/UserRepository";
import { PropertyRepository } from "../infraestructure/repositories/PropertyRepository";
import { AccessControlRepository } from "../infraestructure/repositories/AccessControlRepository";

import { AccountService } from "../services/AccountService";
import { PropertyService } from "../services/PropertyService";
import { UserService } from "../services/UserService";

import { AccountController } from "../controllers/AccountController";
import { PropertyController } from "../controllers/PropertyController";
import { UserController } from "../controllers/UserController";

import { EmailServiceSMTP } from "../infraestructure/email/EmailRepositorySMTP";
import { EmailService } from "../services/EmailService";


export class Initializer {
  public readonly accountController: AccountController;
  public readonly userController: UserController;
  public readonly propertyController: PropertyController;

  constructor(private readonly uow: UnitOfWork, private readonly emailRepository: EmailServiceSMTP) {
    this.uow = uow;
    this.emailRepository = emailRepository;


    const userRepository = new UserRepositoryPostgreSQL(this.uow);
    const propertyRepository = new PropertyRepository(this.uow);
    const accessControlRepository = new AccessControlRepository(this.uow);

    const emailService = new EmailService(this.emailRepository);

    const accountService = new AccountService(userRepository, propertyRepository, accessControlRepository, emailService);
    const userService = new UserService(userRepository, accessControlRepository, propertyRepository, emailService);
    const propertyService = new PropertyService(propertyRepository, accessControlRepository);

    this.accountController = new AccountController(accountService);
    this.userController = new UserController(userService);
    this.propertyController = new PropertyController(propertyService);

  }

}
