import bcrypt from "bcryptjs";
module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const hashed = await bcrypt.hash("password123", 10);
    await db.collection("users").insertMany([
      { name: "Admin", email: "admin@gmail.com", password: hashed },
      { name: "manager", email: "manager@gmail.com", password: hashed }
    ]);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection("users").deleteMany({
      email: { $in: ["admin@gmail.com", "manager@gmail.com"] }
    });
  }
};
