-- RedefineIndex
DROP INDEX "userId_key";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
