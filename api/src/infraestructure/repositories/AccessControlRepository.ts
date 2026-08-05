import { promises } from "nodemailer/lib/xoauth2";
import { AccessControl } from "../../domain/entities/AccessControl";
import { IAccessControlRepository } from "../../domain/ports/IAccessControlRepository";
import { UnitOfWork } from "../transactions/UnitOfWork";

export class AccessControlRepository implements IAccessControlRepository {
  constructor(private readonly uow: UnitOfWork) {
    this.uow = uow;
  }

  async findUser(userId: number): Promise<AccessControl> {
    const query = "SELECT * FROM access_control WHERE user_id = $1;";

    const result = await this.uow.query(query, [userId]);

    const data = result.rows[0];

    if (!data) {
      throw new Error("ACCESS_CONTROL_NOT_SET");
    }

    return new AccessControl(data.id, data.user_id, data.property_id, data.role, data.created_at, data.updated_at);

  }

  async save(accessControl: AccessControl): Promise<AccessControl> {
    const query = `INSERT INTO access_control (
                      user_id, 
                      property_id, 
                      role, 
                      created_at, 
                      updated_at
                    ) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;


    const result = await this.uow.query(query, [
      accessControl.userId,
      accessControl.propertyId,
      accessControl.role,
      accessControl.createdAt,
      accessControl.updatedAt]
    );

    const id = result.rows[0].id;

    accessControl.setId(id);

    return accessControl;
  }


}
