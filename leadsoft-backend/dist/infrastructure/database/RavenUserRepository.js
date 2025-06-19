"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RavenUserRepository = void 0;
const ravenDbConfig_1 = require("../../config/ravenDbConfig");
class RavenUserRepository {
    constructor() {
        this.store = (0, ravenDbConfig_1.getRavenDbConnection)();
    }
    async findByEmail(user) {
        const session = this.store.openSession();
        const existingUser = await session
            .query({ collection: "Users" })
            .whereEquals("user", user)
            .firstOrNull();
        return existingUser;
    }
}
exports.RavenUserRepository = RavenUserRepository;
