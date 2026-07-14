import { IUserRepository } from "../../domain/ports/IUserRepository";
import { UnitOfWork } from "../transactions/UnitOfWork";
import { User } from "../../domain/entities/User";

export class UserRepositoryPostgreSQL implements IUserRepository {
  constructor(private uow: UnitOfWork) {
    this.uow = uow;
  }

  async findByUsername(username: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE username = $1 LIMIT 1";

    const result = await this.uow.query(query, [username]);

    const data = result.rows[0];

    if (!data) {
      return null;
    }

    return new User(
      data.id,
      data.username,
      data.first_name,
      data.last_name,
      data.password_hash,
      data.is_email_verified,
      data.last_resend_email,
      data.avatar,
      data.created_at,
      data.updated_at
    );
  }

  async findById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = $1 LIMIT 1";

    const result = await this.uow.query(query, [id]);

    const data = result.rows[0];

    if (!data) return null;

    return new User(
      data.id,
      data.username,
      data.first_name,
      data.last_name,
      data.password_hash,
      data.is_email_verified,
      data.last_resend_email,
      data.avatar,
      data.created_at,
      data.updated_at
    );
  }

  async save(user: User): Promise<void> {
    const query = `INSERT INTO users (
                    username, 
                    first_name, 
                    last_name, 
                    password_hash, 
                    is_email_verified, 
                    last_resend_email, 
                    avatar, 
                    created_at, 
                    updated_at
                  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

    await this.uow.query(query, [
      user.username,
      user.firstName,
      user.lastName,
      user.getPasswordHash(),
      user.isEmailVerified,
      user.getLastResendEmail(),
      user.avatar,
      user.createdAt,
      user.updatedAt
    ])
  }

  async validateEmail(id: number): Promise<void> {
    const query = "UPDATE users SET is_email_verified = TRUE WHERE id = $1";

    const result = await this.uow.query(query, [id])

    if (result.rowCount === 0) {
      throw new Error("USER_NOT_FOUND");
    }
  }

  async updateLastResendEmail(user: User): Promise<void> {
    const query = "UPDATE users SET last_resend_email = $1 WHERE id = $2";

    const result = await this.uow.query(query, [user.getLastResendEmail(), user.getId()]);

    if (result.rowCount === 0) {
      throw new Error("USER_NOT_FOUND");
    }
  }
}
