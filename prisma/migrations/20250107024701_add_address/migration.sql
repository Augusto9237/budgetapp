/*
  Warnings:

  - Added the required column `city` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Enterprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Enterprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Enterprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Enterprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Enterprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "tradeName" TEXT NOT NULL,
    "buyer" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL
);
INSERT INTO "new_Customer" ("businessName", "buyer", "cnpj", "contact", "email", "id", "tradeName") SELECT "businessName", "buyer", "cnpj", "contact", "email", "id", "tradeName" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_cnpj_key" ON "Customer"("cnpj");
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
CREATE TABLE "new_Enterprise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "tradeName" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL
);
INSERT INTO "new_Enterprise" ("businessName", "cnpj", "contact", "email", "id", "logoUrl", "owner", "tradeName") SELECT "businessName", "cnpj", "contact", "email", "id", "logoUrl", "owner", "tradeName" FROM "Enterprise";
DROP TABLE "Enterprise";
ALTER TABLE "new_Enterprise" RENAME TO "Enterprise";
CREATE UNIQUE INDEX "Enterprise_cnpj_key" ON "Enterprise"("cnpj");
CREATE UNIQUE INDEX "Enterprise_email_key" ON "Enterprise"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
