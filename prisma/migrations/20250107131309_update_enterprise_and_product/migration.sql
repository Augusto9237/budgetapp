/*
  Warnings:

  - Added the required column `stateRegistration` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateRegistration` to the `Enterprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceCost` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "stateRegistration" TEXT NOT NULL,
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
INSERT INTO "new_Customer" ("businessName", "buyer", "city", "cnpj", "contact", "email", "id", "neighborhood", "number", "state", "street", "tradeName", "zipCode") SELECT "businessName", "buyer", "city", "cnpj", "contact", "email", "id", "neighborhood", "number", "state", "street", "tradeName", "zipCode" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_cnpj_key" ON "Customer"("cnpj");
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
CREATE TABLE "new_Enterprise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "stateRegistration" TEXT NOT NULL,
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
INSERT INTO "new_Enterprise" ("businessName", "city", "cnpj", "contact", "email", "id", "logoUrl", "neighborhood", "number", "owner", "state", "street", "tradeName", "zipCode") SELECT "businessName", "city", "cnpj", "contact", "email", "id", "logoUrl", "neighborhood", "number", "owner", "state", "street", "tradeName", "zipCode" FROM "Enterprise";
DROP TABLE "Enterprise";
ALTER TABLE "new_Enterprise" RENAME TO "Enterprise";
CREATE UNIQUE INDEX "Enterprise_cnpj_key" ON "Enterprise"("cnpj");
CREATE UNIQUE INDEX "Enterprise_email_key" ON "Enterprise"("email");
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "budgetId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "discount" REAL NOT NULL,
    "total" REAL NOT NULL,
    CONSTRAINT "Item_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("budgetId", "id", "productId", "quantity") SELECT "budgetId", "id", "productId", "quantity" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceCost" REAL NOT NULL,
    "basePrice" REAL NOT NULL
);
INSERT INTO "new_Product" ("basePrice", "brand", "code", "description", "id", "name", "reference") SELECT "basePrice", "brand", "code", "description", "id", "name", "reference" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
