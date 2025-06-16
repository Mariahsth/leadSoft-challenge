import { UserRepository, User } from "../../domain/repositories/UserRepository";
import { getRavenDbConnection } from "../../config/ravenDbConfig";

export class RavenUserRepository implements UserRepository {
  private store = getRavenDbConnection();

  async findByEmail(user: string): Promise<User | null> {
    const session = this.store.openSession(); 

    const existingUser = await session
      .query<User>({ collection: "Users" })
      .whereEquals("user", user)
      .firstOrNull();

    return existingUser;
  }
}
