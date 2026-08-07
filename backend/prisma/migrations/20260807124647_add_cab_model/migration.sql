-- CreateTable
CREATE TABLE "Cab" (
    "id" SERIAL NOT NULL,
    "vehicleNo" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "driverId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cab_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cab_vehicleNo_key" ON "Cab"("vehicleNo");

-- CreateIndex
CREATE UNIQUE INDEX "Cab_driverId_key" ON "Cab"("driverId");

-- AddForeignKey
ALTER TABLE "Cab" ADD CONSTRAINT "Cab_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
