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
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "ImageUrl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
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
