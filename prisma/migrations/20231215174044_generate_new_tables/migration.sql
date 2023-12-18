-- CreateEnum
CREATE TYPE "Types" AS ENUM ('Shoes', 'Cap', 'Hoodie', 'Shirt', 'Coat', 'Trousers');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentaries" (
    "id" TEXT NOT NULL,
    "commentary" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "commentaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(5,2) NOT NULL,
    "type" "Types" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "sizes" INTEGER[],
    "url_image" TEXT[],

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- AddForeignKey
ALTER TABLE "commentaries" ADD CONSTRAINT "commentaries_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentaries" ADD CONSTRAINT "commentaries_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
