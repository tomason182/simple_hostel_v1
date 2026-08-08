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

import { EmailService } from "../services/EmailService";
import { RoomTypeRepository } from "../infraestructure/repositories/RoomTypeRepository";
import { RoomTypeService } from "../services/RoomTypeService";
import { ReservationRepository } from "../infraestructure/repositories/ReservationRepository";
import { RoomTypeController } from "../controllers/RoomTypeController";


export class RequestContext {
  public readonly accountController: AccountController;
  public readonly userController: UserController;
  public readonly propertyController: PropertyController;
  public readonly roomTypeController: RoomTypeController;

  constructor(private readonly uow: UnitOfWork, private readonly emailService: EmailService) {
    this.uow = uow;
    this.emailService = emailService;


    const userRepository = new UserRepositoryPostgreSQL(this.uow);
    const propertyRepository = new PropertyRepository(this.uow);
    const accessControlRepository = new AccessControlRepository(this.uow);
    const roomTypeRepository = new RoomTypeRepository(this.uow);
    const reservationRespository = new ReservationRepository(this.uow);

    const accountService = new AccountService(userRepository, propertyRepository, accessControlRepository, this.emailService);
    const userService = new UserService(userRepository, accessControlRepository, propertyRepository, this.emailService);
    const propertyService = new PropertyService(propertyRepository, accessControlRepository);
    const roomTypeService = new RoomTypeService(roomTypeRepository, reservationRespository);

    this.accountController = new AccountController(accountService);
    this.userController = new UserController(userService);
    this.propertyController = new PropertyController(propertyService);
    this.roomTypeController = new RoomTypeController(roomTypeService);

  }

  public execute<T>(
    callback: () => Promise<T>,
    needTransaction = false
  ) {
    return this.uow.execute(callback, needTransaction);
  }

}
