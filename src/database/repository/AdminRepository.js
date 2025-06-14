import { AdminSchema } from "../entities/Admin.js";
import bcrypt from "bcrypt";

import { AppDataSource } from "../../db.js";

export const AdminRepository = AppDataSource.getRepository(AdminSchema).extend({
  async createWithPassword(data) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.credential, salt);
    const admin = this.create({ ...data, credential: hashedPassword });
    return this.save(admin);
  },

  async comparePassword(admin, inputPassword) {
    return await bcrypt.compare(inputPassword, admin.credential);
  },
});
