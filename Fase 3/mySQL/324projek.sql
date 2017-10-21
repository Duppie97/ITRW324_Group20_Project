-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 12, 2017 at 08:18 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `324projek`
--

-- --------------------------------------------------------

--
-- Table structure for table `create_session`
--

CREATE TABLE `create_session` (
  `Room_Num` int(10) DEFAULT NULL,
  `Room_ID` varchar(20) NOT NULL,
  `Instrument` varchar(50) DEFAULT NULL,
  `Room_Type` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `Friend_ID` varchar(15) NOT NULL,
  `Email_Member_1` varchar(50) DEFAULT NULL,
  `Email_Member_2` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `instruments`
--

CREATE TABLE `instruments` (
  `Inst_Name` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `Name` varchar(25) DEFAULT NULL,
  `Surname` varchar(50) DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(20) DEFAULT NULL,
  `Band_Stat` varchar(20) DEFAULT NULL,
  `Audio_Prof` longblob,
  `Current_Inst` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`Name`, `Surname`, `Email`, `Password`, `Band_Stat`, `Audio_Prof`, `Current_Inst`) VALUES
('Johann', 'Allers', 'allersjohann@gmail.com', '0110 Badd', 'it\'\'s-complicated', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `members_active`
--

CREATE TABLE `members_active` (
  `Room_Num` int(10) NOT NULL,
  `Member_Name` varchar(50) DEFAULT NULL,
  `Member_Email` varchar(50) DEFAULT NULL,
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_instruments`
--

CREATE TABLE `session_instruments` (
  `Session_Inst_ID` int(10) NOT NULL,
  `Room_ID` varchar(20) DEFAULT NULL,
  `Inst_Needed` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_instrument`
--

CREATE TABLE `user_instrument` (
  `Email` varchar(50) NOT NULL,
  `Instrument` varchar(50) DEFAULT NULL,
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_instrument`
--

INSERT INTO `user_instrument` (`Email`, `Instrument`, `ID`) VALUES
('allersjohann@gmail.com', 'bass-guitar', 1),
('allersjohann@gmail.com', 'microphone', 2),
('allersjohann@gmail.com', 'violin', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `create_session`
--
ALTER TABLE `create_session`
  ADD PRIMARY KEY (`Room_ID`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`Friend_ID`),
  ADD KEY `Email_Member_1` (`Email_Member_1`),
  ADD KEY `Email_Member_2` (`Email_Member_2`);

--
-- Indexes for table `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`Inst_Name`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`Email`);

--
-- Indexes for table `members_active`
--
ALTER TABLE `members_active`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `session_instruments`
--
ALTER TABLE `session_instruments`
  ADD PRIMARY KEY (`Session_Inst_ID`),
  ADD KEY `Room_ID` (`Room_ID`);

--
-- Indexes for table `user_instrument`
--
ALTER TABLE `user_instrument`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members_active`
--
ALTER TABLE `members_active`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `session_instruments`
--
ALTER TABLE `session_instruments`
  MODIFY `Session_Inst_ID` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `user_instrument`
--
ALTER TABLE `user_instrument`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`Email_Member_1`) REFERENCES `member` (`Email`),
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`Email_Member_2`) REFERENCES `member` (`Email`);

--
-- Constraints for table `session_instruments`
--
ALTER TABLE `session_instruments`
  ADD CONSTRAINT `session_instruments_ibfk_1` FOREIGN KEY (`Room_ID`) REFERENCES `create_session` (`Room_ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
