/*
  Warnings:

  - Added the required column `logoUrl` to the `Enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Enterprise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "tradeName" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL
);
INSERT INTO "new_Enterprise" ("businessName", "cnpj", "contact", "email", "id", "owner", "tradeName") SELECT "businessName", "cnpj", "contact", "email", "id", "owner", "tradeName" FROM "Enterprise";
DROP TABLE "Enterprise";
ALTER TABLE "new_Enterprise" RENAME TO "Enterprise";
CREATE UNIQUE INDEX "Enterprise_cnpj_key" ON "Enterprise"("cnpj");
CREATE UNIQUE INDEX "Enterprise_email_key" ON "Enterprise"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
