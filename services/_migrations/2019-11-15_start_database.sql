-- MySQL Script generated by MySQL Workbench
-- Sun 17 Nov 2019 04:57:07 PM -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Table "user"
-- -----------------------------------------------------
CREATE TABLE "user_account" (
  "id" SERIAL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "birth_date" DATE,
  "phone" TEXT,
  "address" TEXT,
  "occupation" TEXT,
  "cpf" TEXT,
  PRIMARY KEY ("id")
);



-- -----------------------------------------------------
-- Table "event"
-- -----------------------------------------------------
CREATE TABLE "event" (
  "id" SERIAL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "start_time" TIME NOT NULL,
  "end_time" TIME NOT NULL,
  "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "date" DATE NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"));


-- -----------------------------------------------------
-- Table "activity_event"
-- -----------------------------------------------------
CREATE TABLE "activity_event" (
  "id" SERIAL,
  "id_client" INT NOT NULL,
  "id_event" INT NOT NULL,
  "status" CHAR NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_activity_event_event"
    FOREIGN KEY ("id_event")
    REFERENCES "event" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT "fk_activity_event_user_account"
    FOREIGN KEY ("id_client")
    REFERENCES "user_account" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "check_in"
-- -----------------------------------------------------
CREATE TABLE "check_in" (
  "id" SERIAL,
  "id_activity_event" INT NOT NULL,
  "date" TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_checkin_activity_event1"
    FOREIGN KEY ("id_activity_event")
    REFERENCES "activity_event" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "certification"
-- -----------------------------------------------------
CREATE TABLE "certification" (
  "id" SERIAL,
  "id_activity_event" INT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "authentication" TEXT NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_certification_activity_event1"
    FOREIGN KEY ("id_activity_event")
    REFERENCES "activity_event" ("id")
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table "email"
-- -----------------------------------------------------
CREATE TABLE "email" (
  "id" SERIAL,
  "receiver_mail" TEXT NOT NULL,
  "sent_mail" TEXT NOT NULL,
  "reason" TEXT NOT NULL,
  PRIMARY KEY ("id"));
