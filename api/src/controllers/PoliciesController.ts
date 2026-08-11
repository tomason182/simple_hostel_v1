import { Request, Response, NextFunction } from "express";
import { GeneralPoliciesDTO, MinorPoliciesDTO, OtherPoliciesDTO, PaymentPoliciesDTO } from "../domain/dto/PoliciesDTO";
import { IPoliciesService } from "../domain/interfaces/IPoliciesService";

export class PoliciesController {
  constructor(
    private readonly policiesService: IPoliciesService,
  ) {
    this.policiesService = policiesService;
  }

  public async saveOrUpdateGeneralPolicies(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, userId } = req.auth;
      const dto: GeneralPoliciesDTO = {
        minLengthStay: req.body.minLengthStay,
        maxLengthStay: req.body.maxLengthStay,
        minAdvanceBooking: req.body.minAdvanceBooking,
        checkInFrom: req.body.checkInFrom,
        checkOutFrom: req.body.checkOutFrom,
        checkInUntil: req.body.checkInUntil,
        checkOutUntil: req.body.checkOutUntil
      }

      const result = await this.policiesService.saveOrUpdateGeneralPolicies(propertyId, userId, dto);

      return res.status(200).json(result);

    } catch (err) {
      next(err);
    }
  }

  public async saveOrUpdateMinorPolicies(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, userId } = req.auth;

      const dto: MinorPoliciesDTO = {
        minCheckInAge: req.body.minCheckInAge,
        acceptChildren: req.body.acceptChildren,
        minorAdultSupervision: req.body.minorsAdultSupervision,
        minChildAge: req.body.minChildAge,
        freeStayAge: req.body.freeStayAge
      };

      const result = await this.policiesService.saveOrUpdateMinorPolicies(propertyId, userId, dto);

      return res.status(200).json(result);

    } catch (err) {
      next(err);
    }
  }

  public async saveOrUpdateOtherPolicies(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, userId } = req.auth;

      const dto: OtherPoliciesDTO = {
        quietHoursFrom: req.body.quietHoursFrom,
        quietHoursUntil: req.body.quietHoursUntil,
        hasSmookingAreas: req.body.hasSmookingAreas,
        allowExternalGuest: req.body.allowExternalGuest,
        allowPets: req.body.allowPets
      }

      const result = await this.policiesService.saveOrUpdateOtherPolicies(propertyId, userId, dto);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async saveOrUpdatePaymentPolicies(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, userId } = req.auth;

      const dto: PaymentPoliciesDTO = {
        advancePaymentRequired: req.body.advancePaymentRequired,
        depositAmount: req.body.depositAmount
      };

      const result = await this.policiesService.saveOrUpdatePaymentPolicies(propertyId, userId, dto);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

}
