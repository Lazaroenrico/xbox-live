-- CreateTable
CREATE TABLE "genre" (
    "id" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "CoverImgUrl" TEXT NOT NULL,
    "Year" INTEGER NOT NULL,
    "ImdbScore" DOUBLE PRECISION NOT NULL,
    "TrailerYoutubeUrl" TEXT NOT NULL,
    "GameplayYoutubeUrl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "Admin" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "ImageUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genreGames" (
    "id" TEXT NOT NULL,
    "gamesId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genreGames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileGames" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "gamesId" TEXT NOT NULL,

    CONSTRAINT "ProfileGames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genre_genre_key" ON "genre"("genre");

-- CreateIndex
CREATE UNIQUE INDEX "games_Title_key" ON "games"("Title");

-- CreateIndex
CREATE UNIQUE INDEX "user_Name_key" ON "user"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "user_CPF_key" ON "user"("CPF");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genreGames" ADD CONSTRAINT "genreGames_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genreGames" ADD CONSTRAINT "genreGames_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileGames" ADD CONSTRAINT "ProfileGames_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileGames" ADD CONSTRAINT "ProfileGames_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
