import { Request, Response, NextFunction } from "express";
import { IPropertyService } from "../domain/interfaces/IPropertyService";
import { ContactInfoDTO } from "../domain/dto/ContactInfoDTO";
import { AddressDTO } from "../domain/dto/AddressDTO";
import { CurrenciesDTO } from "../domain/dto/CurrenciesDTO";

export class PropertyController {
  constructor(private readonly propertyService: IPropertyService) {
    this.propertyService = propertyService;
  }


  async getProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId } = req.body;

      const result = await this.propertyService.getProperty(propertyId);

      return res.status(200).json(result);

    } catch (err) {
      next(err)
    }
  }

  async saveOrUpdateContactInfo(req: Request, res: Response, next: NextFunction) {
    try {
      // Ambos propertyId y userId deberian venir en el token de autentificacion creo.
      const { propertyId, userId } = req.auth;
      const { email, phoneCallsCode, phoneCalls, phoneWhatsapp, phoneWhatsappCode } = req.body;

      const contactInfoDTO: ContactInfoDTO = {
        email,
        phoneCallsCode,
        phoneCalls,
        phoneWhatsappCode,
        phoneWhatsapp
      }

      const result = await this.propertyService.saveOrUpdateContactInfo(propertyId, userId, contactInfoDTO);

      return res.status(200).json(result);

    } catch (err) {
      next(err);
    }
  }

  async saveOrUpdateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, userId } = req.auth;
      const { houseNumber, street, city, postalCode, state, country, alpha2code, lat, lon, osmId } = req.body;

      const addressDTO: AddressDTO = {
        houseNumber,
        street,
        city,
        postalCode,
        state,
        country,
        alpha2code,
        lat,
        lon,
        osmId,
      };

      const result = await this.propertyService.saveOrUpdateAddress(propertyId, userId, addressDTO);

      return res.status(200).json(result);

    } catch (err) {
      next(err);
    }
  }

  async saveOrUpdateCurrencies(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId, userId } = req.auth;
      const { base_currency, payment_currency } = req.body;
      const dto: CurrenciesDTO = {
        property_id: propertyId,
        baseCurrency: base_currency,
        paymentCurrency: payment_currency,
        user_id: userId
      }

      const result = await this.propertyService.saveOrUpdateCurrencies(dto)

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }


}
