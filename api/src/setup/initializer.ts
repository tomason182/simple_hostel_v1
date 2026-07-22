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
import { nodeMailerConfig } from "../infraestructure/config/nodeMailerConfig";


export class Initializer {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }


  private async initIntances() {
    const userRepository = new UserRepositoryPostgreSQL(this.uow);
    const propertyRepository = new PropertyRepository(this.uow);
    const accessControlRepository = new AccessControlRepository(this.uow);

    const config = nodeMailerConfig();
    const emailRepository = new EmailServiceSMTP(config);

    const emailService = new EmailService(emailRepository);

    const accountService = new AccountService(userRepository, propertyRepository, accessControlRepository, emailService);
    const userService = new UserService(userRepository, accessControlRepository, propertyRepository, emailService);
    const propertyService = new PropertyService(propertyRepository, accessControlRepository);

    const accountController = new AccountController(accountService);
    const userController = new UserController(userService);
    const propertyController = new PropertyController(propertyService);


  }
}
