


-- Export de la structure de table devnews.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL DEFAULT '0',
  `password` varchar(255) NOT NULL DEFAULT '0',
  `isModo` boolean NOT NULL DEFAULT '0',
  `isAdmin` boolean NOT NULL DEFAULT '0',
  `isSubscribedNewsletter` boolean NOT NULL DEFAULT '0',
  `avatar` BLOB,
  `idGoogle` varchar(1000),
  `tokenGoogle` varchar(1000),
  `idGithub` varchar(1000),
  `tokenGithub` varchar(1000),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Export de la structure de table devnews.articles
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleTitle` varchar(255) NOT NULL DEFAULT '0',
  `articleSynopsis` varchar(1000) NOT NULL DEFAULT '0',
  `isValidated` boolean NOT NULL DEFAULT '0',
  `file` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL DEFAULT '0',
  `date` varchar(20) NOT NULL DEFAULT '0000-00-00',
  `userId` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES users(`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Export de la structure de table devnews.tags
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagTitle` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Export de la structure de table devnews.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commentContent` varchar (1000) NOT NULL DEFAULT '0',
  `articleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dateOfComment` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parentId` int(11),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`articleId`) REFERENCES articles(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES users(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`parentId`) REFERENCES comments(`id`) ON UPDATE CASCADE ON DELETE CASCADE  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Export de la structure de table devnews.articleLikes
CREATE TABLE IF NOT EXISTS `article_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`articleId`) REFERENCES articles(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES users(`id`) ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Export de la structure de table devnews.articleDislikes
CREATE TABLE IF NOT EXISTS `article_dislikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`articleId`) REFERENCES articles(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES users(`id`) ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Export de la structure de table devnews.commentLikes
CREATE TABLE IF NOT EXISTS `comment_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`commentId`) REFERENCES comments(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES users(`id`) ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Export de la structure de table devnews.commentDislikes
CREATE TABLE IF NOT EXISTS `comment_dislikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commentId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`commentId`) REFERENCES comments(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES users(`id`) ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Export de la structure de table devnews.articlesTags
CREATE TABLE IF NOT EXISTS `articles_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagId` int(11) NOT NULL,
  `articleId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`tagId`) REFERENCES tags(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`articleId`) REFERENCES articles(`id`) ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Export de la structure de table devnews.tagUsers
CREATE TABLE IF NOT EXISTS `tag_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`tagId`) REFERENCES tags(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES users(`id`) ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Export de la structure de table devnews.favorites
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`articleId`) REFERENCES articles(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES users(`id`) ON UPDATE CASCADE ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;


SET FOREIGN_KEY_CHECKS = 0; 
TRUNCATE TABLE `users`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `users` (`id`,`username`,`email`,`password`,`isModo`,`isAdmin`,`isSubscribedNewsletter`,`avatar`) VALUES
(1,'filou','philippe.vieles@epitech.eu','toto', 0, 1, 1,'avatar1.jfif'),
(2,'stanou','stanislas.mourin@epitech.eu','tata', 1, 0, 1,'avatar2.png'),
(3,'bastou','bastien.tharaud@epitech.eu','titi', 0, 1, 1, 'avatar3.png'),
(4,'chaou','chao.wu@epitech.eu','tete', 1, 0, 1, 'avatar4.png'),
(5,'chiaou','chia-huey.sim@epitech.eu','tutu', 0, 1, 1, 'avatar5.jfif'),
(6,'prenou','prenou@epitech.eu','tyty', 1, 0, 1, 'avatar5.jfif');


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `articles`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `articles` (`id`,`articleTitle`,`articleSynopsis`,`isValidated`,`file`,`location`,`date`,`userId`) VALUES
(1,'Angular has come a long way', 'Angular has come a long way in the web and app development world since its inception in 2010. Developers are continually leveraging their full potential to stay ahead in the market competition.', 1, '1- Angular has come a long way.pdf', 'Miami', '2018-12-06',1),
(2,'created in Canva', 'Python was built with one special programming style and that was — using underscores more than we ever used in any other programming language before. It was called the Snake Case.', 1, '2- Created in Canva.pdf', 'Limoges', '2021-05-22', 2),
(3,'Docker is a widely adopted platform to package', 'Docker is a widely adopted platform to package, share and spin up applications effortlessly, in a reproducible manner, abstracting away from the underlying OS, and with an excellent degree of isolation of the resulting ephemeral containers.', 1, '3- Docker is a widely adopted platform to package.pdf', 'Tokyo','2007-01-03', 3),
(4,'Next JS has announced at their Next', 'Next JS has announced at their Next.js conference that Next JS 12 is going to be one of their biggest releases ever. So in this article, we will quickly look into what are the new amazing features Next.js 12 has to provide us with.', 1, '4- Next JS has announced at their Next.pdf', 'Bali','2022-01-05', 4),
(5,'5- Wordle Guess Block', 'Hi everyone, I’m sure by now you’ve all seen Wordle, Twitters’s most recent obsession. If you’re like me, you struggle with this game. But don’t you worry, with the help of search and data analytics, we can become great.', 1, '5- Wordle Guess Block.pdf', 'Saint-Germain-Des-Prés','2022-01-05', 5);


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `tags`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `tags` (`id`,`tagTitle`) VALUES
(1,'C'),
(2,'C#'),
(3,'C++'),
(4,'CSS'),
(5,'HTML'),
(6,'Java'),
(7,'Javascript'),
(8,'Kotlin'),
(9,'PHP'),
(10,'Python'),
(11,'Ruby'),
(12,'Rust'),
(13,'Swift');


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `comments`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `comments` (`id`,`commentContent`,`articleId`,`userId`,`dateOfComment`,`parentId`) VALUES
(1,'Mon premier commentaire sur le premier article', 1, 1,'2021-12-03 00:20:00', null),
(2,'Ma réponse au commentaire sur le premier article', 1, 1,'2021-12-04 00:21:00', 1),

(3,'Mon premier commentaire sur le second article', 2, 2,'2012-12-03 00:20:00', null),
(4,'Ma réponse au commentaire sur le second article', 2, 2,'2021-12-04 00:20:00', 3),

(5,'Mon premier commentaire sur le troisième article', 3, 3,'2020-12-03 00:20:00', null),
(6,'Ma réponse au commentaire sur le troisième article', 3, 3,'2021-12-03 00:21:00', 5),

(7,'Mon premier commentaire sur le quatrième article', 4, 4,'2019-12-03 00:20:00', null),
(8,'Ma réponse au commentaire sur le quatrième article', 4, 4,'2021-12-05 00:20:00', 7),

(9,'Mon premier commentaire sur le cinquième article', 5, 5,'2022-01-30 00:20:00', null),
(10,'Ma réponse au commentaire sur le cinquième article', 5, 5,'2022-01-03 00:20:00', 9);


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `article_likes`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `article_likes` (`id`,`articleId`,`userId`) VALUES
(1,1,1),
(2,2,2),
(3,3,3),
(4,4,4),
(5,5,5),
(6,1,3),
(7,5,2),
(8,1,4);


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `article_dislikes`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `article_dislikes` (`id`,`articleId`,`userId`) VALUES
(1,2,1),
(2,3,2),
(3,4,3),
(4,5,4),
(5,1,5);


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `comment_likes`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `comment_likes` (`id`,`commentId`,`userId`) VALUES
(1,1,1),
(2,2,2),
(3,3,3),
(4,4,4),
(5,5,5);


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `comment_dislikes`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `comment_dislikes` (`id`,`commentId`,`userId`) VALUES
(1,2,1),
(2,3,2),
(3,4,3),
(4,5,4),
(5,1,5);


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `articles_tags`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `articles_tags` (`id`,`tagId`,`articleId`) VALUES
(1,7,1),
(2,10,2),
(3,9,3),
(4,7,4),
(5,2,1),
(6,3,2),
(7,10,1),
(8,2,3);


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `tag_users`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `tag_users` (`id`,`tagId`,`userId`) VALUES
(1,1,1),
(2,2,1),
(3,3,2),
(4,4,2),
(5,5,3),
(6,6,3),
(7,7,4),
(8,8,4),
(9,9,5),
(10,10,5);


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `favorites`;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `favorites` (`id`,`articleId`,`userId`) VALUES
(1,1,2),
(2,1,3),
(3,2,3),
(4,2,4),
(5,3,4),
(6,3,5),
(7,4,5),
(8,4,1),
(9,5,1),
(10,5,2);