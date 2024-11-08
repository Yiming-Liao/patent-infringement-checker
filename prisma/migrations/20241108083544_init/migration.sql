-- CreateTable
CREATE TABLE `AnalysisReport` (
    `analysis_id` INTEGER NOT NULL AUTO_INCREMENT,
    `patent_id` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `analysis_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `top_infringing_products` JSON NOT NULL,
    `overall_risk_assessment` TEXT NOT NULL,

    PRIMARY KEY (`analysis_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
