CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `social_id` varchar(64) DEFAULT NULL,
  `name` varchar(64) NOT NULL,
  `username` varchar(64) NOT NULL,
  `email` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `profile_picture` varchar(256) NOT NULL,
  `provider` varchar(64) NOT NULL,
  `last_active` datetime DEFAULT NULL,
  `access_token` varchar(256) DEFAULT NULL,
  `access_token_secret` varchar(256) DEFAULT NULL,
  `refresh_token` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

