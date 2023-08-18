CREATE TABLE `Users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `hashed_password` varchar(255)
);

CREATE TABLE `FriendRequests` (
  `user_id` integer,
  `requested_user_id` integer
);

CREATE TABLE `FriendMessages` (
  `message_id` integer,
  `sent_to_user_id` integer
);

CREATE TABLE `ChannelMessages` (
  `message_id` integer,
  `channel_id` integer
);

CREATE TABLE `Messages` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `sent_by` integer,
  `created_at` timestamp,
  `body` varchar(255)
);

CREATE TABLE `ServerMembers` (
  `server_id` integer,
  `user_id` integer
);

CREATE TABLE `Servers` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `Channels` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `server_id` integer
);

