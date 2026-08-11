import { UnitOfWork } from "../infraestructure/transactions/UnitOfWork";

import { UserRepositoryPostgreSQL } from "../infraestructure/repositories/UserRepository";
import { RatesAndAvailabilityRepository } from "../infraestructure/repositories/RatesAndAvailabilityRepository";
import { RoomTypeRepository } from "../infraestructure/repositories/RoomTypeRepository";
import { PoliciesRepository } from "../infraestructure/repositories/PoliciesRepository";
import { PropertyRepository } from "../infraestructure/repositories/PropertyRepository";
import { AccessControlRepository } from "../infraestructure/repositories/AccessControlRepository";

import { AccountService } from "../services/AccountService";
import { PoliciesService } from "../services/PoliciesService";
import { PropertyService } from "../services/PropertyService";
import { RatesAndAvailabilityService } from "../services/RatesAndAvailabilityService";
import { RoomTypeService } from "../services/RoomTypeService";
import { UserService } from "../services/UserService";

import { AccountController } from "../controllers/AccountController";
import { PoliciesController } from "../controllers/PoliciesController";
import { PropertyController } from "../controllers/PropertyController";
import { RatesAndAvailabilityController } from "../controllers/RatesAndAvailabilityController";
import { RoomTypeController } from "../controllers/RoomTypeController";
import { UserController } from "../controllers/UserController";

import { EmailService } from "../services/EmailService";
import { ReservationRepository } from "../infraestructure/repositories/ReservationRepository";


export class RequestContext {
  public readonly accountController: AccountController;
  public readonly userController: UserController;
  public readonly propertyController: PropertyController;
  public readonly ratesAndAvailabilityController: RatesAndAvailabilityController;
  public readonly roomTypeController: RoomTypeController;
  public readonly policiesController: PoliciesController;

  constructor(private readonly uow: UnitOfWork, private readonly emailService: EmailService) {
    this.uow = uow;
    this.emailService = emailService;


    const userRepository = new UserRepositoryPostgreSQL(this.uow);
    const propertyRepository = new PropertyRepository(this.uow);
    const accessControlRepository = new AccessControlRepository(this.uow);
    const ratesAndAvailabilityRepository = new RatesAndAvailabilityRepository(this.uow);
    const roomTypeRepository = new RoomTypeRepository(this.uow);
    const reservationRespository = new ReservationRepository(this.uow);
    const policiesRepository = new PoliciesRepository(this.uow);

    const accountService = new AccountService(userRepository, propertyRepository, accessControlRepository, this.emailService);
    const userService = new UserService(userRepository, accessControlRepository, propertyRepository, this.emailService);
    const propertyService = new PropertyService(propertyRepository, accessControlRepository);
    const ratesAndAvailabilityService = new RatesAndAvailabilityService(ratesAndAvailabilityRepository);
    const roomTypeService = new RoomTypeService(roomTypeRepository, reservationRespository);
    const policiesService = new PoliciesService(policiesRepository, accessControlRepository);

    this.accountController = new AccountController(accountService);
    this.userController = new UserController(userService);
    this.propertyController = new PropertyController(propertyService);
    this.ratesAndAvailabilityController = new RatesAndAvailabilityController(ratesAndAvailabilityService);
    this.roomTypeController = new RoomTypeController(roomTypeService);
    this.policiesController = new PoliciesController(policiesService);

  }

  public execute<T>(
    callback: () => Promise<T>,
    needTransaction = false
  ) {
    return this.uow.execute(callback, needTransaction);
  }

}
