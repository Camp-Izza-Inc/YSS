-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(36) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `user_password` VARCHAR(500) NOT NULL,
    `account_type` ENUM('parent', 'counselor', 'youth', 'admin') NOT NULL,
    `account_created` DATETIME(0) NULL,
    `status` ENUM('active', 'inactive') NULL DEFAULT 'active',

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `buses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `count` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cabins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `gender` ENUM('m', 'f') NOT NULL,
    `count` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `counselor_groups` (
    `counselor_id` VARCHAR(36) NOT NULL,
    `bus` INTEGER NULL,
    `family` VARCHAR(30) NULL,
    `cabin` VARCHAR(30) NULL,

    PRIMARY KEY (`counselor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `counselors` (
    `counselor_id` VARCHAR(36) NOT NULL,
    `first_name` VARCHAR(45) NULL,
    `last_name` VARCHAR(45) NULL,
    `phone_number` VARCHAR(10) NULL,
    `gender` ENUM('f', 'm') NULL,
    `shirt_size` ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL') NULL,
    `birthday` DATE NULL,
    `city` VARCHAR(30) NULL,
    `availability` VARCHAR(45) NULL,
    `training` VARCHAR(45) NULL,
    `years` VARCHAR(45) NULL,
    `siblings` VARCHAR(45) NULL,
    `previous` VARCHAR(45) NULL,
    `experience` VARCHAR(45) NULL,
    `age_group` VARCHAR(45) NULL,
    `why` VARCHAR(45) NULL,
    `fit` VARCHAR(45) NULL,
    `other` VARCHAR(45) NULL,
    `reference` VARCHAR(45) NULL,
    `convicted` VARCHAR(45) NULL,
    `convicted_explain` VARCHAR(45) NULL,
    `review_status` VARCHAR(45) NULL,

    PRIMARY KEY (`counselor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_assignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `family_id` INTEGER NULL,
    `event_id` INTEGER NULL,

    INDEX `event_event_id_fk_idx`(`event_id`),
    INDEX `event_family_id_fk_idx`(`family_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `date` DATE NULL,
    `start_time` TIME(0) NULL,
    `start_period` ENUM('AM', 'PM') NULL,
    `end_time` TIME(0) NULL,
    `end_period` ENUM('AM', 'PM') NULL,
    `location` VARCHAR(45) NULL,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `families` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `grade` INTEGER NOT NULL,
    `count` INTEGER NULL DEFAULT 0,
    `capacity_boys` INTEGER NULL,
    `capacity_girls` INTEGER NULL,
    `count_boys` INTEGER NULL DEFAULT 0,
    `count_girls` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `financial_aid_apps` (
    `parent_id` VARCHAR(36) NOT NULL,
    `household_size` INTEGER NOT NULL,
    `annual_income` VARCHAR(20) NOT NULL,
    `able_to_pay` FLOAT NOT NULL,
    `local_org_description` VARCHAR(50) NOT NULL,
    `circ_description` VARCHAR(50) NOT NULL,
    `submitted_at` DATETIME(0) NULL,
    `approved` ENUM('approved', 'pending', 'denied') NULL DEFAULT 'pending',

    PRIMARY KEY (`parent_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parents` (
    `parent_id` VARCHAR(36) NOT NULL,
    `first_name` VARCHAR(45) NULL,
    `last_name` VARCHAR(45) NULL,
    `birthday` DATE NULL,
    `balance` FLOAT NULL DEFAULT 0,
    `phone_number` VARCHAR(10) NULL,
    `address_street` VARCHAR(50) NULL,
    `address_city` VARCHAR(50) NULL,
    `address_zip` VARCHAR(10) NULL,
    `ec_name1` VARCHAR(50) NULL,
    `ec_phone1` VARCHAR(10) NULL,
    `ec_relation1` VARCHAR(30) NULL,
    `ec_name2` VARCHAR(50) NULL,
    `ec_phone2` VARCHAR(10) NULL,
    `ec_relation2` VARCHAR(30) NULL,
    `insurance_provider` VARCHAR(50) NULL,
    `insurance_policy_holder` VARCHAR(50) NULL,
    `insurance_policy_number` VARCHAR(20) NULL,
    `details_submitted_at` DATETIME(0) NULL,
    `credit` FLOAT NULL DEFAULT 0,

    PRIMARY KEY (`parent_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `transaction_id` VARCHAR(45) NOT NULL,
    `parent_id` VARCHAR(36) NOT NULL,
    `amount_paid` FLOAT NOT NULL,
    `amount_credit` FLOAT NULL DEFAULT 0,
    `date_time` DATETIME(0) NOT NULL,

    INDEX `payment_parent_id_fk_idx`(`parent_id`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prices` (
    `price_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(30) NOT NULL,
    `price` FLOAT NOT NULL,
    `active` TINYINT NULL DEFAULT 0,

    PRIMARY KEY (`price_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `youth` (
    `youth_id` VARCHAR(36) NOT NULL,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `parent_id` VARCHAR(36) NOT NULL,
    `birthday` DATE NOT NULL,
    `phone_number` VARCHAR(10) NOT NULL,
    `gender` ENUM('f', 'm') NOT NULL,
    `grade` INTEGER NOT NULL,
    `survey_completed` TINYINT NULL DEFAULT 0,
    `allergies` VARCHAR(200) NULL,
    `dietary_restrictions` VARCHAR(200) NULL,
    `updated_at` DATETIME(0) NULL,

    INDEX `youth_parent_id_fk_idx`(`parent_id`),
    PRIMARY KEY (`youth_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `youth_groups` (
    `youth_id` VARCHAR(36) NOT NULL,
    `bus_id` INTEGER NULL,
    `family_id` INTEGER NULL,
    `cabin_id` INTEGER NULL,
    `updated_at` DATETIME(0) NULL,

    INDEX `youth_groups_bus_fk_idx`(`bus_id`),
    INDEX `youth_groups_cabin_fk_idx`(`cabin_id`),
    INDEX `youth_groups_family_fk_idx`(`family_id`),
    PRIMARY KEY (`youth_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `youth_responses` (
    `youth_id` VARCHAR(36) NOT NULL,
    `shirt_size` INTEGER NOT NULL,
    `spirituality` INTEGER NOT NULL,
    `knowledge` INTEGER NOT NULL,
    `improvement` INTEGER NOT NULL,
    `community` INTEGER NOT NULL,
    `question` VARCHAR(200) NOT NULL,
    `activity` VARCHAR(200) NOT NULL,
    `hopes` VARCHAR(200) NOT NULL,
    `image_file` VARCHAR(100) NULL,
    `image_data` VARBINARY(100) NULL,
    `submitted_at` DATETIME(0) NULL,

    PRIMARY KEY (`youth_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `counselor_groups` ADD CONSTRAINT `counselor_group_id_fk` FOREIGN KEY (`counselor_id`) REFERENCES `counselors`(`counselor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `counselors` ADD CONSTRAINT `counselor_account_id_fk` FOREIGN KEY (`counselor_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_assignments` ADD CONSTRAINT `event_event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_assignments` ADD CONSTRAINT `event_family_id_fk` FOREIGN KEY (`family_id`) REFERENCES `families`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_aid_apps` ADD CONSTRAINT `financial_aid_parent_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parents` ADD CONSTRAINT `parent_account_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payment_parent_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `parents`(`parent_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `youth` ADD CONSTRAINT `youth_account_id_fk` FOREIGN KEY (`youth_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `youth` ADD CONSTRAINT `youth_parent_id_fk` FOREIGN KEY (`parent_id`) REFERENCES `parents`(`parent_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `youth_groups` ADD CONSTRAINT `youth_groups_cabin_fk` FOREIGN KEY (`cabin_id`) REFERENCES `cabins`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `youth_groups` ADD CONSTRAINT `youth_groups_family_fk` FOREIGN KEY (`family_id`) REFERENCES `families`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `youth_groups` ADD CONSTRAINT `youth_groups_id_fk` FOREIGN KEY (`youth_id`) REFERENCES `youth`(`youth_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `youth_responses` ADD CONSTRAINT `youth_responses_id_fk` FOREIGN KEY (`youth_id`) REFERENCES `youth`(`youth_id`) ON DELETE CASCADE ON UPDATE CASCADE;

