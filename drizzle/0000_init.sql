CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`price` integer NOT NULL,
	`categoryId` integer NOT NULL,
	`rating_rate` real DEFAULT 0,
	`rating_count` integer DEFAULT 0,
	CONSTRAINT `fk_products_categoryId_products_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `products_categories`(`id`)
);
--> statement-breakpoint
CREATE TABLE `products_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`designation` text(128) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `title_idx` ON `products` (`title`);--> statement-breakpoint
CREATE UNIQUE INDEX `designation_idx` ON `products_categories` (`designation`);