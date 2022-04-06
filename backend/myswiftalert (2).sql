-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2021 at 04:30 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myswiftalert`
--

-- --------------------------------------------------------

--
-- Table structure for table `alert_profile`
--

CREATE TABLE `alert_profile` (
  `idprofile` int(11) NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sms` varchar(60) NOT NULL,
  `account_number` varchar(60) NOT NULL,
  `idMsgType` varchar(60) NOT NULL,
  `idFlow` varchar(60) NOT NULL,
  `message_template` varchar(255) NOT NULL,
  `internal_alert_email` varchar(255) NOT NULL,
  `idalert_type` varchar(60) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alert_profile`
--

INSERT INTO `alert_profile` (`idprofile`, `CustomerName`, `email`, `sms`, `account_number`, `idMsgType`, `idFlow`, `message_template`, `internal_alert_email`, `idalert_type`, `createdAt`, `updatedAt`, `deletedAt`, `status`) VALUES
(1, '', '', '', '', '', '', '', '', '', '2021-12-26 23:12:10', '2021-12-30 15:06:52', '2021-12-26 23:55:05', 0),
(2, 'Manzi', 'manzi@test.com', '026013257', '`111', '101', 'inwards', 'Hello Boss', 'mis@calbank.net', 'sms', '2021-12-26 23:42:29', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `alert_type`
--

CREATE TABLE `alert_type` (
  `idalert_type` int(11) NOT NULL,
  `alert_type_name` varchar(60) NOT NULL,
  `alert_type_comment` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_id` binary(16) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `name`) VALUES
(0xb9d7041a478211ec9a7254bf64489f9c, 'John Doe'),
(0xb9d793a7478211ec9a7254bf64489f9c, 'Johnny Dope'),
(0xb9d796ac478211ec9a7254bf64489f9c, 'Jason Gillespie');

-- --------------------------------------------------------

--
-- Table structure for table `message_flow`
--

CREATE TABLE `message_flow` (
  `idFlow` int(11) NOT NULL,
  `meesage_flow_name` varchar(60) NOT NULL,
  `meesage_flow_comment` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `message_type`
--

CREATE TABLE `message_type` (
  `idMsgType` int(11) NOT NULL,
  `message_type_name` varchar(60) NOT NULL,
  `message_type_comment` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `settings_authentication`
--

CREATE TABLE `settings_authentication` (
  `idsettings_authentication` int(11) NOT NULL,
  `auth_type` int(11) DEFAULT NULL,
  `mfa` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings_authentication`
--

INSERT INTO `settings_authentication` (`idsettings_authentication`, `auth_type`, `mfa`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `settings_auth_ad`
--

CREATE TABLE `settings_auth_ad` (
  `idsettings_auth_ad` int(11) NOT NULL,
  `ad_dc_prim` varchar(100) DEFAULT NULL,
  `ad_dc_sec` varchar(100) DEFAULT NULL,
  `ad_basedn` varchar(100) DEFAULT NULL,
  `ad_domain` varchar(45) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `settings_auth_ldap`
--

CREATE TABLE `settings_auth_ldap` (
  `idsettings_auth_LDAP` int(11) NOT NULL,
  `ldap_user` varchar(60) DEFAULT NULL,
  `ldap_url` varchar(100) DEFAULT NULL,
  `ldap_password` varchar(255) DEFAULT NULL,
  `ldap_domain` varchar(45) DEFAULT NULL,
  `enabled` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings_auth_ldap`
--

INSERT INTO `settings_auth_ldap` (`idsettings_auth_LDAP`, `ldap_user`, `ldap_url`, `ldap_password`, `ldap_domain`, `enabled`) VALUES
(1, 'albert', 'http://10.130.16.77:500', 'pass', 'test.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `settings_auth_oauth`
--

CREATE TABLE `settings_auth_oauth` (
  `idsettings_auth_oauth` int(11) NOT NULL,
  `oauth_url` varchar(250) DEFAULT NULL,
  `oauth_api_key` varchar(100) DEFAULT NULL,
  `oauth_api_secret` varchar(100) DEFAULT NULL,
  `oauth_redirect_url` varchar(200) DEFAULT NULL,
  `enabled` int(11) NOT NULL DEFAULT 0,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings_auth_oauth`
--

INSERT INTO `settings_auth_oauth` (`idsettings_auth_oauth`, `oauth_url`, `oauth_api_key`, `oauth_api_secret`, `oauth_redirect_url`, `enabled`, `CreatedAt`) VALUES
(3, 'http://10.130.16.77:5000', '25www', 'new', 'http://10.130.16.77:5000/callback', 0, '2021-11-06 23:28:36');

-- --------------------------------------------------------

--
-- Table structure for table `settings_auth_type`
--

CREATE TABLE `settings_auth_type` (
  `idsettings_authentication_type` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings_auth_type`
--

INSERT INTO `settings_auth_type` (`idsettings_authentication_type`, `name`, `description`) VALUES
(1, 'OAUTH', 'For OAUTH settings'),
(2, 'LDAP', 'For LDAP Settings'),
(3, 'AD', 'For Acitve Directory Settings'),
(4, 'Local', 'For Local Authentication');

-- --------------------------------------------------------

--
-- Table structure for table `settings_company`
--

CREATE TABLE `settings_company` (
  `idsettings_company` int(11) NOT NULL,
  `comp_name` varchar(45) DEFAULT NULL,
  `comp_logo` varchar(45) DEFAULT NULL,
  `comp_slogan` varchar(45) DEFAULT NULL,
  `comp_email` varchar(45) DEFAULT NULL,
  `comp_url` varchar(45) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings_company`
--

INSERT INTO `settings_company` (`idsettings_company`, `comp_name`, `comp_logo`, `comp_slogan`, `comp_email`, `comp_url`, `timestamp`, `address`) VALUES
(9, 'up', NULL, 'up', 'up@up.com', 'https://www.test.com', '2021-12-31 12:15:31', 'ok');

-- --------------------------------------------------------

--
-- Table structure for table `settings_email`
--

CREATE TABLE `settings_email` (
  `idsettings_sms` int(11) NOT NULL,
  `smtpHost` varchar(45) DEFAULT NULL,
  `smtpPort` int(11) DEFAULT NULL,
  `smtpTLS` tinyint(4) DEFAULT NULL,
  `smtpUser` varchar(45) DEFAULT NULL,
  `smtpPass` varchar(45) DEFAULT NULL,
  `smtpFrom` varchar(45) DEFAULT NULL,
  `enabled` int(11) NOT NULL DEFAULT 0,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings_email`
--

INSERT INTO `settings_email` (`idsettings_sms`, `smtpHost`, `smtpPort`, `smtpTLS`, `smtpUser`, `smtpPass`, `smtpFrom`, `enabled`, `timestamp`) VALUES
(4, 'outlook.com', 100, 1, 'CAL.1234$', 'test', 'CAL.1234$', 0, '2021-11-06 23:21:47');

-- --------------------------------------------------------

--
-- Table structure for table `settings_paths`
--

CREATE TABLE `settings_paths` (
  `idsettings_paths` int(11) NOT NULL,
  `src_swift_docs_path_print` varchar(45) DEFAULT NULL,
  `src_swift_docs_path_pdf` varchar(45) DEFAULT NULL,
  `src_swift_docs_path_img` varchar(45) DEFAULT NULL,
  `src_swift_docs_path_txt` varchar(45) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings_paths`
--

INSERT INTO `settings_paths` (`idsettings_paths`, `src_swift_docs_path_print`, `src_swift_docs_path_pdf`, `src_swift_docs_path_img`, `src_swift_docs_path_txt`, `timestamp`) VALUES
(1, 'mypath', 'mypath', 'path', 'past.com', '2021-12-30 15:05:06');

-- --------------------------------------------------------

--
-- Table structure for table `settings_token`
--

CREATE TABLE `settings_token` (
  `id` int(11) NOT NULL,
  `issuer` varchar(60) NOT NULL DEFAULT 'ipronetswift',
  `audience` varchar(60) NOT NULL DEFAULT 'swiftpanel',
  `timetolive` varchar(60) NOT NULL DEFAULT '10min',
  `token_name` varchar(60) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `settings_token`
--

INSERT INTO `settings_token` (`id`, `issuer`, `audience`, `timetolive`, `token_name`, `create_at`) VALUES
(1, 'ipronet.com', 'http://localhost:7000/swiftapp/v1/auth', '10min', 'sauth', '2021-10-21 09:37:39');

-- --------------------------------------------------------

--
-- Table structure for table `smsgateway`
--

CREATE TABLE `smsgateway` (
  `id` int(11) NOT NULL,
  `gateway` varchar(60) NOT NULL,
  `gatewayurl` varchar(500) NOT NULL,
  `gatewaykeys` varchar(255) NOT NULL,
  `gatewaypassword` varchar(255) NOT NULL,
  `balance` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `smsgateway`
--

INSERT INTO `smsgateway` (`id`, `gateway`, `gatewayurl`, `gatewaykeys`, `gatewaypassword`, `balance`, `createdAt`, `updatedAt`, `deletedAt`, `status`) VALUES
(1, 'Sesa SMs', 'sms.gashie.net/api/sms', '11112212csmdnbsjdhbq211', 'Pasv.1234$', 2000, '2021-12-31 15:30:13', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `swift_message_metadata`
--

CREATE TABLE `swift_message_metadata` (
  `idswift_message_metadata` int(11) NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  `swift_mt` int(11) DEFAULT NULL,
  `swift_dir` tinyint(4) DEFAULT NULL,
  `src_bic` varchar(45) DEFAULT NULL,
  `dest_bic` varchar(45) DEFAULT NULL,
  `account` varchar(45) DEFAULT NULL,
  `pdf_file_location` varchar(45) DEFAULT NULL,
  `unique_mt_dir_acct` varchar(45) DEFAULT NULL,
  `swift_headers` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `systemprofile`
--

CREATE TABLE `systemprofile` (
  `id` int(11) NOT NULL,
  `Company` varchar(255) NOT NULL,
  `AppName` varchar(60) NOT NULL,
  `SystemToken` varchar(600) NOT NULL,
  `SystemKeys` varchar(300) NOT NULL,
  `ipList` varchar(600) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `systemprofile`
--

INSERT INTO `systemprofile` (`id`, `Company`, `AppName`, `SystemToken`, `SystemKeys`, `ipList`, `createdAt`, `updatedAt`, `deletedAt`, `status`) VALUES
(1, 'CALBANK PLC', 'SWIFT', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlVaVzQxLVgxMTU0LTcxR0MxLUY1MUNCLURBM0NCLUJDRCIsInN0YXRlIjowLCJpYXQiOjE2NDA5NTU4MzMsImV4cCI6MTY0MTA0MjIzM30.T8LxWEqKfbIo59_JdjLubeDGkJEUmpl6oUKyJWTE3No', 'UZW41-X1154-71GC1-F51CB-DA3CB-BCD', '192.168.0.90', '2021-12-31 13:03:53', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sys_users_status`
--

CREATE TABLE `sys_users_status` (
  `idsys_users_status` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `describe` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sys_users_status`
--

INSERT INTO `sys_users_status` (`idsys_users_status`, `name`, `describe`) VALUES
(1, 'Enable', 'User can access the platform'),
(2, 'Disable', 'User cannot access the system'),
(3, 'Pending', 'User access is pending authorisation');

-- --------------------------------------------------------

--
-- Table structure for table `sys_user_roles`
--

CREATE TABLE `sys_user_roles` (
  `idsys_user_roles` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `describe` varchar(45) DEFAULT NULL,
  `code` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sys_user_roles`
--

INSERT INTO `sys_user_roles` (`idsys_user_roles`, `name`, `describe`, `code`) VALUES
(1, 'GLOBAL_ADMIN', 'All system access', 2),
(2, 'ALERT_PROFILE_ADMIN', 'Manages the Alert Menu\'s settings', 4),
(3, 'SYS_ADMIN', 'Manages the users and settings on the system', 8),
(4, 'GENERAL_USER', 'Default system user', 16);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idsys_users` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `uid` varchar(150) DEFAULT NULL,
  `acl_role` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `authtype` int(11) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idsys_users`, `fullname`, `phone`, `username`, `email`, `password`, `uid`, `acl_role`, `status`, `timestamp`, `authtype`, `updatedAt`, `deletedAt`) VALUES
(5, 'gashie', '0271565656', 'test', 'rico@test.com', '$2b$10$F9uknoHI6T3s2dx9oilXR.BTQ.Kcl84OzOz74loire9Oj/YZsYpZ2', '0C8f452lrzPtLjQKjc06Qkot1636223405', 16, 1, '2021-11-06 18:31:32', 4, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alert_profile`
--
ALTER TABLE `alert_profile`
  ADD PRIMARY KEY (`idprofile`);

--
-- Indexes for table `alert_type`
--
ALTER TABLE `alert_type`
  ADD PRIMARY KEY (`idalert_type`),
  ADD UNIQUE KEY `alert_type_name` (`alert_type_name`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `message_flow`
--
ALTER TABLE `message_flow`
  ADD PRIMARY KEY (`idFlow`),
  ADD UNIQUE KEY `meesage_flow_name` (`meesage_flow_name`);

--
-- Indexes for table `message_type`
--
ALTER TABLE `message_type`
  ADD PRIMARY KEY (`idMsgType`);

--
-- Indexes for table `settings_authentication`
--
ALTER TABLE `settings_authentication`
  ADD PRIMARY KEY (`idsettings_authentication`);

--
-- Indexes for table `settings_auth_ad`
--
ALTER TABLE `settings_auth_ad`
  ADD PRIMARY KEY (`idsettings_auth_ad`);

--
-- Indexes for table `settings_auth_ldap`
--
ALTER TABLE `settings_auth_ldap`
  ADD PRIMARY KEY (`idsettings_auth_LDAP`);

--
-- Indexes for table `settings_auth_oauth`
--
ALTER TABLE `settings_auth_oauth`
  ADD PRIMARY KEY (`idsettings_auth_oauth`);

--
-- Indexes for table `settings_auth_type`
--
ALTER TABLE `settings_auth_type`
  ADD PRIMARY KEY (`idsettings_authentication_type`);

--
-- Indexes for table `settings_company`
--
ALTER TABLE `settings_company`
  ADD PRIMARY KEY (`idsettings_company`);

--
-- Indexes for table `settings_email`
--
ALTER TABLE `settings_email`
  ADD PRIMARY KEY (`idsettings_sms`);

--
-- Indexes for table `settings_paths`
--
ALTER TABLE `settings_paths`
  ADD PRIMARY KEY (`idsettings_paths`);

--
-- Indexes for table `settings_token`
--
ALTER TABLE `settings_token`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `smsgateway`
--
ALTER TABLE `smsgateway`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `swift_message_metadata`
--
ALTER TABLE `swift_message_metadata`
  ADD PRIMARY KEY (`idswift_message_metadata`);

--
-- Indexes for table `systemprofile`
--
ALTER TABLE `systemprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Company` (`Company`);

--
-- Indexes for table `sys_users_status`
--
ALTER TABLE `sys_users_status`
  ADD PRIMARY KEY (`idsys_users_status`);

--
-- Indexes for table `sys_user_roles`
--
ALTER TABLE `sys_user_roles`
  ADD PRIMARY KEY (`idsys_user_roles`),
  ADD UNIQUE KEY `code_UNIQUE` (`code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idsys_users`),
  ADD UNIQUE KEY `phone` (`phone`,`username`,`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alert_profile`
--
ALTER TABLE `alert_profile`
  MODIFY `idprofile` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `alert_type`
--
ALTER TABLE `alert_type`
  MODIFY `idalert_type` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message_flow`
--
ALTER TABLE `message_flow`
  MODIFY `idFlow` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message_type`
--
ALTER TABLE `message_type`
  MODIFY `idMsgType` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings_authentication`
--
ALTER TABLE `settings_authentication`
  MODIFY `idsettings_authentication` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `settings_auth_ldap`
--
ALTER TABLE `settings_auth_ldap`
  MODIFY `idsettings_auth_LDAP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `settings_auth_oauth`
--
ALTER TABLE `settings_auth_oauth`
  MODIFY `idsettings_auth_oauth` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `settings_company`
--
ALTER TABLE `settings_company`
  MODIFY `idsettings_company` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `settings_email`
--
ALTER TABLE `settings_email`
  MODIFY `idsettings_sms` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `settings_paths`
--
ALTER TABLE `settings_paths`
  MODIFY `idsettings_paths` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `settings_token`
--
ALTER TABLE `settings_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `smsgateway`
--
ALTER TABLE `smsgateway`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `systemprofile`
--
ALTER TABLE `systemprofile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sys_users_status`
--
ALTER TABLE `sys_users_status`
  MODIFY `idsys_users_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idsys_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
