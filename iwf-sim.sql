-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 05, 2025 at 05:13 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.0

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iwf`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_moves`
--

CREATE TABLE `all_moves` (
  `move_id` int(11) NOT NULL,
  `move_name` text,
  `type` text,
  `min_damage` varchar(50) NOT NULL,
  `max_damage` tinyint(3) UNSIGNED NOT NULL,
  `baseHitChance` text,
  `stat` text,
  `stamina_cost` int(11) DEFAULT NULL,
  `momentumGain` int(11) DEFAULT NULL,
  `pinAttemptChance` text,
  `submissionAttemptChance` text,
  `move_description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `all_moves`
--

INSERT INTO `all_moves` (`move_id`, `move_name`, `type`, `min_damage`, `max_damage`, `baseHitChance`, `stat`, `stamina_cost`, `momentumGain`, `pinAttemptChance`, `submissionAttemptChance`, `move_description`) VALUES
(1, '1916 (Bloody Sunday)', 'grapple', '18', 30, '0.7', 'technicalAbility', 10, 10, '0', '0', 'A lifting inverted DDT.'),
(2, '2x4 Shot', 'strike', '20', 35, '0.6', 'brawlingAbility', 10, 18, '0', '0', 'A brutal shot with a 2x4.'),
(3, '450 Splash', 'strike', '28', 40, '0.7', 'aerialAbility', 10, 15, '0', '0', 'A spectacular 450 splash.'),
(4, '619', 'highFlying', '24', 32, '0.65', 'aerialAbility', 10, 12, '0', '0', 'A springboard tiger feint kick.'),
(5, '747 Splash', 'grapple', '30', 50, '0.7', 'strength', 10, 18, '0', '0', 'A massive splash.'),
(6, 'Abdominal Stretch', 'grapple', '22', 30, '0.75', 'technicalAbility', 8, 7, '0', '0.6', 'A classic abdominal stretch.'),
(7, 'Air Pillman (Springboard Clothesline)', 'finisher', '20', 35, '0.65', 'aerialAbility', 10, 12, '0', '0', 'A springboard clothesline.'),
(8, 'Air Sabu (Springboard Leg Drop)', 'highFlying', '30', 45, '0.5', 'aerialAbility', 10, 20, '0', '0', 'A springboard leg drop.'),
(9, 'Alabama Jam', 'finisher', '50', 70, '0.8', 'aerialAbility', 10, 30, '0.6', '0', 'Bobby Eaton\'s diving leg drop finisher.'),
(10, 'Anaconda Vice', 'grapple', '25', 30, '0.75', 'technicalAbility', 10, 9, '0', '0.6', 'A powerful submission hold.'),
(11, 'Angle Slam (Olympic Slam)', 'grapple', '30', 45, '0.75', 'technicalAbility', 10, 15, '0', '0', 'Kurt Angle\'s signature slam.'),
(12, 'Ankle Lock', 'strike', '30', 45, '0.8', 'technicalAbility', 10, 10, '0', '0.85', 'Kurt Angle\'s signature submission.'),
(13, 'Arabian Facebuster (Chair Assisted)', 'strike', '25', 35, '0.5', 'brawlingAbility', 10, 15, '0', '0', 'A chair-assisted facebuster.'),
(14, 'Arm Drag', 'grapple', '18', 24, '0.85', 'technicalAbility', 8, 7, '0', '0', 'A quick arm drag.'),
(15, 'Asiatic Spike (Thumb to Throat)', 'finisher', '40', 60, '0.6', 'brawlingAbility', 10, 30, '0.65', '0', 'Muraco\'s thumb to the throat.'),
(16, 'Atomic Drop', 'grapple', '18', 24, '0.8', 'technicalAbility', 8, 7, '0', '0', 'A classic atomic drop.'),
(17, 'Atomic Leg Drop', 'finisher', '50', 75, '0.85', 'strength', 10, 18, '0', '0', 'Hulk Hogan\'s signature leg drop.'),
(18, 'Attitude Adjustment (FU)', 'finisher', '50', 70, '0.8', 'strength', 10, 18, '0', '0', 'Cena\'s signature fireman\'s carry takeover.'),
(19, 'Avalanche Splash', 'strike', '28', 40, '0.65', 'strength', 10, 15, '0', '0', 'A corner splash.'),
(20, 'Axe Handle (from top rope)', 'strike', '26', 35, '0.85', 'aerialAbility', 7, 12, '0', '0', 'A diving axe handle.'),
(21, 'Axe Kick', 'strike', '28', 36, '0.7', 'strength', 8, 7, '0', '0', 'A basic axe kick.'),
(22, 'Axe Kick (Booker T\'s Axe Kick)', 'finisher', '45', 65, '0.85', 'strength', 10, 35, '0.65', '0', 'Booker T\'s signature axe kick.'),
(23, 'Backbreaker', 'finisher', '50', 70, '0.7', 'strength', 10, 40, '0.75', '0', 'Bruno\'s powerful backbreaker.'),
(24, 'Banzai Drop', 'finisher', '55', 80, '0.85', 'strength', 10, 30, '0.7', '0', 'Rikishi\'s signature sitting senton.'),
(25, 'Batista Bomb', 'finisher', '55', 80, '0.85', 'strength', 10, 40, '0.75', '0', 'Batista\'s powerful powerbomb.'),
(26, 'Bearhug', 'grapple', '20', 27, '0.8', 'strength', 10, 10, '0', '0.6', 'A powerful bearhug.'),
(27, 'BFT (Blunt Force Trauma)', 'grapple', '25', 40, '0.65', 'strength', 10, 15, '0', '0', 'LA Knight\'s signature facebuster.'),
(28, 'Big Boot', 'strike', '24', 32, '0.75', 'strength', 8, 10, '0', '0', 'A forceful kick with a big boot.'),
(29, 'Big Splash', 'strike', '22', 34, '0.65', 'strength', 10, 15, '0', '0', 'A massive splash.'),
(30, 'Bionic Elbow', 'strike', '20', 28, '0.75', 'brawlingAbility', 10, 12, '0', '0', 'Dusty\'s signature elbow drop.'),
(31, 'Bionic Forearm', 'strike', '30', 38, '0.8', 'brawlingAbility', 7, 12, '0', '0', 'A devastating forearm smash.'),
(32, 'Black Mass (Spinning Heel Kick)', 'strike', '30', 40, '0.65', 'strength', 10, 18, '0', '0', 'A devastating spinning heel kick.'),
(33, 'Body Slam', 'grapple', '15', 25, '0.8', 'strength', 9, 8, '0', '0', 'A basic body slam.'),
(34, 'Book End (Side Slam)', 'grapple', '26', 37, '0.7', 'strength', 10, 12, '0', '0', 'A powerful side slam.'),
(35, 'Boss Man Slam', 'grapple', '28', 36, '0.8', 'strength', 10, 15, '0', '0', 'Big Boss Man\'s signature slam.'),
(36, 'Brain Chop', 'strike', '26', 35, '0.6', 'brawlingAbility', 10, 20, '0', '0', 'A powerful brain chop.'),
(37, 'Brainbuster', 'grapple', '35', 45, '0.7', 'technicalAbility', 10, 10, '0', '0', 'A vertical suplex into a brainbuster.'),
(38, 'Brawler\'s Elbow', 'finisher', '30', 50, '0.5', 'brawlingAbility', 10, 8, '0.2', '0', 'Brooklyn Brawler\'s elbow drop.'),
(39, 'Brazos Valley Backbreaker', 'grapple', '34', 45, '0.7', 'technicalAbility', 10, 20, '0', '0.8', 'Stan Hansen\'s Boston Crab.'),
(40, 'Bridging Fisherman Suplex', 'grapple', '25', 32, '0.75', 'technicalAbility', 10, 12, '0', '0', 'A bridging fisherman suplex.'),
(41, 'Brogue Kick', 'strike', '35', 45, '0.65', 'strength', 10, 18, '0', '0', 'Sheamus\'s devastating bicycle kick.'),
(42, 'Brooklyn Crab', 'grapple', '20', 28, '0.6', 'technicalAbility', 5, 3, '0', '0.2', 'A basic crab hold.'),
(43, 'Bulldog', 'strike', '25', 32, '0.7', 'brawlingAbility', 8, 7, '0', '0', 'A running bulldog.'),
(44, 'Calf Crusher', 'grapple', '20', 26, '0.75', 'technicalAbility', 10, 9, '0', '0.6', 'A painful leg submission.'),
(45, 'Camel Clutch', 'finisher', '45', 70, '0.75', 'technicalAbility', 10, 12, '0', '0.8', 'The Iron Sheik\'s signature submission.'),
(46, 'Cannonball Senton', 'strike', '22', 28, '0.65', 'brawlingAbility', 10, 10, '0', '0', 'A corner senton.'),
(47, 'Choke', 'strike', '20', 28, '0.75', 'strength', 8, 10, '0', '0', 'A powerful choke.'),
(48, 'Chokeslam', 'finisher', '50', 70, '0.85', 'strength', 10, 15, '0', '0', 'A classic chokeslam.'),
(49, 'Chop', 'strike', '20', 26, '0.8', 'brawlingAbility', 8, 7, '0', '0', 'A classic knife-edge chop.'),
(50, 'Claymore Kick', 'strike', '32', 42, '0.75', 'strength', 10, 18, '0', '0', 'Drew\'s devastating running boot.'),
(51, 'Clothesline', 'strike', '25', 35, '0.75', 'strength', 10, 12, '0', '0', 'A stiff clothesline.'),
(52, 'Codebreaker', 'strike', '28', 40, '0.65', 'strength', 10, 18, '0', '0', 'A devastating knee to the face.'),
(53, 'Coffin Drop', 'finisher', '45', 65, '0.6', 'aerialAbility', 10, 35, '0.7', '0', 'Darby Allin\'s signature diving senton.'),
(54, 'Coquina Clutch (Rear Naked Choke)', 'grapple', '35', 55, '0.75', 'technicalAbility', 10, 18, '0', '0.85', 'Joe\'s signature submission.'),
(55, 'Coup de Grâce', 'finisher', '50', 70, '0.8', 'aerialAbility', 10, 40, '0.7', '0', 'Finn Balor\'s signature diving foot stomp.'),
(56, 'Crippler Crossface', 'finisher', '50', 70, '0.8', 'technicalAbility', 10, 9, '0', '0.85', 'Chris Benoit\'s signature submission.'),
(57, 'Cross Rhodes', 'finisher', '50', 70, '0.80', 'strength', 10, 35, '0.68', '0', 'Cody Rhodes\' signature inverted suplex.'),
(58, 'Cross-Legged Moonsault', 'highFlying', '30', 45, '0.75', 'aerialAbility', 10, 15, '0', '0', 'A unique moonsault.'),
(59, 'Crossface Chickenwing', 'finisher', '45', 75, '0.8', 'technicalAbility', 10, 30, '0', '0.8', 'Bob Backlund\'s signature submission.'),
(60, 'Curb Stomp (Blackout)', 'strike', '35', 45, '0.7', 'strength', 10, 18, '0', '0', 'Seth Rollins\' devastating curb stomp.'),
(61, 'DDT', 'grapple', '35', 45, '0.7', 'technicalAbility', 10, 15, '0', '0', 'Jake\'s iconic DDT.'),
(62, 'Deep Six', 'grapple', '22', 33, '0.7', 'strength', 10, 10, '0', '0', 'A spinning deep six.'),
(63, 'Diamond Cutter', 'finisher', '45', 70, '0.85', 'strength', 10, 18, '0', '0', 'DDP\'s signature cutter.'),
(64, 'Discus Clothesline', 'grapple', '29', 37, '0.7', 'strength', 10, 15, '0', '0', 'A spinning clothesline.'),
(65, 'Discus Punch', 'finisher', '45', 60, '0.85', 'brawlingAbility', 10, 28, '0.85', '0', 'Kerry\'s discus punch finisher.'),
(66, 'Diving Crossbody', 'highFlying', '30', 45, '0.78', 'aerialAbility', 10, 15, '0', '0', 'A high-flying crossbody.'),
(67, 'Diving Elbow Drop', 'highFlying', '25', 35, '0.75', 'aerialAbility', 10, 12, '0', '0', 'A diving elbow drop.'),
(68, 'Diving Head Butt', 'finisher', '45', 65, '0.6', 'aerialAbility', 10, 45, '0.7', '0', 'Bam Bam\'s diving headbutt finisher.'),
(69, 'Diving Headbutt', 'highFlying', '30', 40, '0.6', 'aerialAbility', 10, 9, '0', '0', 'A diving headbutt.'),
(70, 'Diving Knee Drop', 'highFlying', '30', 45, '0.6', 'aerialAbility', 10, 10, '0', '0', 'A diving knee drop.'),
(71, 'Diving Leg Drop Bulldog (rare)', 'highFlying', '35', 45, '0.75', 'aerialAbility', 10, 8, '0', '0', 'A rare diving bulldog.'),
(72, 'Dog-Faced Gremlin Headbutt', 'strike', '25', 33, '0.7', 'brawlingAbility', 10, 9, '0', '0', 'A forceful headbutt.'),
(73, 'Dominator', 'grapple', '40', 70, '0.7', 'strength', 10, 15, '0', '0', 'Ron Simmons\' signature slam.'),
(74, 'Doomsday Device (with Hawk)', 'finisher', '50', 75, '0.75', 'strength', 10, 40, '0.75', '0', 'The Road Warriors\' tag team finisher.'),
(75, 'Double A Spinebuster', 'finisher', '45', 65, '0.85', 'strength', 10, 35, '0.65', '0', 'Arn Anderson\'s signature spinebuster.'),
(76, 'Double Arm DDT', 'finisher', '45', 70, '0.8', 'brawlingAbility', 10, 35, '0.65', '0', 'Mick Foley\'s signature DDT.'),
(77, 'Double Chicken Wing', 'finisher', '50', 75, '0.85', 'technicalAbility', 10, 30, '0', '0.8', 'Ricky Steamboat\'s double chicken wing.'),
(78, 'Dragon sleeper', 'grapple', '25', 40, '0.8', 'technicalAbility', 10, 11, '0', '0.6', 'A painful dragon sleeper.'),
(79, 'Drive-By (Running Dropkick)', 'highFlying', '30', 36, '0.7', 'aerialAbility', 10, 10, '0', '0', 'A running dropkick to a seated opponent.'),
(80, 'Dropkick', 'highFlying', '20', 30, '0.8', 'aerialAbility', 10, 12, '0', '0', 'A classic dropkick.'),
(81, 'Earthquake Splash', 'finisher', '45', 75, '0.8', 'strength', 10, 20, '0', '0', 'A crushing splash.'),
(82, 'Edgecution (Impaler DDT)', 'grapple', '35', 42, '0.7', 'technicalAbility', 10, 12, '0', '0', 'A lifting DDT.'),
(83, 'Elbow Drop', 'strike', '20', 25, '0.7', 'brawlingAbility', 8, 7, '0', '0', 'A basic elbow drop.'),
(84, 'Elbow Drop (from apron)', 'highFlying', '30', 36, '0.8', 'brawlingAbility', 10, 20, '0', '0', 'A dangerous elbow drop from the ring apron.'),
(85, 'Elbow Drop (from standing)', 'finisher', '50', 70, '0.80', 'strength', 10, 50, '0.8', '0', 'Andre\'s signature standing elbow drop.'),
(86, 'End of Days', 'finisher', '45', 65, '0.6', 'strength', 10, 38, '0.7', '0', 'Baron Corbin\'s devastating finisher.'),
(87, 'Eye Poke', 'strike', '18', 24, '0.8', 'brawlingAbility', 5, 10, '0', '0', 'A classic dirty tactic.'),
(88, 'F5', 'finisher', '60', 80, '0.85', 'strength', 10, 50, '0.85', '0', 'Brock Lesnar\'s devastating F5.'),
(89, 'Fameasser', 'highFlying', '45', 65, '0.6', 'aerialAbility', 10, 9, '0', '0', 'A leg drop bulldog.'),
(91, 'Figure-Four Leglock', 'grapple', '30', 40, '0.75', 'technicalAbility', 10, 9, '0', '0.8', 'A classic figure-four leglock.'),
(92, 'Fist Drop', 'strike', '20', 28, '0.75', 'brawlingAbility', 8, 7, '0', '0', 'A forceful fist drop.'),
(93, 'Five Knuckle Shuffle', 'strike', '21', 27, '0.8', 'brawlingAbility', 8, 7, '0', '0', 'A taunting fist drop.'),
(94, 'Five-Star Frog Splash', 'finisher', '45', 70, '0.75', 'aerialAbility', 10, 18, '0', '0', 'RVD\'s signature frog splash.'),
(95, 'Flying Crossbody', 'highFlying', '28', 35, '0.6', 'aerialAbility', 10, 10, '0', '0', 'A high-flying crossbody.'),
(96, 'Flying Elbow Drop', 'highFlying', '30', 38, '0.6', 'aerialAbility', 8, 7, '0', '0', 'A flying elbow drop.'),
(97, 'Flying Forearm', 'highFlying', '25', 32, '0.6', 'aerialAbility', 8, 7, '0', '0', 'A flying forearm smash.'),
(98, 'Flying forearm & Kip up', 'strike', '25', 32, '0.75', 'aerialAbility', 10, 12, '0', '0', 'A flying forearm followed by a kip-up.'),
(99, 'Forearm Shiver', 'grapple', '15', 25, '0.65', 'strength', 6, 5, '0', '0', 'A stiff forearm shiver.'),
(100, 'Forearm Shiver (Enhanced)', 'finisher', '20', 28, '0.5', 'strength', 10, 10, '0.3', '0', 'Iron Mike\'s enhanced forearm shiver.'),
(101, 'Forearm Smash', 'strike', '20', 28, '0.8', 'strength', 8, 7, '0', '0', 'A strong forearm smash.'),
(102, 'Fork Stab', 'grapple', '20', 30, '0.7', 'brawlingAbility', 8, 7, '0', '0', 'A brutal stab with a fork.'),
(103, 'Frankensteiner (Hurricanrana)', 'strike', '28', 38, '0.75', 'aerialAbility', 10, 12, '0', '0', 'A high-flying hurricanrana.'),
(104, 'Freebird DDT', 'finisher', '45', 60, '0.85', 'technicalAbility', 10, 12, '0', '0', 'The Freebirds\' signature DDT.'),
(105, 'Frog Splash', 'highFlying', '35', 45, '0.75', 'aerialAbility', 10, 12, '0', '0', 'A high-flying frog splash.'),
(106, 'Full Nelson', 'grapple', '22', 29, '0.75', 'strength', 10, 12, '0', '0.6', 'A powerful full nelson.'),
(107, 'Future Shock DDT', 'grapple', '30', 35, '0.7', 'strength', 10, 12, '0', '0', 'A powerful DDT.'),
(108, 'German Suplex', 'grapple', '28', 38, '0.75', 'technicalAbility', 10, 12, '0', '0', 'A powerful German suplex.'),
(109, 'Giant Press', 'highFlying', '28', 38, '0.3', 'strength', 8, 5, '0', '0', 'A massive press.'),
(110, 'Gillberg Splash', 'finisher', '25', 30, '0.4', 'strength', 10, 8, '0.1', '0', 'Gillberg\'s comedic splash.'),
(111, 'Gore (Spear)', 'strike', '35', 45, '0.65', 'strength', 10, 18, '0', '0', 'Rhyno\'s devastating spear.'),
(112, 'Gorilla Press Powerslam', 'finisher', '50', 70, '0.65', 'strength', 10, 40, '0.7', '0', 'Bron Breakker\'s signature powerslam.'),
(113, 'Gorilla Press Slam', 'grapple', '50', 70, '0.7', 'strength', 10, 18, '0', '0', 'Warrior\'s signature press slam.'),
(114, 'Green Mist', 'strike', '24', 32, '0.8', 'brawlingAbility', 1, 20, '0.5', '0.5', 'A blinding green mist.'),
(115, 'Greetings From Kiss (Kiss Goodnight)', 'grapple', '28', 38, '0.8', 'strength', 10, 12, '0', '0', 'A powerful grapple move.'),
(116, 'GTS (Go To Sleep)', 'finisher', '50', 65, '0.85', 'strength', 10, 38, '0.7', '0', 'CM Punk\'s signature knee strike.'),
(117, 'Guillotine Choke', 'finisher', '50', 75, '0.75', 'technicalAbility', 10, 40, '0', '0.75', 'Roman\'s signature submission.'),
(118, 'Guitar Shot', 'strike', '28', 36, '0.6', 'brawlingAbility', 10, 12, '0', '0', 'A brutal guitar shot.'),
(119, 'Hands of Stone (Punch)', 'finisher', '45', 65, '0.6', 'brawlingAbility', 10, 30, '0.65', '0', 'Ronnie Garvin\'s signature punch.'),
(120, 'Headbutt', 'strike', '22', 33, '0.8', 'brawlingAbility', 6, 5, '0', '0', 'A forceful headbutt.'),
(121, 'Headbutt off the Top Rope', 'finisher', '45', 70, '0.75', 'brawlingAbility', 10, 35, '0.65', '0', 'Barbarian\'s diving headbutt finisher.'),
(122, 'High Knee', 'strike', '22', 28, '0.75', 'strength', 6, 5, '0', '0', 'A basic high knee.'),
(123, 'Hot Shot', 'finisher', '40', 65, '0.85', 'aerialAbility', 10, 30, '0.6', '0', 'Eddie Gilbert\'s signature top rope clothesline.'),
(124, 'Houston Hangover (Diving Senton)', 'highFlying', '{\"max\": 40, \"min\": 25}', 0, '0.55', 'aerialAbility', 10, 15, '0', '0', 'A diving senton.'),
(125, 'Hurricanrana', 'highFlying', '26', 36, '0.7', 'aerialAbility', 10, 9, '0', '0', 'A high-flying hurricanrana.'),
(126, 'Hurt Lock (Full Nelson)', 'finisher', '50', 70, '0.75', 'technicalAbility', 10, 40, '0', '0.8', 'Bobby Lashley\'s full nelson submission.'),
(127, 'Inverted atomic drop', 'grapple', '{\"max\": 15, \"min\": 8}', 0, '0.7', 'technicalAbility', 10, 11, '0', '0', 'An inverted atomic drop.'),
(128, 'Iron Claw', 'strikes', '{\"max\": 17, \"min\": 12}', 0, '0.75', 'strength', 10, 11, '0', '0.7', 'A crushing iron claw.'),
(129, 'Jackhammer', 'grapple', '{\"max\": 70, \"min\": 40}', 0, '0.8', 'strength', 10, 40, '0', '0', 'Goldberg\'s signature jackhammer.'),
(130, 'Jackhammer (weak)', 'grapple', '{\"max\": 10, \"min\": 5}', 0, '0.5', 'strength', 8, 5, '0', '0', 'A weak jackhammer.'),
(131, 'Jackknife Powerbomb', 'grapple', '{\"max\": 45, \"min\": 30}', 0, '0.7', 'strength', 10, 18, '0', '0', 'Nash\'s signature powerbomb.'),
(132, 'Judas Effect (Elbow)', 'finisher', '{\"max\": 60, \"min\": 40}', 0, '0.55', 'brawlingAbility', 10, 30, '0.6', '0', 'Jericho\'s spinning back elbow.'),
(133, 'Jumping Elbow Drop', 'strike', '19', 26, '0.8', 'brawlingAbility', 10, 12, '0', '0', 'A jumping elbow drop.'),
(134, 'Juvi Driver', 'grapple', '30', 40, '0.75', 'aerialAbility', 10, 12, '0', '0', 'A sitout driver.'),
(135, 'Killswitch (Unprettier)', 'grapple', '30', 40, '0.65', 'technicalAbility', 10, 15, '0', '0', 'Christian\'s signature inverted double underhook facebuster.'),
(136, 'King Kong Knee Drop', 'grapple', '25', 35, '0.65', 'brawlingAbility', 10, 15, '0', '0', 'A brutal knee drop.'),
(137, 'King Kong Lariat', 'strike', '25', 35, '0.7', 'brawlingAbility', 10, 12, '0', '0', 'A brutal lariat.'),
(138, 'Kinshasa (Knee Strike)', 'finisher', '45', 75, '0.85', 'brawlingAbility\n', 10, 18, '0', '0', 'Nakamura\'s devastating knee strike.'),
(139, 'Knee Lift', 'strike', '22', 30, '0.7', 'brawlingAbility\n', 8, 7, '0', '0', 'A sharp knee lift.'),
(140, 'Knee Strike', 'strike', '22', 30, '0.75', 'brawlingAbility', 10, 10, '0', '0', 'A stiff knee strike.'),
(141, 'Knee Trembler (Knee Strike)', 'strike', '25', 35, '0.7', 'brawlingAbility', 10, 12, '0', '0', 'A stiff knee strike.'),
(143, 'W.M.D - Weapon of Mass Destruction', 'strike', '35', 55, '0.6', 'strength', 12, 24, '0', '0', 'Big Show\'s devastating punch.'),
(145, 'Lariat', 'strike', '23', 33, '0.75', 'strength', 10, 12, '0', '0', 'A forceful lariat.'),
(146, 'Left Handed Punch', 'strike', '20', 22, '0.8', 'brawlingAbility', 7, 6, '0', '0', 'A stiff left-handed punch.'),
(147, 'Leg Drop', 'strike', '20', 25, '0.75', 'strength', 6, 5, '0', '0', 'A basic leg drop.'),
(148, 'Lie Detector (Corkscrew Scissor Kick)', 'grapple', '25', 35, '0.65', 'aerialAbility', 10, 9, '0', '0', 'A corkscrew scissor kick.'),
(149, 'Lionsault', 'highFlying', '30', 38, '0.6', 'aerialAbility', 10, 15, '0', '0', 'A spectacular moonsault.'),
(150, 'Lou Thesz Press', 'strike', '20', 24, '0.75', 'brawlingAbility', 10, 10, '0', '0', 'A classic wrestling maneuver.'),
(151, 'Low Blow', 'strike', '28', 34, '0.85', 'brawlingAbility', 8, 7, '0', '0', 'A sneaky low blow.'),
(152, 'Mandible Claw', 'finisher', '45', 75, '0.85', 'brawlingAbility', 10, 10, '0', '0.6', 'A painful jaw submission.'),
(153, 'Military Press', 'grapple', '24', 32, '0.72', 'strength', 8, 16, '0', '0', 'A powerful military press.'),
(154, 'Military Press Powerslam', 'grapple', '{\"max\": 40, \"min\": 25}', 0, '0.7', 'strength', 10, 15, '0', '0', 'A powerful military press into a powerslam.'),
(155, 'Million Dollar Dream (Cobra Clutch)', 'grapple', '{\"max\": 35, \"min\": 20}', 0, '0.75', 'technicalAbility', 10, 12, '0', '0.75', 'DiBiase\'s signature submission.'),
(156, 'Missile Dropkick', 'strike', '25', 35, '0.8', 'aerialAbility', 10, 9, '0', '0', 'A high-flying dropkick.'),
(157, 'Monster Dropkick', 'strike', '{\"max\": 35, \"min\": 20}', 0, '0.7', 'strength', 10, 12, '0', '0', 'A surprisingly agile dropkick for his size.'),
(158, 'Moonsault', 'highFlying', '32', 45, '0.65', 'aerialAbility', 10, 20, '0', '0', 'A spectacular moonsault.'),
(159, 'Muscle Buster', 'strike', '{\"max\": 50, \"min\": 35}', 0, '0.7', 'strength', 10, 20, '0', '0', 'A devastating vertical suplex powerbomb.'),
(160, 'Muta Lock', 'grapple', '28', 40, '0.75', 'technicalAbility', 10, 9, '0', '0.6', 'Muta\'s signature submission.'),
(161, 'Nightstick Shot', 'strike', '{\"max\": 28, \"min\": 18}', 0, '0.65', 'brawlingAbility', 10, 10, '0', '0', 'A brutal nightstick shot.'),
(162, 'None', 'highFlying', '{\"max\": 0, \"min\": 0}', 0, '0', 'none', 0, 0, '0', '0', 'No high-flying move.'),
(163, 'Oklahoma Stampede (Running Powerslam)', 'finisher', '40', 65, '0.79', 'strength', 10, 15, '0', '0', 'A powerful running powerslam.'),
(164, 'Old School (Arm Twist Ropewalk Chop)', 'strike', '25', 30, '0.75', 'aerialAbility', 10, 10, '0', '0', 'Undertaker\'s signature ropewalk chop.'),
(165, 'Olé Kick (Corner Enzuigiri)', 'highFlying', '22', 36, '0.6', 'brawlingAbility', 10, 12, '0', '0', 'A running enzuigiri in the corner.'),
(166, 'One-Winged Angel', 'grapple', '45', 65, '0.65', 'strength', 10, 20, '0', '0', 'Omega\'s signature electric chair driver.'),
(167, 'Panama Sunrise (Flipping Piledriver)', 'highFlying', '35', 45, '0.6', 'aerialAbility', 10, 15, '0', '0', 'A high-risk flipping piledriver.'),
(168, 'Paradigm Shift (Death Rider)', 'finisher', '40', 65, '0.8', 'brawlingAbility', 10, 18, '0', '0', 'Moxley\'s double arm DDT.'),
(169, 'Pedigree', 'finisher', '45', 70, '0.8', 'strength', 10, 12, '0', '0', 'A double underhook facebuster.'),
(170, 'People\'s Elbow', 'strike', '22', 26, '0.6', 'brawlingAbility', 10, 15, '0', '0', 'The Rock\'s iconic elbow drop.'),
(171, 'Perfect-Plex', 'finisher', '50', 75, '0.8', 'technicalAbility', 10, 38, '1.0', '0', 'Curt Hennig\'s signature suplex.'),
(172, 'Phenomenal Forearm', 'strike', '{\"max\": 35, \"min\": 20}', 0, '0.7', 'strength', 10, 12, '0', '0', 'A springboard forearm smash.'),
(173, 'Piledriver', 'grapple', '32', 40, '0.75', 'technicalAbility', 10, 8, '0', '0', 'A classic piledriver.'),
(174, 'Piledriver (on concrete)', 'grapple', '36', 45, '0.75', 'brawlingAbility', 10, 18, '0', '0', 'A brutal piledriver on a hard surface.'),
(175, 'Pop-up Powerbomb', 'grapple', '45', 75, '0.7', 'strength', 10, 15, '0', '0', 'Owens\' signature powerbomb.'),
(176, 'Powerbomb', 'grapple', '40', 60, '0.7', 'strength', 10, 18, '0', '0', 'A powerful powerbomb.'),
(177, 'Punch', 'strike', '20', 22, '0.8', 'brawlingAbility', 4, 2, '0', '0', 'A simple punch.'),
(178, 'Punches', 'strike', '20', 30, '0.7', 'brawlingAbility', 5, 4, '0', '0', 'A series of punches.'),
(179, 'Punjabi Plunge (Two-Handed Chokeslam)', 'finisher', '50', 70, '0.8', 'strength', 10, 18, '0', '0', 'Khali\'s devastating chokeslam.'),
(180, 'Punt Kick (rare)', 'strike', '30', 35, '0.7', 'brawlingAbility', 10, 25, '0', '0', 'A dangerous punt kick.'),
(181, 'Razor\'s Edge (Outsider\'s Edge)', 'finisher', '50', 75, '0.8', 'strength', 10, 18, '0', '0', 'Scott Hall\'s signature crucifix powerbomb.'),
(182, 'Reality Check (Running Knee Lift)', 'strike', '{\"max\": 25, \"min\": 15}', 0, '0.7', 'brawlingAbility', 10, 9, '0', '0', 'A running knee lift.'),
(183, 'Regal Stretch', 'grapple', '30', 40, '0.8', 'technicalAbility', 10, 9, '0', '0.85', 'A painful submission hold.'),
(184, 'Reverse Exploder Suplex', 'grapple', '{\"max\": 35, \"min\": 20}', 0, '0.7', 'technicalAbility', 10, 12, '0', '0', 'A reverse exploder suplex.'),
(185, 'RKO (Jumping Cutter)', 'finisher', '50', 70, '0.8', 'strength', 10, 20, '0', '0', 'Randy Orton\'s iconic cutter.'),
(186, 'Rock Bottom', 'grapple', '40', 70, '0.78', 'strength', 10, 18, '0', '0', 'The Rock\'s signature uranage.'),
(187, 'Rolling Thunder (Rolling Senton)', 'highFlying', '{\"max\": 35, \"min\": 20}', 0, '0.6', 'aerialAbility', 10, 12, '0', '0', 'A rolling senton.'),
(188, 'Roundhouse Kick', 'strike', '{\"max\": 28, \"min\": 18}', 0, '0.7', 'strength', 10, 10, '0', '0', 'A stiff roundhouse kick.'),
(189, 'Rude Awakening (Neckbreaker)', 'grapple', '45', 70, '0.79', 'strength', 10, 15, '0', '0', 'Rick Rude\'s signature neckbreaker.'),
(190, 'Rump Shaker (Stink Face)', 'strike', '15', 20, '0.6', 'brawlingAbility', 10, 25, '0', '0.6', 'A humiliating stink face.'),
(191, 'Running Hip Attack', 'strike', '26', 36, '0.75', 'brawlingAbility', 10, 12, '0', '0', 'A powerful running hip attack.'),
(192, 'Running Powerslam', 'grapple', '25', 40, '0.7', 'strength', 10, 15, '0', '0', 'A powerful running powerslam.'),
(193, 'Russian Sickle (Clothesline)', 'finisher', '40', 65, '0.7', 'strength', 10, 12, '0', '0', 'A devastating clothesline.'),
(194, 'Salt Throw', 'strike', '15', 25, '0.8', 'brawlingAbility', 5, 4, '0', '0', 'A traditional sumo salt throw.'),
(195, 'Samoan Drop', 'grapple', '28', 40, '0.8', 'strength', 10, 20, '0', '0', 'A powerful Samoan drop.'),
(196, 'Samoan Spike', 'finisher', '50', 70, '0.85', 'brawlingAbility', 10, 38, '0.75', '0', 'Umaga\'s devastating thumb thrust.'),
(197, 'Scissor Kick', 'strike', '{\"max\": 28, \"min\": 18}', 0, '0.65', 'strength', 10, 10, '0', '0', 'A signature scissor kick.'),
(198, 'Scorpion Death Drop', 'grapple', '30', 45, '0.7', 'technicalAbility', 10, 25, '0.8', '0', 'A reverse DDT.'),
(199, 'Scorpion Deathlock', 'finisher', '50', 70, '0.85', 'technicalAbility', 10, 38, '0', '0.8', 'Sting\'s signature submission.'),
(200, 'Senton', 'strike', '{\"max\": 25, \"min\": 15}', 0, '0.7', 'brawlingAbility', 10, 8, '0', '0', 'A powerful senton.'),
(201, 'Sharpshooter', 'finisher', '50', 70, '0.8', 'technicalAbility', 10, 40, '0', '0.85', 'Bret Hart\'s signature submission.'),
(202, 'Shattered Dreams', 'grapple', '{\"max\": 35, \"min\": 20}', 0, '0.65', 'technicalAbility', 10, 12, '0', '0', 'A controversial low blow.'),
(203, 'Shining Wizard (Running Knee)', 'finisher', '45', 65, '0.8', 'technicalAbility\n', 10, 38, '0.65', '0', 'Muta\'s running knee strike.'),
(204, 'Short-Arm Clothesline', 'strike', '{\"max\": 18, \"min\": 10}', 0, '0.75', 'brawlingAbility', 8, 7, '0', '0', 'A quick short-arm clothesline.'),
(205, 'Shotgun Dropkick', 'strike', '{\"max\": 35, \"min\": 20}', 0, '0.65', 'strength', 10, 12, '0', '0', 'A running dropkick into the corner.'),
(206, 'Showstopper (Chokeslam)', 'finisher', '55', 80, '0.65', 'strength', 10, 50, '0.8', '0', 'Big Show\'s signature chokeslam.'),
(207, 'Sister Abigail', 'grapple', '45', 70, '0.65', 'brawlingAbility', 10, 18, '0', '0', 'Bray Wyatt\'s signature inverted STO.'),
(208, 'Skull-Crushing Finale (Full Neson Facebuster)', 'grapple', '{\"max\": 40, \"min\": 25}', 0, '0.65', 'strength', 10, 15, '0', '0', 'The Miz\'s signature facebuster.'),
(209, 'Sledgehammer Shot (rare)', 'strike', '{\"max\": 60, \"min\": 40}', 0, '0.3', 'brawlingAbility', 10, 20, '0', '0', 'A rare sledgehammer shot.'),
(210, 'Sleeper', 'grapple', '30', 40, '0.75', 'technicalAbility', 10, 22, '0', '0.6', 'A classic sleeper hold.'),
(212, 'Sleeper Hold', 'finisher', '45', 70, '0.8', 'technicalAbility', 10, 30, '0', '0.8', 'Nick Bockwinkel\'s signature sleeper hold.'),
(213, 'Slingshot Suplex', 'grapple', '{\"max\": 25, \"min\": 15}', 0, '0.75', 'technicalAbility', 10, 9, '0', '0', 'A slingshot suplex.'),
(214, 'Spear', 'strike', '25', 40, '0.75', 'strength', 10, 15, '0', '0', 'A forceful spear.'),
(215, 'Spear (weak)', 'strike', '15', 20, '0.55', 'strength', 6, 4, '0', '0', 'A weak spear, primarily for Gillberg'),
(216, 'Spinebuster', 'grapple', '24', 35, '0.75', 'strength', 10, 10, '0', '0', 'A classic spinebuster.'),
(217, 'Spinning Toe Hold', 'grapple', '{\"max\": 25, \"min\": 15}', 0, '0.7', 'technicalAbility', 10, 9, '0', '0.7', 'A painful leg submission.'),
(218, 'Spivey Spike (DDT)', 'finisher', '{\"max\": 60, \"min\": 40}', 0, '0.6', 'technicalAbility', 10, 35, '0.65', '0', 'Dan Spivey\'s DDT finisher.'),
(219, 'Springboard 450 Splash', 'highFlying', '{\"max\": 40, \"min\": 25}', 0, '0.65', 'aerialAbility', 10, 18, '0', '0', 'A spectacular springboard splash.'),
(220, 'Springboard Seated Senton', 'strike', '{\"max\": 25, \"min\": 15}', 0, '0.65', 'aerialAbility', 10, 10, '0', '0', 'A springboard senton.'),
(221, 'Steiner Bulldog', 'finisher', '{\"max\": 65, \"min\": 45}', 0, '0.65', 'strength', 10, 35, '0.7', '0', 'Rick Steiner\'s signature bulldog.'),
(222, 'Steiner Recliner (Camel Clutch)', 'finisher', '45', 70, '0.75', 'technicalAbility', 10, 15, '0', '0.8', 'Scott Steiner\'s signature camel clutch.'),
(223, 'Steinerline (Clothesline)', 'grapple', '22', 28, '0.75', 'strength', 10, 12, '0', '0', 'A powerful clothesline.'),
(224, 'STF (Stepover Toehold Facelock)', 'finisher', '45', 70, '0.75', 'technicalAbility', 10, 35, '0', '0.8', 'Cena\'s signature submission.'),
(225, 'Stinger Splash', 'strike', '20', 35, '0.8', 'strength', 10, 12, '0', '0', 'Sting\'s signature corner splash.'),
(226, 'Stock Market Crash (Powerslam)', 'finisher', '40', 60, '0.8', 'strength', 10, 25, '0.6', '0', 'IRS\'s signature powerslam.'),
(227, 'Stone Cold Stunner', 'grapple', '50', 70, '0.79', 'strength', 10, 20, '0', '0', 'Austin\'s iconic stunner.'),
(228, 'Styles Clash', 'finisher', '50', 70, '0.8', 'technicalAbility', 10, 45, '0.75', '0', 'AJ Styles\' signature facebuster.'),
(229, 'Sudanese Spike (Throat Thrust)', 'finisher', '40', 60, '0.7', 'brawlingAbility', 10, 30, '0.6', '0', 'Abdullah\'s signature throat thrust.'),
(230, 'Suicide Dive', 'highFlying', '{\"max\": 30, \"min\": 20}', 0, '0.6', 'aerialAbility', 10, 12, '0', '0', 'A daring dive to the outside.'),
(231, 'Superfly Splash', 'highFlying', '45', 70, '0.65', 'aerialAbility', 10, 18, '0', '0', 'Snuka\'s iconic diving splash.'),
(232, 'Superkick', 'strike', '{\"max\": 28, \"min\": 18}', 0, '0.7', 'strength', 10, 10, '0', '0', 'A devastating kick to the face.'),
(233, 'Superman Punch', 'grapple', '{\"max\": 40, \"min\": 25}', 0, '0.7', 'strength', 10, 15, '0', '0', 'Roman\'s signature punch.'),
(234, 'Superplex', 'grapple', '30', 40, '0.75', 'technicalAbility', 12, 24, '0', '0', 'A high-impact superplex from the middle rope.'),
(235, 'Suplex', 'grapple', '{\"max\": 17, \"min\": 11}', 0, '0.8', 'technicalAbility', 10, 9, '0', '0', 'A classic suplex.'),
(236, 'Surfboard Stretch', 'grapple', '{\"max\": 20, \"min\": 12}', 0, '0.8', 'technicalAbility', 10, 8, '0', '0.6', 'A painful surfboard stretch.'),
(237, 'Swanton Bomb', 'highFlying', '35', 45, '0.3', 'aerialAbility', 10, 12, '0', '0', 'A rare swanton bomb.'),
(238, 'Sweet Chin Music', 'finisher', '50', 75, '0.75', 'technicalAbility', 10, 38, '0.7', '0', 'Shawn Michaels\' signature superkick.'),
(239, 'Teardrop Suplex', 'grapple', '{\"max\": 16, \"min\": 9}', 0, '0.7', 'technicalAbility', 10, 11, '0', '0', 'A modified suplex.'),
(240, 'Texas Cloverleaf', 'grapple', '{\"max\": 25, \"min\": 15}', 0, '0.8', 'technicalAbility', 10, 9, '0', '0.85', 'A painful leg submission.'),
(241, 'The Last Shot (Knee Brainbuster)', 'finisher', '45', 65, '0.55', 'technicalAbility', 10, 40, '0.7', '0', 'Adam Cole\'s signature knee strike.'),
(242, 'The Stroke (Reverse Russian Legsweep)', 'finisher', '45', 65, '0.65', 'technicalAbility', 10, 30, '0.6', '0', 'Jeff Jarrett\'s signature reverse legsweep.'),
(243, 'Three Amigos', 'grapple', '30', 40, '0.7', 'technicalAbility', 8, 7, '0', '0', 'A series of three vertical suplexes.'),
(244, 'Three Point Stance Clothesline', 'grapple', '{\"max\": 35, \"min\": 20}', 0, '0.7', 'strength', 10, 12, '0', '0', 'A powerful clothesline.'),
(245, 'Thump (Powerslam)', 'grapple', '{\"max\": 35, \"min\": 20}', 0, '0.7', 'strength', 10, 12, '0', '0', 'A powerful powerslam.'),
(247, 'Tombstone Piledriver', 'finisher', '50', 75, '0.75', 'strength', 10, 45, '0.8', '0', 'The Undertaker\'s iconic piledriver.'),
(248, 'Tongan Death Grip', 'finisher', '50', 70, '0.7', 'brawlingAbility', 10, 15, '0', '0.8', 'A crushing throat hold.'),
(249, 'Top Rope Clothesline', 'highFlying', '{\"max\": 30, \"min\": 20}', 0, '0.4', 'aerialAbility', 10, 12, '0', '0', 'A rare top rope clothesline.'),
(250, 'Tornado DDT', 'highFlying', '28', 36, '0.6', 'aerialAbility', 10, 12, '0', '0', 'A spinning DDT.'),
(251, 'Torture Rack', 'finisher', '50', 80, '0.85', 'strength', 10, 40, '0', '0.85', 'Lex Luger\'s signature submission.'),
(252, 'Triple Jump Moonsault', 'grapple', '{\"max\": 40, \"min\": 25}', 0, '0.55', 'aerialAbility', 10, 18, '0', '0', 'A complex high-flying moonsault.'),
(253, 'Two-Handed Chokeslam', 'grapple', '50', 70, '0.7', 'strength', 10, 20, '0', '0', 'Omos\'s devastating chokeslam.'),
(254, 'V-Trigger (Knee Strike)', 'strike', '{\"max\": 45, \"min\": 30}', 0, '0.7', 'strength', 10, 18, '0', '0', 'A powerful knee strike.'),
(255, 'Vader Bomb (Corner Splash)', 'strike', '28', 34, '0.75', 'aerialAbility', 10, 20, '0', '0', 'Vader\'s signature corner splash.'),
(256, 'Van Daminator (Spinning Heel Kick with Chair)', 'strike', '25', 35, '0.55', 'brawlingAbility', 10, 15, '0', '0', 'A chair-assisted spinning heel kick.'),
(257, 'Walls of Jericho (Liontamer)', 'finisher', '45', 65, '0.7', 'technicalAbility', 10, 12, '0', '0.7', 'Jericho\'s signature Boston Crab.'),
(258, 'Warrior Splash', 'finisher', '40', 60, '0.75', 'strength', 10, 38, '0.7', '0', 'Ultimate Warrior\'s signature splash.'),
(259, 'West Coast Pop (Springboard Hurricanrana)', 'highFlying', '{\"max\": 40, \"min\": 25}', 0, '0.6', 'aerialAbility', 10, 15, '0', '0', 'A springboard hurricanrana.'),
(260, 'Western Lariat', 'finisher', '50', 75, '0.80', 'strength', 10, 18, '0', '0.9', 'Hansen\'s signature lariat.'),
(261, 'White Noise (Crucifix Powerbomb)', 'grapple', '{\"max\": 40, \"min\": 25}', 0, '0.7', 'strength', 10, 15, '0', '0', 'A crucifix powerbomb.'),
(262, 'World\'s Strongest Slam', 'grapple', '30', 35, '0.7', 'strength', 10, 20, '0', '0', 'Mark Henry\'s signature slam.'),
(263, 'Wrecking Ball Dropkick', 'highFlying', '{\"max\": 16, \"min\": 10}', 0, '0.75', 'aerialAbility', 10, 9, '0', '0', 'A powerful dropkick.'),
(264, 'Write-Off (Clothesline)', 'strike', '{\"max\": 25, \"min\": 15}', 0, '0.7', 'strength', 10, 9, '0', '0', 'A powerful clothesline.'),
(265, 'Yes! Kicks', 'strike', '24', 32, '0.75', 'technicalAbility', 10, 10, '0', '0', 'A series of rapid kicks.'),
(266, 'Yes! Lock (Omoplata Crossface)', 'finisher', '45', 65, '0.85', 'technicalAbility', 10, 40, '0', '0.9', 'Daniel Bryan\'s signature submission.'),
(267, 'Zig Zag', 'grapple', '25', 35, '0.65', 'technicalAbility', 10, 12, '0', '0', 'A jumping reverse bulldog.'),
(268, 'Top Rope Dropkick', 'highFlying', '23', 32, '0.7', 'aerialAbility', 10, 12, '0', '0', 'A top rope dropkick.'),
(269, 'Boston Crab', 'grapple', '25', 40, '0.7', 'technicalAbility\n', 10, 20, '0', '0.65', ''),
(270, 'Powerslam', 'brawling', '30', 37, '0.8', 'strength', 7, 18, '0', '0', 'A powerful slam.'),
(271, 'Superplex (from top rope)', 'finisher', '50', 75, '0.85', 'technicalAbility', 14, 30, '0.85', '0', 'Barry Windham\'s finisher.\r\n'),
(272, 'Figure Four Leglock', 'finisher', '45', 75, '0.75', 'technicalAbility', 10, 30, '0', '0.8', 'Ric Flair\'s figure-four leglock.'),
(273, 'Gutwrench Suplex', 'grapple', '24', 34, '0.85', 'technicalAbility', 6, 12, '0', '0', 'Gutwrench Suplex'),
(274, 'Flying Axehandle', 'highFlying', '28', 35, '0.8', 'aerialAbility', 5, 10, '0', '0', 'A flying axehandle from the top rope.'),
(275, 'Back Suplex', 'grapple', '20', 28, '0.85', 'strength', 4, 8, '0', '0', 'Basic backdrop suplex'),
(276, 'Swinging Neckbreaker', 'grapple', '24', 34, '0.8', 'technicalAbility', 6, 14, '0', '0', 'Swinging neckbreaker'),
(277, 'Fallaway Slam', 'grapple', '25', 35, '0.8', 'strength', 6, 13, '0', '0', 'Throwing your opponent overhead while falling backwards'),
(278, 'Deep Six', 'grapple', '28', 36, '0.8', 'technicalAbility', 4, 9, '0', '0', 'Spinning side slam'),
(279, 'Black Hole Sun', 'grapple', '34', 40, '0.75', 'strength', 8, 15, '0', '0', 'Chokeslam backbreaker'),
(280, 'Savate Kick', 'strike', '30', 45, '0.8', 'strength', 5, 15, '0', '0', 'A traditional savate \"side\" kick'),
(281, 'Belly to Back Suplex', 'grapple', '23', 29, '0.8', 'technicalAbility', 4, 10, '0', '0.6', '');

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `match_id` int(11) NOT NULL,
  `match_type` enum('single','tag_team') NOT NULL,
  `player1_id` varchar(255) DEFAULT NULL,
  `player2_id` varchar(255) DEFAULT NULL,
  `single_winner_id` varchar(255) DEFAULT NULL,
  `single_loser_id` varchar(255) DEFAULT NULL,
  `team1_player1_id` varchar(255) DEFAULT NULL,
  `team1_player2_id` varchar(255) DEFAULT NULL,
  `team2_player1_id` varchar(255) DEFAULT NULL,
  `team2_player2_id` varchar(255) DEFAULT NULL,
  `team_winner_id` varchar(511) DEFAULT NULL,
  `team_loser_id` varchar(511) DEFAULT NULL,
  `is_draw` tinyint(1) DEFAULT '0',
  `match_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `moves`
--

CREATE TABLE `moves` (
  `move_id` int(11) NOT NULL COMMENT 'Unique identifier for the move',
  `move_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'The name of the wrestling move',
  `type` enum('grapple','strike','highFlying','finisher') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'The type of move (e.g., strike, grapple, submission, aerial, finisher)',
  `min_damage` int(11) NOT NULL COMMENT 'The base damage inflicted by the move',
  `max_damage` int(11) NOT NULL,
  `baseHitChance` float NOT NULL,
  `stat` enum('aerialAbility','brawlingAbility','strength','technicalAbility') COLLATE utf8mb4_unicode_ci NOT NULL,
  `stamina_cost` int(11) NOT NULL DEFAULT '5' COMMENT 'The stamina cost to perform the move',
  `momentumGain` int(11) NOT NULL DEFAULT '10',
  `pinAttemptChance` float DEFAULT NULL,
  `submissionAttemptChance` float DEFAULT NULL,
  `move_description` text COLLATE utf8mb4_unicode_ci COMMENT 'A brief description of the move'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Stores details about wrestling moves';

--
-- Dumping data for table `moves`
--

INSERT INTO `moves` (`move_id`, `move_name`, `type`, `min_damage`, `max_damage`, `baseHitChance`, `stat`, `stamina_cost`, `momentumGain`, `pinAttemptChance`, `submissionAttemptChance`, `move_description`) VALUES
(1, 'Clothesline', 'strike', 15, 25, 0.8, 'strength', 5, 10, NULL, NULL, NULL),
(2, 'Body Slam', 'strike', 15, 22, 0.8, 'strength', 5, 10, NULL, NULL, NULL),
(3, 'Power Slam', 'strike', 15, 25, 0.75, 'strength', 5, 10, NULL, NULL, NULL),
(4, 'Vertical Suplex', 'grapple', 17, 25, 0.8, 'technicalAbility', 5, 10, NULL, NULL, NULL),
(5, 'Belly to Belly Suplex', 'grapple', 16, 28, 0.75, 'technicalAbility', 7, 15, NULL, NULL, NULL),
(6, 'German Suplex', 'grapple', 19, 30, 0.75, 'technicalAbility', 7, 15, NULL, NULL, NULL),
(7, 'Drop Kick', 'highFlying', 17, 27, 0.75, 'aerialAbility', 5, 10, NULL, NULL, NULL),
(8, 'Chop', 'strike', 12, 22, 0.8, 'brawlingAbility', 5, 10, NULL, NULL, NULL),
(9, 'Punch', 'strike', 13, 23, 0.8, 'brawlingAbility', 5, 10, NULL, NULL, NULL),
(10, 'Sleeper', 'grapple', 19, 30, 0.75, 'technicalAbility', 7, 15, NULL, NULL, NULL),
(11, 'Big Boot', 'strike', 20, 33, 0.7, 'brawlingAbility', 7, 20, NULL, NULL, NULL),
(12, 'Headbutt', 'strike', 17, 22, 0.8, 'brawlingAbility', 5, 10, NULL, NULL, NULL),
(13, 'Diving Headbutt', 'strike', 19, 28, 0.7, 'brawlingAbility', 7, 15, NULL, NULL, 'Launched from the mat. Differs from Flying Head Butt, which is launched from second or top ropes.'),
(14, 'Flying Head Butt', 'highFlying', 20, 35, 0.7, 'aerialAbility', 7, 20, NULL, NULL, NULL),
(15, 'Piledriver', 'grapple', 22, 35, 0.7, 'technicalAbility', 7, 20, NULL, NULL, NULL),
(16, 'Elbow Drop', 'strike', 15, 20, 0.8, 'brawlingAbility', 5, 10, NULL, NULL, NULL),
(17, 'Bulldog', 'strike', 17, 25, 0.75, 'brawlingAbility', 5, 10, NULL, NULL, NULL),
(18, 'Abdominal Stretch', 'grapple', 16, 26, 0.7, 'technicalAbility', 7, 15, NULL, NULL, NULL),
(19, 'Bearhug', 'grapple', 15, 22, 0.8, 'strength', 5, 13, NULL, NULL, NULL),
(20, 'Backbreaker', 'grapple', 20, 30, 0.75, 'technicalAbility', 7, 16, NULL, NULL, NULL),
(21, 'Low Blow', 'strike', 22, 35, 0.7, 'brawlingAbility', 10, 25, NULL, NULL, NULL),
(22, 'Military Press', 'grapple', 20, 30, 0.75, 'strength', 7, 15, NULL, NULL, NULL),
(23, 'Spear', 'strike', 20, 35, 0.75, 'strength', 10, 30, NULL, NULL, NULL),
(24, 'Military Press Powerslam', 'grapple', 25, 37, 0.75, 'strength', 10, 25, NULL, NULL, NULL),
(25, 'Diving Crossbody', 'highFlying', 20, 30, 0.7, 'aerialAbility', 7, 17, NULL, NULL, NULL),
(26, 'Atomic Drop', 'grapple', 16, 23, 0.8, 'technicalAbility', 5, 10, NULL, NULL, NULL),
(27, 'Knee Drop', 'strike', 17, 24, 0.75, 'brawlingAbility', 5, 10, NULL, NULL, NULL),
(28, 'Full Nelson', 'grapple', 20, 28, 0.75, 'strength', 7, 15, NULL, NULL, NULL),
(29, 'Spinebuster', 'grapple', 22, 31, 0.7, 'strength', 7, 17, NULL, NULL, NULL),
(30, 'Superplex', 'grapple', 24, 35, 0.7, 'technicalAbility', 10, 22, NULL, NULL, NULL),
(31, 'Powerbomb', 'strike', 25, 42, 0.7, 'strength', 10, 28, NULL, NULL, NULL),
(32, 'Moonsault', 'highFlying', 25, 40, 0.7, 'aerialAbility', 10, 28, NULL, NULL, NULL),
(33, 'Air Pillman', 'highFlying', 21, 28, 0.7, 'aerialAbility', 7, 13, NULL, NULL, 'Springboard Clothesline'),
(34, 'Air Sabu', 'highFlying', 25, 35, 0.7, 'aerialAbility', 10, 15, NULL, NULL, 'Springboard Leg Drop'),
(36, 'Alabama Jam', 'finisher', 40, 60, 0.75, 'aerialAbility', 25, 30, 0.8, NULL, NULL),
(37, 'Anaconda Vice', 'grapple', 17, 26, 0.75, 'strength', 7, 12, NULL, NULL, NULL),
(38, 'Angle Slam (Olympic Slam)', 'grapple', 25, 40, 0.8, 'technicalAbility', 13, 25, NULL, NULL, NULL),
(39, 'Ankle Lock', 'grapple', 24, 40, 0.7, 'technicalAbility', 15, 25, NULL, 0.8, NULL),
(40, 'Arabian Facebuster', 'strike', 20, 35, 0.75, 'brawlingAbility', 12, 22, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roster`
--

CREATE TABLE `roster` (
  `wrestler_id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `height` text,
  `weight` text,
  `description` text,
  `baseHp` text,
  `strength` int(11) DEFAULT NULL,
  `technicalAbility` int(11) DEFAULT NULL,
  `brawlingAbility` int(11) DEFAULT NULL,
  `stamina` int(11) DEFAULT NULL,
  `aerialAbility` int(11) DEFAULT NULL,
  `toughness` int(11) DEFAULT NULL,
  `reversalAbility` int(11) DEFAULT NULL,
  `submissionDefense` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `staminaRecoveryRate` int(11) DEFAULT NULL,
  `moves` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roster`
--

INSERT INTO `roster` (`wrestler_id`, `name`, `height`, `weight`, `description`, `baseHp`, `strength`, `technicalAbility`, `brawlingAbility`, `stamina`, `aerialAbility`, `toughness`, `reversalAbility`, `submissionDefense`, `staminaRecoveryRate`, `moves`, `image`) VALUES
(1, 'Abdullah the Butcher', '6\'0\"', '360', 'The Madman from Sudan. A legendary hardcore brawler known for his unpredictable and violent style, often using foreign objects. Feared for his scarred forehead and ability to withstand immense pain. His matches were chaotic spectacles, making him a global icon in extreme wrestling.', '1100', 90, 60, 94, 75, 5, 92, 20, '90', 3, '{\"strike\": [\"Headbutt\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Body Slam\", \"Power Slam\", \"Fork Stab\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Sudanese Spike (Throat Thrust)\"], \"highFlying\": [\"Elbow Drop\"]}', 'butcher'),
(2, 'Adam Cole', '6\'0\"', '210', 'Bay Bay! A charismatic and technically sound wrestler, known for his superkicks and a knack for championship gold. Leader of the Undisputed Era, he combines high-flying, technical prowess, and a cocky attitude.', '1000', 79, 90, 81, 85, 80, 75, 85, '75', 7, '{\"strike\": [\"Superkick\"], \"grapple\": [\"Figure-Four Leglock\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"The Last Shot (Knee Brainbuster)\"], \"highFlying\": [\"Panama Sunrise (Flipping Piledriver)\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'cole'),
(3, 'AJ Styles', '5\'11\"', '215', 'The Phenomenal One! Known for his incredible athleticism, innovative offense, and ability to adapt to any opponent. A multiple-time world champion across various promotions.', '1000', 83, 95, 75, 90, 93, 84, 90, '80', 8, '{\"strike\": [\"Phenomenal Forearm\"], \"grapple\": [\"Calf Crusher\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Styles Clash\"], \"highFlying\": [\"Springboard 450 Splash\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'styles'),
(4, 'Andre the Giant', '7\'4\"', '520', 'The Eighth Wonder of the World. Standing 7\'4\" and weighing over 500 pounds, Andre was professional wrestling\'s most recognizable star worldwide. Famous for his undefeated streak that lasted over a decade, his match with Hulk Hogan at WrestleMania III drew over 93,000 fans. Beyond wrestling, he appeared in films like \"The Princess Bride.\" His physical presence and gentle personality made him a global ambassador for the sport.', '950', 100, 40, 91, 76, 10, 94, 30, '100', 6, '{\"strike\": [\"Big Boot\", \"Headbutt\", \"Choke\", \"Chop\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Bearhug\", \"Body Slam\"], \"finisher\": [\"Elbow Drop (from standing)\"], \"highFlying\": [\"Giant Press\"]}', 'andre'),
(5, 'Arn Anderson', '6\'1\"', '245', 'The Enforcer. Master of fundamental wrestling and psychology. Key member of The Four Horsemen alongside Ric Flair. Never held a world championship but was considered one of the best wrestlers never to do so. Exceptional storyteller in the ring and on the microphone. Later became a respected backstage producer and trainer, helping develop future stars.', '1000', 87, 92, 85, 92, 15, 90, 80, '85', 7, '{\"strike\": [\"Left Handed Punch\", \"Knee Drop\"], \"grapple\": [\"Sleeper\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\", \"DDT\"], \"finisher\": [\"Double A Spinebuster\"], \"highFlying\": [\"None\"]}', 'anderson'),
(6, 'Bam Bam Bigelow', '6\'3\"', '390', 'The Beast from the East. Agile for his size, Bigelow was known for his flaming attire and impressive high-flying maneuvers, making him a unique big man.', '1000', 93, 51, 92, 83, 84, 95, 50, '90', 5, '{\"strike\": [\"Headbutt\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Greetings From Kiss (Kiss Goodnight)\", \"Body Slam\"], \"finisher\": [\"Diving Head Butt\"], \"highFlying\": [\"Moonsault\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'bigelow'),
(7, 'Barbarian', '6\'2\"', '280', 'One half of the Powers of Pain, known for his brute strength and intimidating presence.', '1100', 95, 64, 93, 82, 70, 96, 40, '80', 5, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerbomb\", \"Body Slam\"], \"finisher\": [\"Headbutt off the Top Rope\"], \"highFlying\": [\"None\"]}', 'barbarian'),
(8, 'Baron Corbin', '6\'8\"', '275', 'The Lone Wolf. A former NFL player turned wrestler, known for his aggressive style and End of Days finisher. He\'s a dominant force with a no-nonsense attitude.', '1000', 90, 92, 81, 84, 10, 85, 60, '80', 5, '{\"strike\": [\"Big Boot\", \"Bear Hug\", \"Clothesline\", \"Punch\"], \"grapple\": [\"Deep Six\", \"Superplex\", \"Spinebuster\", \"Powerslam\", \"Black Hole Sun\"], \"finisher\": [\"End of Days\"], \"highFlying\": [\"None\"]}', 'corbin'),
(9, 'Barry Windham', '6\'6\"', '260', 'Son of wrestling legend Blackjack Mulligan, Barry was a gifted technical wrestler with remarkable athleticism for his size. Multiple-time tag team champion and singles titleholder across various promotions. Member of The Four Horsemen and known for his smooth in-ring style. Considered one of the most naturally talented wrestlers who perhaps didn\'t reach his full potential due to various circumstances.', '1100', 88, 96, 91, 100, 69, 91, 75, '75', 9, '{\n    \"strike\": [\"Lariat\", \"Punch\", \"Elbow Drop\"], \n    \"grapple\": [\"German Suplex\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\", \"Piledriver\"], \n    \"finisher\": [\"Superplex (from top rope)\"], \n    \"highFlying\": [\"Flying Elbow Drop\", \"Dropkick\"]\n}', 'windham'),
(10, 'Batista', '6\'5\"', '290', 'The Animal. Six-time World Champion (4-time World Heavyweight Champion, 2-time WWE Champion). Original member of Evolution alongside Triple H and Ric Flair. Known for his incredible physique and power moves like the Batista Bomb. Successfully transitioned to Hollywood, starring in \"Guardians of the Galaxy\" and other major films. His 2005 face turn and title win was one of WWE\'s most successful storylines.', '1050', 97, 60, 92, 82, 10, 90, 55, '85', 6, '{\"strike\": [\"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Spinebuster\", \"Body Slam\"], \"finisher\": [\"Batista Bomb\"], \"highFlying\": [\"None\"]}', 'batista'),
(11, 'Big Boss Man', '6\'6\"', '330', 'A former corrections officer, known for his hard-hitting style and nightstick. He was a prominent figure in the late 80s and 90s.', '1000', 91, 71, 92, 80, 5, 90, 45, '85', 5, '{\"strike\": [\"Nightstick Shot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Boss Man Slam\", \"Body Slam\"], \"finisher\": [\"Boss Man Slam\"], \"highFlying\": [\"None\"]}', 'bossman'),
(12, 'Big John Studd', '6\'10\"', '364', 'Standing 6\'10\" and weighing over 360 pounds, Studd was one of the premier giants of the 1980s WWF. Won the first-ever Royal Rumble in 1989. Famous for his bodyslam challenges and feuds with Andre the Giant. His matches helped establish the spectacle of giant vs. giant encounters that became a wrestling staple.', '1000', 97, 40, 90, 79, 5, 95, 30, '90', 4, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Full Nelson\", \"Body Slam\"], \"finisher\": [\"Elbow Drop\"], \"highFlying\": [\"None\"]}', 'studd'),
(13, 'Bob Backlund', '6\'1\"', '235', '\"Mr. All-American\" - WWE Champion for over 5 years (1978-1983), one of the longest reigns in company history. Known for his amateur wrestling background and technical prowess. His 1994 heel turn as a deranged former champion was one of wrestling\'s most effective character transformations. Helped bridge the gap between the territorial era and national expansion of wrestling.', '1060', 84, 97, 81, 94, 10, 89, 90, '90', 8, '{\"strike\": [\"Leg Drop\"], \"grapple\": [\"Atomic Drop\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Crossface Chickenwing\"], \"highFlying\": [\"None\"]}', 'backlund'),
(14, 'Bobby Eaton', '5\'10\"', '230', 'One of the most underrated tag team wrestlers of all time, known for his smooth style and incredible athleticism.', '1000', 82, 93, 86, 90, 91, 87, 80, '75', 7, '{\"strike\": [\"Elbow Drop\"], \"grapple\": [\"Alabama Jam (Diving Leg Drop)\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Alabama Jam\"], \"highFlying\": [\"Diving Knee Drop\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'eaton'),
(15, 'Bobby Lashley', '6\'3\"', '273', 'The All Mighty. Former U.S. Army veteran who became WWE Champion and ECW Champion. Known for his incredible physique and legitimate amateur wrestling background. Successfully competed in mixed martial arts, proving his athletic credibility. His later career renaissance, particularly his work with MVP and The Hurt Business, showcased his improved mic skills and character development.', '1050', 96, 80, 92, 90, 37, 93, 60, '90', 7, '{\"strike\": [\"Spear\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Dominator\", \"Body Slam\"], \"finisher\": [\"Hurt Lock (Full Nelson)\"], \"highFlying\": [\"None\"]}', 'lashley'),
(16, 'Booker T', '6\'3\"', '250', 'Can you dig it, sucka?! Five-time WCW World Heavyweight Champion and one-time World Heavyweight Champion in WWE. Master of the spinaroonie and Book End finisher. Successful tag team career with his brother Stevie Ray as Harlem Heat. Later became a respected commentator and trainer. His charisma and catchphrases made him one of the most entertaining performers of his era.', '1000', 87, 85, 92, 89, 80, 84, 75, '75', 7, '{\"strike\": [\"Scissor Kick\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Book End (Side Slam)\", \"Body Slam\"], \"finisher\": [\"Axe Kick (Booker T\'s Axe Kick)\"], \"highFlying\": [\"Houston Hangover (Diving Senton)\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'bookert'),
(17, 'Braun Strowman', '6\'8\"', '385', 'The Monster Among Men. Strowman became known for incredible feats of strength and his catchphrase \"Get these hands!\" Former Universal Champion and multiple-time tag team champion. His feuds with Roman Reigns and Brock Lesnar were highlights of WWE programming. Started as a member of The Wyatt Family before becoming a fan-favorite monster face.', '1000', 98, 40, 95, 65, 5, 91, 30, '95', 4, '{\"strike\": [\"Monster Dropkick\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Running Powerslam\", \"Body Slam\"], \"finisher\": [\"Running Powerslam\"], \"highFlying\": [\"None\"]}', 'strowman'),
(18, 'Bray Wyatt', '6\'3\"', '285', 'The Eater of Worlds. One of wrestling\'s most creative and unsettling characters. Created multiple personas including the Wyatt Family leader and \"The Fiend.\" Three-time WWE Champion known for his psychological warfare and horror-inspired presentations. His \"Firefly Fun House\" segments were revolutionary in sports entertainment storytelling. Tragically passed away in 2023, leaving behind a legacy of creative innovation.', '1000', 85, 60, 94, 75, 10, 90, 50, '85', 6, '{\"strike\": [\"Senton\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Sister Abigail\", \"Body Slam\"], \"finisher\": [\"Sister Abigail\"], \"highFlying\": [\"None\"]}', 'wyatt'),
(19, 'Bret Hart', '6\'1\"', '234', 'The Hitman. The Excellence of Execution. Five-time WWE Champion and considered one of the greatest technical wrestlers ever. Member of the legendary Hart wrestling family from Calgary. His matches told perfect stories through pure wrestling ability. The Montreal Screwjob incident in 1997 became one of wrestling\'s most controversial moments. Later had a successful run in WCW before injuries ended his career.', '1050', 87, 100, 89, 96, 52, 93, 95, '90', 8, '{\"strike\": [\"Diving Elbow Drop\"], \"grapple\": [\"Piledriver\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Sharpshooter\"], \"highFlying\": [\"None\"]}', 'brethart'),
(20, 'Brian Pillman', '5\'11\"', '210', 'The Loose Cannon. Innovative cruiserweight who helped popularize high-flying moves in American wrestling. His \"Loose Cannon\" character blurred the lines between reality and fiction in ways that were ahead of their time. Tragically died at age 35, cutting short what could have been a revolutionary career.', '1000', 84, 85, 79, 94, 93, 85, 80, '70', 7, '{\"strike\": [\"Superkick\", \"Chop\"], \"grapple\": [\"Body Slam\", \"Suplex\"], \"finisher\": [\"Air Pillman (Springboard Clothesline)\"], \"highFlying\": [\"Diving Crossbody\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'pillman'),
(21, 'Brock Lesnar', '6\'3\"', '286', 'The Beast Incarnate. A dominant force of nature, known for his amateur wrestling background, incredible strength, and devastating F5. A multi-sport athlete and former UFC Heavyweight Champion.', '1050', 98, 91, 94, 87, 22, 95, 70, '95', 5, '{\"strike\": [\"Knee Strike\"], \"grapple\": [\"German Suplex\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"F5\"], \"highFlying\": [\"None\"]}', 'lesnar'),
(22, 'Bron Breakker', '6\'0\"', '230', 'Son of Rick Steiner and nephew of Scott Steiner, representing the next generation of the Steiner wrestling dynasty. Two-time NXT Champion known for his incredible athleticism and power. His combination of amateur wrestling background and natural charisma has made him one of WWE\'s most promising young talents. His matches showcase both technical skill and explosive athleticism.', '1000', 94, 95, 87, 90, 60, 92, 65, '80', 6, '{\"strike\": [\"Spear\"], \"grapple\": [\"Military Press Powerslam\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Gorilla Press Powerslam\"], \"highFlying\": [\"None\"]}', 'breakker'),
(23, 'Brooklyn Brawler', '6\'2\"', '240', 'A legendary jobber known for his longevity and ability to make opponents look good.', '800', 75, 52, 71, 64, 5, 70, 20, '50', 3, '{\"strike\": [\"Punch\"], \"grapple\": [\"Brooklyn Crab\"], \"finisher\": [\"Brawler\'s Elbow\"], \"highFlying\": [\"None\"]}', 'brawler'),
(24, 'Bruiser Brody', '6\'8\"', '285', '\"King of the Death Match\" - One of the most feared and respected wrestlers in the world during the 1970s and 80s. Known for his wild, brawling style and refusal to follow traditional wrestling politics. Highly successful in Japan and Puerto Rico. His tragic murder in 1988 in Puerto Rico remains one of wrestling\'s darkest moments. His influence on hardcore wrestling and international wrestling culture was immense.', '1000', 94, 68, 98, 86, 20, 98, 25, '85', 4, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"King Kong Knee Drop\", \"Body Slam\"], \"finisher\": [\"King Kong Knee Drop\"], \"highFlying\": [\"None\"]}', 'brody'),
(25, 'Brutus Beefcake', '6\'3\"', '250', 'Hulk Hogan\'s best friend, known for his barber gimmick and sleeper hold.', '1000', 86, 71, 79, 80, 30, 80, 50, '70', 5, '{\"strike\": [\"High Knee\", \"Knee Drop\", \"Punch\"], \"grapple\": [\"Back Suplex\", \"Suplex\", \"Body Slam\", \"Full Nelson\"], \"finisher\": [\"Sleeper Hold\"], \"highFlying\": [\"None\"]}', 'beefcake'),
(26, 'Bruno Sammartino', '6\'1\"', '265', 'The Living Legend. WWE Champion for over 11 years total across two reigns, the longest combined championship reign in company history. Sold out Madison Square Garden over 180 times. His Italian-American immigrant story resonated with audiences and helped build WWE\'s foundation. Known for incredible strength and his bearhug finishing hold. Posthumously inducted into the WWE Hall of Fame after years of being estranged from the company.', '1050', 97, 70, 92, 95, 5, 100, 60, '95', 7, '{\"strike\": [\"Forearm Smash\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Bearhug\", \"Body Slam\"], \"finisher\": [\"Backbreaker\"], \"highFlying\": [\"None\"]}', 'sammartino'),
(27, 'Chyna', '5\'10\"', '180', 'The Ninth Wonder of the World. A trailblazing female wrestler, known for her strength, intimidating presence, and being a member of D-Generation X.', '1000', 80, 60, 75, 75, 5, 85, 50, '75', 6, '{\"strike\": [\"Low Blow\"], \"grapple\": [\"Pedigree\"], \"finisher\": [\"Pedigree\"], \"highFlying\": [\"None\"]}', 'chyna'),
(28, 'Christian', '6\'1\"', '212', 'Captain Charisma. Two-time World Heavyweight Champion and multiple-time Intercontinental and tag team champion. Originally succeeded as part of Edge & Christian before establishing himself as a singles star. His \"peeps\" and various catchphrases showcased his natural comedic timing. Had career-defining runs in TNA Wrestling as a main event star. Known for his intelligence and psychology in crafting memorable matches.', '1000', 85, 93, 83, 90, 80, 84, 80, '70', 7, '{\"strike\": [\"Spear\"], \"grapple\": [\"Killswitch (Unprettier)\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Killswitch\"], \"highFlying\": [\"Frog Splash\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'christian'),
(29, 'Chris Benoit', '5\'11\"', '220', 'The Rabid Wolverine. Considered one of the greatest technical wrestlers ever, known for his intensity and submission expertise. World Heavyweight Champion and multiple-time Intercontinental Champion. His triple threat match at WrestleMania XX with Shawn Michaels and Triple H is considered a classic. His career accomplishments are overshadowed by the tragic events of 2007 that ended his life and the lives of his family members.', '1000', 88, 96, 89, 96, 72, 95, 90, '85', 8, '{\"strike\": [\"Diving Headbutt\"], \"grapple\": [\"German Suplex\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Crippler Crossface\"], \"highFlying\": [\"Crippler Crossface\"]}', 'benoit'),
(30, 'Chris Jericho', '6\'0\"', '225', 'Le Champion. A master of reinvention, Jericho has consistently remained at the top for decades with his innovative character work, diverse move set, and unparalleled mic skills.', '1000', 76, 85, 70, 85, 70, 80, 80, '80', 7, '{\"strike\": [\"Codebreaker\"], \"grapple\": [\"Walls of Jericho (Liontamer)\"], \"finisher\": [\"Judas Effect (Elbow)\"], \"highFlying\": [\"Lionsault\"]}', 'jericho'),
(31, 'CM Punk', '6\'1\"', '218', 'The Best in the World. Known for his straight-edge lifestyle, groundbreaking promos, and a hybrid wrestling style combining technicality, strikes, and high-flying.', '1000', 70, 90, 75, 90, 70, 80, 88, '85', 8, '{\"strike\": [\"Roundhouse Kick\"], \"grapple\": [\"Anaconda Vice\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"GTS (Go To Sleep)\"], \"highFlying\": [\"Diving Elbow Drop\"]}', 'punk'),
(32, 'Cody Rhodes', '6\'1\"', '220', 'The American Nightmare. A second-generation star who broke away to forge his own path, known for his polished presentation, emotional storytelling, and impactful Cross Rhodes.', '1000', 80, 80, 70, 85, 60, 80, 75, '80', 7, '{\"strike\": [\"Bionic Elbow\"], \"grapple\": [\"Figure-Four Leglock\"], \"finisher\": [\"Cross Rhodes\"], \"highFlying\": [\"Moonsault\"]}', 'codyrhodes'),
(33, 'Curt Hennig', '6\'3\"', '257', 'Simply Perfect. Known for his flawless in-ring execution, cocky attitude, and ability to make everything look easy. A true technician and Intercontinental Champion.', '1050', 85, 100, 80, 97, 84, 92, 90, '85', 7, '{\n    \"strike\": [\n        \"Knee Lift\"\n    ],\n    \"grapple\": [\n        \"German Suplex\",\n        \"Suplex\",\n        \"Inverted atomic drop\",\n        \"Abdominal Stretch\",\n        \"Hip Toss\",\n        \"Arm Bar\",\n        \"Sleeper\"\n    ],\n    \"finisher\": [\n        \"Perfect-Plex\"\n    ],\n    \"highFlying\": [\n        \"Dropkick\",\n        \"Flying Crossbody\",\n        \"Missile Dropkick\"\n    ]\n}', 'hennig'),
(34, 'Dan Spivey', '6\'8\"', '280', 'A powerful big man known for his time in the Skyscrapers and as a member of the Varsity Club.', '1000', 92, 76, 90, 83, 10, 87, 50, '80', 5, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerbomb\", \"Body Slam\"], \"finisher\": [\"Spivey Spike (DDT)\"], \"highFlying\": [\"None\"]}', 'spivey'),
(35, 'Daniel Bryan', '5\'10\"', '210', 'The American Dragon. A technical wrestling virtuoso, known for his intricate submissions, stiff strikes, and incredible underdog story. Yes! Yes! Yes!', '1000', 81, 100, 80, 95, 70, 80, 95, '90', 9, '{\"strike\": [\"Yes! Kicks\"], \"grapple\": [\"Surfboard Stretch\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Yes! Lock (Omoplata Crossface)\"], \"highFlying\": [\"Diving Headbutt\"]}', 'bryan'),
(36, 'Darby Allin', '5\'8\"', '180', 'A fearless daredevil known for his high-risk maneuvers and unique, gothic persona.', '1000', 65, 70, 75, 80, 95, 65, 70, '65', 7, '{\"strike\": [\"Coffin Drop (Diving Senton)\"], \"grapple\": [\"Scorpion Death Drop\"], \"finisher\": [\"Coffin Drop\"], \"highFlying\": [\"Suicide Dive\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'allin'),
(37, 'Davey Boy Smith', '5\'11\"', '250', 'The British Bulldog. A powerful and athletic wrestler, known for his strength, agility, and classic matches.', '1000', 95, 90, 88, 92, 20, 85, 65, '80', 6, '{\"strike\": [\"Headbutt\"], \"grapple\": [\"Running Powerslam\"], \"finisher\": [\"Running Powerslam\"], \"highFlying\": [\"None\"]}', 'daveyboy'),
(38, 'Dean Malenko', '5\'10\"', '210', 'The Man of 1,000 Holds. A highly respected technical wrestler, known for his intricate submissions and smooth in-ring style.', '1000', 78, 100, 76, 90, 15, 84, 95, '95', 8, '{\"strike\": [\"Dropkick\"], \"grapple\": [\"Texas Cloverleaf\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Texas Cloverleaf\"], \"highFlying\": [\"None\"]}', 'malenko'),
(39, 'Diamond Dallas Page', '6\'5\"', '250', 'The Master of the Diamond Cutter. A late bloomer who became a multiple-time world champion, known for his infectious charisma and devastating finisher.', '1000', 80, 70, 92, 80, 10, 85, 65, '75', 6, '{\"strike\": [\"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Diamond Cutter\", \"Body Slam\"], \"finisher\": [\"Diamond Cutter\"], \"highFlying\": [\"None\"]}', 'page'),
(40, 'Dolph Ziggler', '6\'0\"', '218', 'The Showoff. Known for his incredible selling, athleticism, and superkick. A former World Heavyweight Champion.', '1000', 75, 85, 70, 90, 70, 75, 80, '70', 8, '{\"strike\": [\"Superkick\"], \"grapple\": [\"Zig Zag\"], \"finisher\": [\"Zig Zag\"], \"highFlying\": [\"Fameasser\"]}', 'ziggler'),
(41, 'Dominik Mysterio', '6\'1\"', '200', 'The son of Rey Mysterio, known for his rebellious attitude and association with The Judgment Day.', '1000', 65, 70, 65, 80, 75, 70, 60, '65', 6, '{\"strike\": [\"Frog Splash\"], \"grapple\": [\"Three Amigos\"], \"finisher\": [\"Frog Splash\"], \"highFlying\": [\"619\"]}', 'dominikmysterio'),
(42, 'Don Muraco', '6\'1\"', '250', 'The Magnificent Muraco. A powerful and athletic heel from the 80s, known for his physique and intensity.', '1000', 85, 60, 80, 75, 10, 85, 55, '80', 6, '{\"strike\": [\"Forearm Smash\"], \"grapple\": [\"Piledriver\"], \"finisher\": [\"Asiatic Spike (Thumb to Throat)\"], \"highFlying\": [\"None\"]}', 'muraco'),
(43, 'Drew McIntyre', '6\'5\"', '265', 'The Scottish Warrior. A powerful and intense competitor with a devastating Claymore Kick. A former WWE Champion who embodies resilience and determination.', '1000', 90, 75, 85, 80, 15, 90, 70, '85', 6, '{\"strike\": [\"Claymore Kick\"], \"grapple\": [\"Future Shock DDT\"], \"finisher\": [\"Claymore Kick\"], \"highFlying\": [\"None\"]}', 'mcintyre'),
(44, 'Dustin Rhodes', '6\'6\"', '235', 'The Natural. A second-generation star known for his unique Goldust persona and technical prowess.', '1000', 88, 89, 88, 83, 20, 92, 70, '75', 6, '{\"strike\": [\"Bulldog\"], \"grapple\": [\"Shattered Dreams\"], \"finisher\": [\"Cross Rhodes\"], \"highFlying\": [\"None\"]}', 'dustinrhodes'),
(45, 'Dusty Rhodes', '6\'2\"', '275', 'The American Dream. A charismatic and beloved everyman, known for his \'Bionic Elbow\' and inspiring promos. A three-time NWA World Heavyweight Champion.', '1000', 80, 60, 94, 80, 10, 90, 55, '80', 6, '{\"strike\": [\"Bionic Elbow\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Figure-Four Leglock\", \"Body Slam\"], \"finisher\": [\"Bionic Elbow\"], \"highFlying\": [\"None\"]}', 'dustyrhodes'),
(46, 'Earthquake', '6\'7\"', '468', 'A massive superheavyweight known for his devastating Earthquake Splash and being part of the Natural Disasters.', '1000', 96, 30, 90, 60, 5, 100, 25, '95', 4, '{\"strike\": [\"Avalanche Splash\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Earthquake Splash\", \"Body Slam\"], \"finisher\": [\"Earthquake Splash\"], \"highFlying\": [\"None\"]}', 'earthquake'),
(47, 'Edge', '6\'5\"', '241', 'The Rated-R Superstar. A master manipulator and opportunist, Edge is known for his incredible charisma, diverse move set, and numerous championship reigns.', '1000', 85, 87, 89, 85, 60, 88, 80, '80', 7, '{\"strike\": [\"Spear\"], \"grapple\": [\"Edgecution (Impaler DDT)\"], \"finisher\": [\"Spear\"], \"highFlying\": [\"Diving Crossbody\"]}', 'edge'),
(48, 'Eddie Gilbert', '5\'11\"', '220', 'Hot Stuff. A talented wrestler and booker, known for his innovative style and intense feuds.', '1000', 75, 85, 70, 80, 60, 75, 80, '70', 7, '{\"strike\": [\"Elbow Drop\"], \"grapple\": [\"Piledriver\"], \"finisher\": [\"Hot Shot\"], \"highFlying\": [\"Hot Shot (Top Rope Clothesline)\"]}', 'gilbert'),
(49, 'Eddie Guerrero', '5\'8\"', '220', 'Latino Heat! A master of deception, Eddie was known for his incredible in-ring talent, charisma, and \'Lie, Cheat, Steal\' philosophy. A beloved WWE Champion.', '1000', 86, 96, 81, 89, 90, 86, 85, '75', 7, '{\"strike\": [\"Frog Splash\"], \"grapple\": [\"Three Amigos (Vertical Suplexes)\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Frog Splash\"], \"highFlying\": [\"Tornado DDT\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'guerrero'),
(50, 'Finn Balor', '5\'11\"', '190', 'The Demon King. Known for his unique entrance, incredible athleticism, and powerful Coup de Grâce. A former Universal Champion.', '1000', 70, 88, 65, 85, 90, 70, 85, '70', 8, '{\"strike\": [\"Shotgun Dropkick\"], \"grapple\": [\"1916 (Bloody Sunday)\"], \"finisher\": [\"Coup de Grâce\"], \"highFlying\": [\"Coup de Grâce (Diving Double Foot Stomp)\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'balor'),
(51, 'Gillberg', '5\'7\"', '170', 'A parody of Goldberg, known for his comedic antics and brief entrances.', '600', 50, 40, 50, 50, 5, 60, 10, '40', 2, '{\"strike\": [\"Spear (weak)\"], \"grapple\": [\"Jackhammer (weak)\"], \"finisher\": [\"Gillberg Splash\"], \"highFlying\": [\"None\"]}', 'gillberg'),
(52, 'Goldberg', '6\'4\"', '280', 'Former NFL player who became WCW\'s biggest homegrown star during the Monday Night Wars. Known for his incredible undefeated streak and dominant squash matches. His spear and jackhammer finishing moves were devastatingly effective. Universal Champion in WWE and WCW World Heavyweight Champion. His intensity and legitimate athletic background made him a credible monster character.', '1000', 98, 40, 95, 60, 5, 93, 30, '95', 5, '{\"strike\": [\"Spear\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Jackhammer\", \"Body Slam\"], \"finisher\": [\"Jackhammer\"], \"highFlying\": [\"None\"]}', 'goldberg'),
(53, 'Greg Valentine', '6\'0\"', '249', 'The Hammer. A hard-hitting technical wrestler, known for his Figure-Four Leglock and aggressive style.', '1000', 90, 91, 87, 86, 10, 85, 75, '80', 6, '{\"strike\": [\"Chop\"], \"grapple\": [\"Figure-Four Leglock\"], \"finisher\": [\"Figure-Four Leglock\"], \"highFlying\": [\"None\"]}', 'valentine'),
(54, 'Gunther', '6\'4\"', '297', 'The Ring General. A dominant and hard-hitting European wrestler, known for his stiff chops and technical prowess.', '1000', 90, 92, 90, 83, 5, 95, 80, '90', 7, '{\"strike\": [\"Chop\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerbomb\", \"Body Slam\"], \"finisher\": [\"Powerbomb\"], \"highFlying\": [\"None\"]}', 'gunther'),
(55, 'Hacksaw Jim Duggan', '6\'3\"', '280', 'USA! USA! A patriotic brawler known for his 2x4 plank of wood and \'Hooo!\' chant.', '1000', 93, 61, 91, 81, 5, 90, 40, '80', 5, '{\"strike\": [\"2x4 Shot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Three Point Stance Clothesline\", \"Body Slam\"], \"finisher\": [\"Three Point Stance Clothesline\"], \"highFlying\": [\"None\"]}', 'duggan'),
(56, 'Harley Race', '6\'1\"', '245', 'The King. A legendary multiple-time NWA World Heavyweight Champion, known for his toughness and no-nonsense style.', '1000', 88, 91, 93, 85, 10, 95, 80, '85', 7, '{\"strike\": [\"Headbutt\"], \"grapple\": [\"Bridging Fisherman Suplex\"], \"finisher\": [\"Diving Headbutt\"], \"highFlying\": [\"Diving Headbutt\"]}', 'race'),
(57, 'Hulk Hogan', '6\'7\"', '303', 'The Immortal. The most recognizable wrestler in history, known for \'Hulkamania,\' his powerful comebacks, and iconic leg drop. A multiple-time world champion.', '1050', 98, 69, 96, 88, 5, 95, 40, '90', 6, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Atomic Leg Drop\", \"Body Slam\"], \"finisher\": [\"Atomic Leg Drop\"], \"highFlying\": [\"None\"]}', 'hogan'),
(58, 'Iron Mike Sharpe', '6\'3\"', '260', 'Canada\'s Greatest Athlete. A jobber known for his forearm shiver and perpetually bandaged forearm.', '950', 91, 72, 84, 79, 5, 83, 25, '55', 3, '{\"strike\": [\"Headbutt\"], \"grapple\": [\"Forearm Shiver\"], \"finisher\": [\"Forearm Shiver (Enhanced)\"], \"highFlying\": [\"None\"]}', 'sharpe'),
(59, 'Ivan Koloff', '5\'11\"', '240', 'The Russian Bear. A brutal and intimidating heel who famously ended Bruno Sammartino\'s long title reign.', '1000', 92, 82, 90, 83, 5, 90, 40, '85', 5, '{\"strike\": [\"Headbutt\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Russian Sickle (Clothesline)\", \"Body Slam\"], \"finisher\": [\"Russian Sickle\"], \"highFlying\": [\"None\"]}', 'ivankoloff'),
(60, 'Jake Roberts', '6\'2\"', '249', 'The Snake. A master of psychology and mind games, known for his chilling promos and the devastating DDT. His pet python, Damien, was an integral part of his act.', '1000', 87, 82, 91, 81, 10, 83, 75, '80', 6, '{\"strike\": [\"Short-Arm Clothesline\"], \"grapple\": [\"DDT\"], \"finisher\": [\"DDT\"], \"highFlying\": [\"None\"]}', 'roberts'),
(61, 'Jeff Jarrett', '6\'1\"', '220', 'Double J. A charismatic and talented wrestler, known for his country music gimmick and guitar smash.', '1000', 82, 94, 83, 93, 74, 81, 70, '70', 6, '{\"strike\": [\"Guitar Shot\"], \"grapple\": [\"Figure-Four Leglock\"], \"finisher\": [\"The Stroke (Reverse Russian Legsweep)\"], \"highFlying\": [\"None\"]}', 'jarrett'),
(62, 'Jerry Lawler', '6\'0\"', '230', 'The King. A legendary Memphis wrestling icon, known for his piledriver and fiery promos.', '1000', 82, 92, 87, 83, 10, 84, 60, '70', 6, '{\"strike\": [\"Fist Drop\"], \"grapple\": [\"Piledriver\"], \"finisher\": [\"Piledriver\"], \"highFlying\": [\"None\"]}', 'lawler'),
(63, 'Jimmy Garvin', '6\'0\"', '230', 'Gorgeous Jimmy. A charismatic and athletic wrestler, known for his flamboyant style and being part of the Freebirds.', '1000', 82, 88, 83, 84, 68, 79, 70, '65', 6, '{\"strike\": [\"DDT\"], \"grapple\": [\"Brainbuster\"], \"finisher\": [\"Brainbuster\"], \"highFlying\": [\"Flying Crossbody\"]}', 'jimmygarvin'),
(64, 'Jimmy Snuka', '5\'10\"', '235', 'Superfly. A high-flying innovator, known for his acrobatic style and iconic Superfly Splash.', '1000', 90, 78, 88, 80, 95, 85, 65, '70', 7, '{\"strike\": [\"Chop\"], \"grapple\": [\"Headbutt\"], \"finisher\": [\"Superfly Splash\"], \"highFlying\": [\"Superfly Splash\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'snuka'),
(65, 'John Cena', '6\'1\"', '251', 'The Face That Runs the Place. A polarizing but undeniable superstar, known for his \'Never Give Up\' attitude, powerful offense, and incredible connection with the audience. A record-setting 16-time World Champion.', '1000', 97, 65, 94, 90, 10, 95, 60, '90', 8, '{\"strike\": [\"Five Knuckle Shuffle\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Attitude Adjustment (FU)\", \"Body Slam\"], \"finisher\": [\"STF (Stepover Toehold Facelock)\"], \"highFlying\": [\"Diving Leg Drop Bulldog (rare)\"]}', 'cena'),
(66, 'Jon Moxley', '6\'4\"', '234', 'The Purveyor of Violence. A hardcore brawler known for his unpredictable style, intensity, and willingness to fight anywhere, anytime.', '1000', 85, 65, 90, 80, 20, 90, 60, '85', 6, '{\"strike\": [\"King Kong Lariat\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Paradigm Shift (Death Rider)\", \"Body Slam\"], \"finisher\": [\"Paradigm Shift\"], \"highFlying\": [\"Diving Elbow Drop\"]}', 'moxley'),
(67, 'Juventud Guerrera', '5\'7\"', '180', 'The Juice. A high-flying lucha libre star known for his acrobatic style and innovative maneuvers.', '1000', 77, 90, 86, 92, 100, 82, 80, '60', 7, '{\"strike\": [\"450 Splash\"], \"grapple\": [\"Juvi Driver\"], \"finisher\": [\"Juvi Driver\"], \"highFlying\": [\"Hurricanrana\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'guerrera'),
(68, 'Junkyard Dog', '6\'3\"', '270', 'JYD. A charismatic and beloved powerhouse, known for his headbutts and chain.', '1000', 93, 74, 91, 80, 5, 90, 40, '80', 5, '{\"strike\": [\"Headbutt\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Thump (Powerslam)\", \"Body Slam\"], \"finisher\": [\"Thump\"], \"highFlying\": [\"None\"]}', 'jyd'),
(69, 'Kane', '7\'0\"', '323', 'The Big Red Machine. The demonic half-brother of The Undertaker, known for his pyrotechnics, monstrous strength, and terrifying presence. A true horror icon of wrestling.', '1000', 98, 70, 93, 86, 35, 98, 40, '90', 4, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Chokeslam\", \"Body Slam\"], \"finisher\": [\"Tombstone Piledriver\"], \"highFlying\": [\"Top Rope Clothesline (rare)\"]}', 'kane'),
(70, 'Ken Patera', '6\'1\"', '270', 'The Olympian. A former Olympic weightlifter, known for his immense strength and full nelson submission.', '1000', 97, 60, 80, 70, 5, 85, 50, '85', 5, '{\"strike\": [\"Clothesline\"], \"grapple\": [\"Full Nelson\"], \"finisher\": [\"Full Nelson\"], \"highFlying\": [\"None\"]}', 'patera'),
(71, 'Kenny Omega', '6\'0\"', '203', 'The Best Bout Machine. A highly innovative and athletic wrestler, known for his incredible matches and diverse offense.', '1000', 80, 90, 80, 95, 90, 80, 90, '80', 9, '{\"strike\": [\"V-Trigger (Knee Strike)\"], \"grapple\": [\"One-Winged Angel\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"One-Winged Angel\"], \"highFlying\": [\"Cross-Legged Moonsault\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'omega'),
(72, 'Kevin Nash', '6\'10\"', '317', 'Big Daddy Cool. A charismatic giant known for his powerbomb and influential role in the Kliq and nWo. A multiple-time world champion.', '1000', 96, 68, 92, 81, 10, 90, 50, '85', 5, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Jackknife Powerbomb\", \"Body Slam\"], \"finisher\": [\"Jackknife Powerbomb\"], \"highFlying\": [\"None\"]}', 'nash'),
(73, 'Kevin Owens', '6\'0\"', '266', 'The Prizefighter. A ruthless and cunning brawler, known for his aggressive style, sharp wit, and devastating Pop-up Powerbomb. He fights for his family.', '1000', 85, 70, 90, 80, 40, 85, 65, '80', 6, '{\"strike\": [\"Cannonball Senton\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Pop-up Powerbomb\", \"Body Slam\"], \"finisher\": [\"Pop-up Powerbomb\"], \"highFlying\": [\"Swanton Bomb (rare)\"]}', 'owens'),
(74, 'Kerry Von Erich', '6\'2\"', '254', 'The Texas Tornado held forty championships in various promotions during his career. Among other accolades, he is a one-time NWA World Heavyweight Champion, and a one-time WWF Intercontinental Champion.', '1000', 93, 82, 86, 93, 76, 85, 75, '81', 8, '{\"strikes\": [\"Iron Claw\"], \"finisher\": [\"Discus Punch\"], \"grapples\": [\"Body Slam\", \"Sleeper\", \"Powerbomb\"], \"highFlying\": [\"Diving Elbow Drop\", \"Wrecking Ball Dropkick\"]}', 'kerryvonerich'),
(75, 'Kevin Von Erich', '6\'2\"', '228', 'The Golden Warrior. Known for his bare feet, high-flying maneuvers, and the Iron Claw.', '1000', 75, 87, 83, 90, 87, 90, 70, '70', 9, '{\"strike\": [\"Dropkick\"], \"grapple\": [\"Iron Claw\"], \"finisher\": [\"Iron Claw\"], \"highFlying\": [\"Flying Crossbody\", \"Dropkick\", \"Top Rope Dropkick\"]}', 'kevinvonerich'),
(76, 'King Kong Bundy', '6\'4\"', '458', 'The Walking Condominium. A massive superheavyweight, known for his Avalanche Splash and 5-count pin.', '1000', 95, 59, 90, 76, 5, 94, 20, '90', 3, '{\"strike\": [\"Big Splash\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Avalanche Splash\", \"Body Slam\"], \"finisher\": [\"Avalanche Splash\"], \"highFlying\": [\"None\"]}', 'bundy'),
(77, 'Kurt Angle', '6\'0\"', '220', 'The Olympic Gold Medalist. One of the most technically gifted wrestlers ever, known for his amateur wrestling pedigree, intensity, and \'It\'s true, it\'s damn true!\' catchphrase.', '1000', 88, 100, 86, 90, 20, 93, 95, '90', 8, '{\"strike\": [\"Ankle Lock\"], \"grapple\": [\"Angle Slam (Olympic Slam)\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Ankle Lock\"], \"highFlying\": [\"Moonsault (rare)\"]}', 'angle'),
(78, 'LA Knight', '6\'1\"', '220', 'Yeah! A charismatic and confident talker, known for his catchphrases and aggressive style.', '1000', 75, 70, 75, 80, 10, 80, 60, '70', 6, '{\"strike\": [\"Elbow Drop\"], \"grapple\": [\"BFT (Blunt Force Trauma)\"], \"finisher\": [\"BFT\"], \"highFlying\": [\"None\"]}', 'knight'),
(79, 'Larry Zbyszko', '6\'0\"', '240', 'The Living Legend. A former protege of Bruno Sammartino who turned on him, known for his technical prowess and stalling tactics.', '1000', 85, 92, 90, 89, 10, 85, 85, '85', 7, '{\"strike\": [\"Punches\"], \"grapple\": [\"Abdominal Stretch\", \"Suplex\", \"Inverted atomic drop\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Guillotine Choke\"], \"highFlying\": [\"None\"]}', 'zbyszko'),
(80, 'Lex Luger', '6\'4\"', '275', '\"The Total Package\" - Known for his incredible physique and his torture rack finishing move. Multiple-time World Champion in both WCW and brief runs in WWE. His patriotic character in WWE was an attempt to replace Hulk Hogan as the company\'s top babyface. Had career-defining feuds with Sting and Hulk Hogan. His career was cut short by spinal cord injuries that left him temporarily paralyzed.', '1100', 98, 72, 93, 93, 38, 92, 70, '95', 8, '{\"strike\": [\"Bionic Forearm\", \"Clothesline\", \"Jumping Elbow Drop\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Piledriver\", \"Powerslam\", \"Military Press\", \"Body Slam\"], \"finisher\": [\"Torture Rack\"], \"highFlying\": [\"None\"]}', 'luger'),
(81, 'Lord Steven Regal', '6\'2\"', '240', 'A highly technical and sophisticated British wrestler, known for his mat wrestling and stiff strikes.', '1000', 85, 95, 78, 85, 10, 87, 90, '90', 7, '{\"strike\": [\"Knee Trembler (Knee Strike)\"], \"grapple\": [\"Regal Stretch\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Regal Stretch\"], \"highFlying\": [\"None\"]}', 'regal'),
(82, 'Luke Harper', '6\'5\"', '275', 'A rugged and intense brawler, known for his unique movements and being a member of the Wyatt Family.', '1000', 85, 60, 88, 75, 10, 90, 50, '80', 6, '{\"strike\": [\"Big Boot\"], \"grapple\": [\"Discus Clothesline\"], \"finisher\": [\"Discus Clothesline\"], \"highFlying\": [\"None\"]}', 'harper'),
(83, 'Macho Man Randy Savage', '6\'2\"', '237', 'The Cream of the Crop! Ooooh yeah! An electrifying performer with a unique style, incredible intensity, and iconic flying elbow drop. A true showman and multiple-time world champion.', '1000', 88, 87, 93, 97, 84, 89, 70, '75', 7, '{\"strike\": [\"Axe Handle (from top rope)\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Piledriver\", \"Body Slam\"], \"finisher\": [\"Diving Elbow Drop\"], \"highFlying\": [\"Diving Elbow Drop\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'savage'),
(84, 'Malakai Black', '5\'11\"', '215', 'A dark and mysterious striker, known for his unique entrance, striking ability, and Black Mass finisher.', '1000', 75, 85, 90, 85, 70, 75, 80, '75', 7, '{\"strike\": [\"Black Mass (Spinning Heel Kick)\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"German Suplex\", \"Body Slam\"], \"finisher\": [\"Black Mass\"], \"highFlying\": [\"Moonsault\"]}', 'black'),
(85, 'Mark Henry', '6\'4\"', '395', 'The World\'s Strongest Man. A former Olympic weightlifter, known for his immense strength and Hall of Pain.', '1000', 100, 62, 90, 77, 5, 94, 30, '95', 4, '{\"strike\": [\"Big Splash\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"World\'s Strongest Slam\", \"Body Slam\"], \"finisher\": [\"World\'s Strongest Slam\"], \"highFlying\": [\"None\"]}', 'henry'),
(86, 'Meng', '6\'1\"', '290', 'The Face of Fear. A notoriously tough and legitimate fighter, known for his intimidating presence and Tongan Death Grip.', '1000', 93, 40, 98, 86, 65, 100, 25, '90', 6, '{\"strike\": [\"Headbutt\", \"Clothesline\", \"Punch\", \"Choke\", \"Elbow Drop\", \"Savate Kick\"], \"grapple\": [\"Piledriver\", \"Gutwrench Suplex\", \"Body Slam\", \"Backbreaker\"], \"finisher\": [\"Tongan Death Grip\"], \"highFlying\": [\"Diving Headbutt\"]}', 'meng'),
(87, 'Michael Hayes', '6\'1\"', '230', 'P.S. Hayes. The charismatic leader of the Fabulous Freebirds, known for his mic skills and Freebird DDT.', '1000', 84, 87, 89, 86, 10, 82, 65, '70', 6, '{\"strike\": [\"Punch\", \"Punches\"], \"grapple\": [\"Suplex\", \"Sleeper\"], \"finisher\": [\"Freebird DDT\"], \"highFlying\": [\"None\"]}', 'hayes'),
(88, 'Mick Foley', '6\'2\"', '287', 'The Hardcore Legend. A master of pain and resilience, known for his three faces (Cactus Jack, Mankind, Dude Love) and willingness to sacrifice his body for entertainment. A true icon of extreme wrestling.', '1000', 87, 67, 97, 86, 30, 100, 35, '80', 7, '{\"strike\": [\"Piledriver (on concrete)\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Double Arm DDT\", \"Body Slam\"], \"finisher\": [\"Mandible Claw\"], \"highFlying\": [\"Elbow Drop (from apron)\"]}', 'foley'),
(89, 'Mike Rotunda', '6\'3\"', '250', 'Irwin R. Schyster (IRS). A technical wrestler known for his taxman gimmick and being a member of the Varsity Club.', '1000', 86, 93, 81, 88, 10, 84, 70, '70', 6, '{\"strike\": [\"Write-Off (Clothesline)\"], \"grapple\": [\"Abdominal Stretch\"], \"finisher\": [\"Stock Market Crash (Powerslam)\"], \"highFlying\": [\"None\"]}', 'rotunda'),
(90, 'Nick Bockwinkel', '6\'0\"', '230', 'The Smartest Wrestler. A highly intelligent and technical AWA World Heavyweight Champion, known for his intricate holds and eloquent promos.', '1000', 82, 98, 84, 90, 10, 85, 95, '95', 8, '{\"strike\": [\"Dropkick\"], \"grapple\": [\"Piledriver\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Sleeper Hold\"], \"highFlying\": [\"None\"]}', 'bockwinkel'),
(91, 'Nikita Koloff', '6\'2\"', '270', 'The Russian Nightmare. A powerful and intimidating Russian heel, known for his Sickle clothesline.', '1000', 94, 66, 90, 82, 5, 95, 40, '85', 5, '{\"strike\": [\"Bearhug\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Russian Sickle (Clothesline)\", \"Body Slam\"], \"finisher\": [\"Russian Sickle\"], \"highFlying\": [\"None\"]}', 'nikitakoloff'),
(92, 'Omos', '7\'3\"', '416', 'The Nigerian Giant. A towering and powerful force, known for his immense size and strength.', '1000', 100, 64, 90, 50, 1, 90, 10, '95', 2, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Two-Handed Chokeslam\", \"Body Slam\"], \"finisher\": [\"Two-Handed Chokeslam\"], \"highFlying\": [\"None\"]}', 'omos'),
(93, 'One Man Gang', '6\'9\"', '450', 'The African Dream. A massive and intimidating brawler, known for his size and aggressive style.', '1000', 93, 59, 90, 55, 5, 88, 20, '90', 3, '{\"strike\": [\"Big Splash\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"747 Splash\", \"Body Slam\"], \"finisher\": [\"747 Splash\"], \"highFlying\": [\"None\"]}', 'onemangang'),
(94, 'Owen Hart', '5\'10\"', '227', 'The King of Harts. A highly athletic and technical wrestler, known for his high-flying moves and charismatic personality.', '1000', 82, 94, 78, 90, 91, 83, 85, '80', 8, '{\"strike\": [\"Missile Dropkick\"], \"grapple\": [\"Sharpshooter\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Sharpshooter\"], \"highFlying\": [\"Diving Headbutt\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'owenhart'),
(95, 'Paul Orndorff', '6\'0\"', '250', 'Mr. Wonderful. A charismatic and powerful heel from the 80s, known for his physique and rivalry with Hulk Hogan.', '1000', 96, 86, 93, 89, 54, 85, 55, '80', 6, '{\"strike\": [\"Forearm Smash\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Piledriver\", \"Body Slam\"], \"finisher\": [\"Piledriver\"], \"highFlying\": [\"None\"]}', 'orndorff'),
(96, 'R-Truth', '6\'2\"', '230', 'What\'s Up?! A charismatic and comedic wrestler, known for his entertaining antics and 24/7 Championship pursuits.', '1000', 70, 65, 70, 80, 60, 70, 60, '65', 7, '{\"strike\": [\"Axe Kick\"], \"grapple\": [\"Lie Detector (Corkscrew Scissor Kick)\"], \"finisher\": [\"Lie Detector\"], \"highFlying\": [\"Flying Forearm\"]}', 'r-truth'),
(97, 'Randy Orton', '6\'5\"', '250', 'The Viper. The Apex Predator. Known for his smooth, methodical style, cunning mind, and devastating RKO. A multiple-time world champion and third-generation superstar.', '1000', 90, 86, 92, 90, 15, 90, 75, '85', 7, '{\"strike\": [\"Punt Kick (rare)\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"RKO (Jumping Cutter)\", \"Body Slam\"], \"finisher\": [\"RKO\"], \"highFlying\": [\"None\"]}', 'orton'),
(98, 'Rey Mysterio', '5\'6\"', '175', 'The Master of the 619. A high-flying innovator and ultimate underdog, known for his breathtaking aerial maneuvers and resilience. A true lucha libre legend.', '1000', 71, 88, 72, 94, 100, 86, 85, '70', 7, '{\"strike\": [\"Springboard Seated Senton\"], \"grapple\": [\"619 (Tiger Feint Kick)\"], \"finisher\": [\"Frog Splash\"], \"highFlying\": [\"West Coast Pop (Springboard Hurricanrana)\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'mysterio'),
(99, 'Rhyno', '5\'10\"', '295', 'The Man Beast. A powerful and aggressive brawler, known for his Gore finisher.', '1000', 92, 74, 95, 83, 5, 90, 40, '85', 5, '{\"strike\": [\"Gore (Spear)\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Spinebuster\", \"Body Slam\"], \"finisher\": [\"Gore\"], \"highFlying\": [\"None\"]}', 'rhyno'),
(100, 'Ric Flair', '6\'1\"', '243', 'The Nature Boy! Woooo! A sixteen-time World Champion, known for his flamboyant persona, incredible promos, and the Figure-Four Leglock. A true icon of professional wrestling.', '1025', 84, 97, 90, 100, 36, 94, 92, '85', 6, '{\"strike\": [\"Chop\", \"Punch\", \"Low Blow\"], \"grapple\": [\"Belly to Back Suplex\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Figure Four Leglock\"], \"highFlying\": [\"None\"]}', 'flair'),
(101, 'Rick Rude', '6\'4\"', '252', 'The Ravishing One. A charismatic and arrogant heel, known for his chiseled physique and Rude Awakening finisher.', '1000', 89, 88, 89, 93, 71, 87, 75, '85', 9, '{\"strike\": [\"Punch\", \"Clothesline\"], \"grapple\": [\"DDT\", \"Camel Clutch\", \"Powerslam\", \"Sleeper\", \"Backbreaker\", \"Piledriver\"], \"finisher\": [\"Rude Awakening\"], \"highFlying\": [\"Dropkick\", \"Diving Knee Drop\"]}', 'rude'),
(102, 'Rick Steiner', '5\'11\"', '275', 'The Dog-Faced Gremlin. One half of the Steiner Brothers, known for his amateur wrestling background and powerful suplexes.', '1000', 94, 92, 88, 84, 10, 90, 70, '85', 6, '{\"strike\": [\"Dog-Faced Gremlin Headbutt\"], \"grapple\": [\"Steinerline (Clothesline)\"], \"finisher\": [\"Steiner Bulldog\"], \"highFlying\": [\"None\"]}', 'ricksteiner');
INSERT INTO `roster` (`wrestler_id`, `name`, `height`, `weight`, `description`, `baseHp`, `strength`, `technicalAbility`, `brawlingAbility`, `stamina`, `aerialAbility`, `toughness`, `reversalAbility`, `submissionDefense`, `staminaRecoveryRate`, `moves`, `image`) VALUES
(103, 'Ricky Steamboat', '5\'10\"', '225', '\"The Dragon\" - Considered one of the greatest technical wrestlers and babyfaces in wrestling history. His matches with Ric Flair are often cited as the greatest trilogy in wrestling history. Known for his martial arts-inspired moveset and his flying crossbody finisher. His match with Randy Savage at WrestleMania III is considered one of the greatest matches ever. Never turned heel throughout his career, maintaining his status as a pure babyface.', '1100', 89, 96, 78, 100, 90, 84, 90, '80', 9, '{\"strike\": [\"Chop\"], \"grapple\": [\"Arm Drag\", \"Suplex\", \"Dragon sleeper\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Flying Crossbody\", \"Double Chicken Wing\"], \"highFlying\": [\"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\", \"Flying Axehandle\"]}', 'steamboat'),
(104, 'Rikishi', '6\'1\"', '425', 'Too Cool! A dancing sumo wrestler known for his immense size, stink face, and Banzai Drop. A charismatic and beloved figure.', '1000', 85, 70, 80, 90, 50, 75, 70, '75', 15, '{\"strike\": [\"Superkick\", \"Headbutt\", \"Rump Shaker (Stink Face)\"], \"grapple\": [\"Samoan Drop\", \"Bearhug\"], \"finisher\": [\"Banzai Drop\"], \"highFlying\": [\"None\"]}', 'rikishi'),
(105, 'Road Warrior Animal', '6\'2\"', '280', 'One half of the Legion of Doom/Road Warriors, known for his intimidating presence and powerful offense.', '1000', 96, 71, 95, 80, 62, 94, 30, '90', 5, '{\"strike\": [\"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerslam\", \"Body Slam\"], \"finisher\": [\"Doomsday Device (with Hawk)\"], \"highFlying\": [\"None\"]}', 'animal'),
(106, 'Road Warrior Hawk', '6\'3\"', '270', 'One half of the Legion of Doom/Road Warriors, known for his intimidating presence and powerful offense.', '1000', 91, 77, 96, 82, 78, 92, 30, '90', 5, '{\"strike\": [\"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerslam\", \"Body Slam\"], \"finisher\": [\"Doomsday Device (with Animal)\"], \"highFlying\": [\"None\"]}', 'hawk'),
(107, 'Rob Van Dam', '6\'0\"', '235', 'Mr. Pay-Per-View. The Whole F\'n Show. Known for his unique blend of high-flying, martial arts, and technical wrestling. A true innovator and fan favorite.', '1000', 70, 80, 70, 85, 95, 75, 75, '70', 7, '{\"strike\": [\"Van Daminator (Spinning Heel Kick with Chair)\"], \"grapple\": [\"Five-Star Frog Splash\"], \"finisher\": [\"Five-Star Frog Splash\"], \"highFlying\": [\"Rolling Thunder (Rolling Senton)\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'dam'),
(108, 'Roddy Piper', '6\'1\"', '230', 'Rowdy. One of the greatest talkers and heels of all time, known for his unpredictable behavior and Piper\'s Pit.', '1025', 89, 83, 97, 92, 51, 96, 55, '80', 7, '{\"strike\": [\"Eye Poke\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Sleeper Hold\", \"Body Slam\"], \"finisher\": [\"Sleeper Hold\"], \"highFlying\": [\"None\"]}', 'piper'),
(109, 'Roman Reigns', '6\'3\"', '265', 'The Tribal Chief. The Head of the Table. A dominant and powerful force, known for his Superman Punch and Spear. A multiple-time world champion and leader of The Bloodline.', '1000', 95, 70, 92, 85, 10, 95, 65, '90', 7, '{\"strike\": [\"Spear\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Superman Punch\", \"Body Slam\"], \"finisher\": [\"Guillotine Choke\"], \"highFlying\": [\"Drive-By (Running Dropkick)\"]}', 'reigns'),
(110, 'Ron Simmons', '6\'2\"', '270', 'Damn! A powerful and dominant wrestler, known for his strength and being the first recognized African-American World Heavyweight Champion.', '1000', 96, 81, 93, 84, 10, 93, 55, '85', 6, '{\"strike\": [\"Spinebuster\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Dominator\", \"Body Slam\"], \"finisher\": [\"Dominator\"], \"highFlying\": [\"None\"]}', 'simmons'),
(111, 'Ronnie Garvin', '5\'11\"', '230', 'The Hands of Stone. A tough and hard-hitting wrestler, known for his stiff punches and submission holds.', '1000', 75, 80, 85, 80, 10, 85, 70, '80', 6, '{\"strike\": [\"Knockout Punch\"], \"grapple\": [\"Figure-Four Leglock\"], \"finisher\": [\"Hands of Stone (Punch)\"], \"highFlying\": [\"None\"]}', 'ronniegarvin'),
(112, 'Sabu', '6\'0\"', '220', 'The Homicidal, Suicidal, Genocidal, Death-Defying Maniac. An extreme high-flyer known for his innovative and dangerous maneuvers.', '1000', 70, 60, 85, 70, 90, 70, 60, '65', 6, '{\"strike\": [\"Arabian Facebuster (Chair Assisted)\"], \"grapple\": [\"Triple Jump Moonsault\"], \"finisher\": [\"Triple Jump Moonsault\"], \"highFlying\": [\"Air Sabu (Springboard Leg Drop)\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'sabu'),
(113, 'Samoa Joe', '6\'2\"', '282', 'The Samoan Submission Machine. A powerful and highly skilled technical wrestler, known for his devastating submission holds and hard-hitting style.', '1000', 90, 92, 94, 83, 10, 92, 85, '95', 7, '{\"strike\": [\"Muscle Buster\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Coquina Clutch (Rear Naked Choke)\", \"Body Slam\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Coquina Clutch\"], \"highFlying\": [\"Olé Kick (Corner Enzuigiri)\"]}', 'joe'),
(114, 'Scott Hall', '6\'7\"', '287', 'The Bad Guy. A charismatic and influential wrestler, known for his \'Razor Ramon\' persona and Outsider/nWo run.', '1000', 92, 84, 92, 89, 10, 85, 60, '80', 6, '{\"strike\": [\"Chop\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Razor\'s Edge (Outsider\'s Edge)\", \"Body Slam\"], \"finisher\": [\"Razor\'s Edge\"], \"highFlying\": [\"None\"]}', 'hall'),
(115, 'Scott Steiner', '6\'1\"', '275', 'Big Poppa Pump. One half of the Steiner Brothers, known for his amateur wrestling background, powerful suplexes, and later, his eccentric persona.', '1000', 98, 92, 93, 84, 10, 90, 80, '85', 6, '{\"strike\": [\"Frankensteiner (Hurricanrana)\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Steiner Recliner (Camel Clutch)\", \"Body Slam\"], \"finisher\": [\"Steiner Recliner\"], \"highFlying\": [\"None\"]}', 'scottsteiner'),
(116, 'Seth Rollins', '6\'1\"', '217', 'The Visionary. The Revolutionary. Known for his incredible athleticism, innovative offense, and dynamic character changes. A multiple-time world champion and Grand Slam Champion.', '1000', 86, 90, 78, 88, 85, 80, 85, '80', 8, '{\"strike\": [\"Curb Stomp (Blackout)\"], \"grapple\": [\"Pedigree\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Curb Stomp\"], \"highFlying\": [\"Frog Splash\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'rollins'),
(117, 'Shawn Michaels', '6\'1\"', '225', 'The Heartbreak Kid. Mr. WrestleMania. One of the greatest performers of all time, known for his incredible athleticism, charisma, and devastating Sweet Chin Music. A Grand Slam Champion.', '1000', 78, 93, 82, 95, 91, 92, 86, '80', 9, '{\n    \"strike\": [\"Flying forearm & Kip up\", \"Punch\"], \n    \"grapple\": [\"Inverted atomic drop\", \"Teardrop Suplex\", \"Figure-Four Leglock\", \"Russian Leg Sweep\", \"Slingshot Suplex\"], \n    \"finisher\": [\"Sweet Chin Music\", \"Sharpshooter\"], \n    \"highFlying\": [\"Diving Elbow Drop\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]\n}', 'michaels'),
(118, 'Sheamus', '6\'4\"', '267', 'The Celtic Warrior. A hard-hitting and aggressive brawler, known for his Brogue Kick and intense style.', '1000', 93, 81, 94, 80, 5, 90, 65, '85', 7, '{\"strike\": [\"Brogue Kick\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"White Noise (Crucifix Powerbomb)\", \"Body Slam\"], \"finisher\": [\"Brogue Kick\"], \"highFlying\": [\"None\"]}', 'sheamus'),
(119, 'Shinsuke Nakamura', '6\'2\"', '229', 'The King of Strong Style. A charismatic and unorthodox striker, known for his unique movements and devastating Kinshasa.', '1000', 83, 89, 96, 85, 65, 80, 80, '75', 7, '{\"strike\": [\"Kinshasa (Knee Strike)\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Reverse Exploder Suplex\", \"Body Slam\"], \"finisher\": [\"Kinshasa\"], \"highFlying\": [\"None\"]}', 'nakamura'),
(120, 'Sid Vicious', '6\'9\"', '303', 'The Master and Ruler of the World. A powerful and intense big man, known for his unpredictable nature and powerbomb.', '1000', 97, 62, 92, 83, 51, 95, 40, '85', 5, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerbomb\", \"Body Slam\"], \"finisher\": [\"Powerbomb\"], \"highFlying\": [\"None\"]}', 'sid'),
(121, 'Stan Hansen', '6\'4\"', '320', 'The Lariat. A legendary tough and hard-hitting brawler, known for his stiff clothesline and wild persona.', '1000', 94, 71, 100, 88, 5, 100, 30, '90', 5, '{\"strike\": [\"Elbow Drop\", \"Knee Drop\", \"Punch\", \"Clothesline\"], \"grapple\": [\"Brazos Valley Backbreaker\", \"German Suplex\", \"Suplex\", \"Piledriver\", \"Body Slam\"], \"finisher\": [\"Western Lariat\"], \"highFlying\": [\"None\"]}', 'hansen'),
(122, 'Steve Williams', '6\'2\"', '285', 'Dr. Death. A powerful and legitimate tough wrestler, known for his amateur wrestling background and hard-hitting style.', '1000', 96, 88, 90, 80, 10, 95, 80, '90', 7, '{\"strike\": [\"Forearm Smash\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Oklahoma Stampede (Running Powerslam)\", \"Body Slam\"], \"finisher\": [\"Oklahoma Stampede\"], \"highFlying\": [\"None\"]}', 'williams'),
(123, 'Sting', '6\'2\"', '251', 'The Icon. The Vigilante. Known for his mysterious persona, iconic baseball bat, and devastating Scorpion Death Drop. A multiple-time world champion and legend of WCW.', '1050', 94, 82, 91, 95, 78, 92, 70, '85', 10, '{\"strike\": [\"Stinger Splash\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Scorpion Death Drop\", \"Body Slam\"], \"finisher\": [\"Scorpion Deathlock\"], \"highFlying\": [\"None\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'sting'),
(124, 'Stone Cold Steve Austin', '6\'2\"', '252', 'The Texas Rattlesnake. The undisputed leader of the Attitude Era, known for his rebellious attitude, beer-drinking, and devastating Stone Cold Stunner. A six-time WWE Champion.', '1000', 90, 81, 95, 90, 26, 95, 55, '90', 7, '{\"strike\": [\"Lou Thesz Press\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Stone Cold Stunner\", \"Body Slam\"], \"finisher\": [\"Stone Cold Stunner\"], \"highFlying\": [\"None\"]}', 'austin'),
(125, 'Ted DiBiase', '6\'3\"', '260', 'The Million Dollar Man. A wealthy and arrogant heel, known for his Million Dollar Dream sleeper hold and bribing opponents.', '1000', 83, 93, 81, 93, 31, 80, 75, '80', 6, '{\"strike\": [\"Fist Drop\"], \"grapple\": [\"Million Dollar Dream (Cobra Clutch)\"], \"finisher\": [\"Million Dollar Dream\"], \"highFlying\": [\"None\"]}', 'dibiase'),
(126, 'Terry Funk', '6\'1\"', '249', 'The Funker. A legendary hardcore icon, known for his longevity, intensity, and willingness to brawl anywhere.', '1000', 84, 76, 97, 85, 10, 98, 40, '85', 9, '{\"strike\": [\"Piledriver\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Spinning Toe Hold\", \"Body Slam\"], \"finisher\": [\"Spinning Toe Hold\"], \"highFlying\": [\"None\"]}', 'funk'),
(127, 'Terry Gordy', '6\'3\"', '280', 'Bam Bam. A powerful and athletic brawler, known for his time in the Fabulous Freebirds and his hard-hitting style.', '1000', 92, 68, 93, 84, 10, 94, 55, '80', 8, '{\"strike\": [\"Lariat\"], \"grapple\": [\"Powerbomb\"], \"finisher\": [\"Powerbomb\"], \"highFlying\": [\"None\"]}', 'gordy'),
(128, 'The Big Show', '7\'0\"', '383', 'The World\'s Largest Athlete. A towering giant with incredible power and surprising agility for his size. A versatile competitor who has held numerous championships.', '1050', 100, 61, 93, 76, 45, 100, 40, '95', 4, '{\"strike\": [\"Knockout Punch\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Chokeslam\", \"Body Slam\"], \"finisher\": [\"Showstopper (Chokeslam)\"], \"highFlying\": [\"None\"]}', 'bigshow'),
(129, 'The Great Khali', '7\'1\"', '347', 'The Punjabi Nightmare. A massive Indian giant, known for his immense size and Chop.', '1000', 99, 59, 96, 71, 1, 94, 10, '90', 6, '{\"strike\": [\"Brain Chop\"], \"grapple\": [\"Punjabi Plunge (Two-Handed Chokeslam)\"], \"finisher\": [\"Punjabi Plunge\"], \"highFlying\": [\"None\"]}', 'khali'),
(130, 'The Great Muta', '6\'2\"', '230', 'The Master of the Muta Lock. A Japanese wrestling icon known for his innovative offense, mist-spitting, and mysterious persona. A true innovator.', '1000', 75, 90, 88, 89, 95, 85, 85, '80', 10, '{\"strike\": [\"Green Mist\"], \"grapple\": [\"Muta Lock\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Shining Wizard (Running Knee)\"], \"highFlying\": [\"Moonsault\"]}', 'muta'),
(131, 'The Iron Sheik', '6\'0\"', '260', 'The Iranian strongman, known for his anti-American promos and Camel Clutch finisher.', '1000', 92, 91, 85, 83, 5, 90, 40, '90', 7, '{\"strike\": [\"Forearm Smash\", \"Clothesline\"], \"grapple\": [\"Abdominal Stretch\", \"Gutwrench Suplex\", \"Suplex\", \"Body Slam\", \"Sleeper\"], \"finisher\": [\"Camel Clutch\"], \"highFlying\": [\"Dropkick\"]}', 'sheik'),
(132, 'The Miz', '6\'2\"', '220', 'The A-Lister. A charismatic and arrogant heel, known for his mic skills and Skull-Crushing Finale.', '1000', 70, 75, 70, 85, 10, 75, 70, '70', 7, '{\"strike\": [\"Reality Check (Running Knee Lift)\"], \"grapple\": [\"Skull-Crushing Finale (Full Neson Facebuster)\"], \"finisher\": [\"Skull-Crushing Finale\"], \"highFlying\": [\"None\"]}', 'miz'),
(133, 'The Rock', '6\'5\"', '260', 'The Most Electrifying Man in Sports Entertainment. Known for his unparalleled charisma, iconic catchphrases, and devastating Rock Bottom and People\'s Elbow. A multiple-time world champion and Hollywood superstar.', '1025', 93, 76, 94, 92, 47, 90, 60, '85', 7, '{\"strike\": [\"People\'s Elbow\"], \"grapple\": [\"Rock Bottom\"], \"finisher\": [\"Rock Bottom\"], \"highFlying\": [\"None\"]}', 'rock'),
(134, 'The Undertaker', '6\'10\"', '309', 'The Deadman. The Phenom. A legendary supernatural force, known for his chilling entrance, incredible longevity, and devastating Tombstone Piledriver. His WrestleMania undefeated streak is iconic.', '1050', 97, 74, 97, 88, 67, 98, 65, '95', 5, '{\"strike\": [\"Old School (Arm Twist Ropewalk Chop)\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Chokeslam\", \"Body Slam\"], \"finisher\": [\"Tombstone Piledriver\"], \"highFlying\": [\"None\"]}', 'undertaker'),
(135, 'Triple H', '6\'4\"', '255', 'The Game. The King of Kings. A dominant and cerebral competitor, known for his powerful offense, cunning mind, and devastating Pedigree. A multiple-time world champion and wrestling executive.', '1025', 94, 91, 92, 91, 36, 95, 80, '90', 7, '{\"strike\": [\"Sledgehammer Shot (rare)\"], \"grapple\": [\"Pedigree\"], \"finisher\": [\"Pedigree\"], \"highFlying\": [\"None\"]}', 'h'),
(136, 'Tully Blanchard', '5\'10\"', '220', 'The Enforcer. A cunning and technical wrestler, known for his intelligence and being a member of the Four Horsemen.', '1000', 81, 90, 79, 90, 10, 82, 85, '85', 7, '{\"strike\": [\"Piledriver\"], \"grapple\": [\"Slingshot Suplex\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Slingshot Suplex\"], \"highFlying\": [\"None\"]}', 'blanchard'),
(137, 'Ultimate Warrior', '6\'4\"', '280', 'Feel the Power! An intensely energetic and unpredictable superstar, known for his face paint, colorful attire, and powerful Gorilla Press Slam. A former WWE Champion.', '1000', 98, 55, 91, 80, 5, 90, 35, '80', 7, '{\"strike\": [\"Clothesline\"], \"grapple\": [\"Gorilla Press Slam\"], \"finisher\": [\"Warrior Splash\"], \"highFlying\": [\"None\"]}', 'warrior'),
(138, 'Vader', '6\'5\"', '458', 'The Mastodon. A powerful and aggressive superheavyweight, known for his stiff strikes and Vader Bomb.', '1050', 98, 68, 99, 84, 71, 100, 40, '90', 7, '{\"strike\": [\"Vader Bomb (Corner Splash)\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerbomb\", \"Body Slam\", \"Chokeslam\"], \"finisher\": [\"Vader Bomb\"], \"highFlying\": [\"Moonsault\"]}', 'vader'),
(139, 'Umaga', '6\'4\"', '348', 'The Samoan Bulldozer. A destructive and unpredictable force, known for his savage intensity and devastating Samoan Spike. A former Intercontinental Champion.', '1050', 94, 74, 97, 89, 75, 98, 25, '90', 8, '{\n    \"strike\": [\"Running Hip Attack\", \"Clothesline\", \"Punch\", \"Elbow Drop\", \"Savate kick\"], \n    \"grapple\": [\"Samoan Drop\", \"Body Slam\", \"Two–handed chokelift\", \"Nerve hold\", \"Backbreaker\"], \n    \"finisher\": [\"Samoan Spike\"], \n    \"highFlying\": [\"Diving Headbutt\"]\n}', 'umaga'),
(140, 'Yokozuna', '6\'4\"', '589', 'A colossal sumo wrestler turned WWE Champion, known for his immense size, Banzai Drop, and association with Mr. Fuji. A dominant force in the early 90s.', '1050', 97, 55, 92, 75, 25, 100, 15, '95', 6, '{\"strike\": [\"Salt Throw\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Body Slam\"], \"finisher\": [\"Banzai Drop\"], \"highFlying\": [\"None\"]}', 'yokozuna'),
(141, 'Rick Martel', '6\'0\"', '226', 'The Model. Known for his time in the World Wrestling Federation (WWF), World Championship Wrestling (WCW) and the American Wrestling Association (AWA) where he had a nearly two-year long reign as AWA World Heavyweight Champion.', '1000', 85, 91, 79, 92, 84, 81, 84, '85', 10, '{\"strike\": [\"Punch\"], \"grapple\": [\"Backbreaker\", \"Gut Wrench Suplex\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Boston Crab\"], \"highFlying\": [\"Drop Kick\", \"Diving Crossbody\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'martel'),
(142, 'Butch Reed', '6\'2\"', '262', '\"Hacksaw\" Butch Reed was an American professional football player and professional wrestler known for his powerful physique and athletic ability. He was a prominent figure in various wrestling promotions, including Mid-South Wrestling, WWE (WWF), and WCW. In WWE, he was known as \"The Natural\" Butch Reed, managed by Slick, and had notable feuds with wrestlers like Tito Santana and Ricky Steamboat. He later formed the tag team Doom with Ron Simmons in WCW, achieving success as NWA World Tag Team Champions. ', '1000', 93, 74, 91, 91, 83, 90, 60, '80', 7, '{\"strike\": [\"Forearm Smash\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Bearhug\", \"Body Slam\"], \"finisher\": [\"Military Press Powerslam\"], \"highFlying\": [\"None\"]}', 'reed'),
(143, 'Bradshaw', '6\'6\"', '270', 'Member of The APA along with Ron Simmons. Held the WWE Championship once for an impressive 280 days, making him one of the longest-reigning champions of the SmackDown era, among various other championships.', '1000', 94, 82, 94, 84, 63, 91, 75, '75', 7, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerbomb\", \"Body Slam\", \"Swinging Neckbreaker\", \"Fallaway Slam\"], \"finisher\": [\"Clothesline from Hell\"], \"highFlying\": [\"None\"]}', 'bradshaw'),
(144, 'Steve McMichael', '6\'4\"', '270', 'Mongo. Former Chicago Bears great turned pro wrestler, Steve \"Mongo\" McMichael had a brief but memorable four year run in WCW as a member of the Four Horsemen and as a former US Heavyweight Champion.', '1000', 93, 71, 89, 86, 5, 91, 30, '90', 5, '{\"strike\": [\"Elbow Drop\", \"Knee Drop\", \"Punch\", \"Clothesline\"], \"grapple\": [\"Powerslam\", \"Camel Clutch\", \"Suplex\", \"Piledriver\", \"Body Slam\"], \"finisher\": [\"Tombstone Piledriver\"], \"highFlying\": [\"None\"]}', 'mcmichael');

-- --------------------------------------------------------

--
-- Table structure for table `roster_tag_teams`
--

CREATE TABLE `roster_tag_teams` (
  `tag_team_id` int(11) NOT NULL,
  `tag_team` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roster_tag_teams`
--

INSERT INTO `roster_tag_teams` (`tag_team_id`, `tag_team`, `description`, `image`) VALUES
(1, 'Road Warriors', '', 'road-warriors'),
(2, 'Midnight Express', '', 'midnight-express'),
(3, 'Rock N Roll Express', '', 'rock-n-roll-express'),
(4, 'Brainbusters', '', 'brainbusters'),
(5, 'Demolition', '', 'demolition'),
(6, 'Hart Foundation', '', 'hart-foundation'),
(7, 'British Bulldogs', '', 'british-bulldogs'),
(8, 'Powers of Pain', '', 'powers-of-pain'),
(9, 'Steiner Brothers', '', 'steiner-brothers'),
(10, 'Dudley Boyz', '', 'dudley-boyz'),
(11, 'Hardy Boyz', '', 'hardy-boyz'),
(12, 'Edge and Christian', '', 'edge-and-christian'),
(13, 'Freebirds', '', 'freebirds'),
(14, 'New Age Outlaws', '', 'new-age-outlaws'),
(15, 'Harlem Heat', '', 'harlem-heat'),
(16, 'Bushwhackers', '', 'bushwhackers'),
(17, 'Strike Force', '', 'strike-force'),
(18, 'Samoan Swat Team', '', 'samoan-swat-team'),
(19, 'Nasty Boys', '', 'nasty-boys'),
(20, 'Rated RKO', '', 'rated-rko'),
(21, 'Natural Disasters', '', 'natural-disasters'),
(22, 'Owen Hart and British Bulldog', '', 'owen-hart-and-british-bulldog'),
(23, 'APA', '', 'apa'),
(24, 'Dx', '', 'dx'),
(25, 'The Rockers', '', 'the-rockers'),
(26, 'The New Day', '', 'the-new-day'),
(27, 'Doom', '', 'doom'),
(28, 'Skyscrapers', '', 'skyscrapers');

-- --------------------------------------------------------

--
-- Table structure for table `roster_tag_team_wrestlers`
--

CREATE TABLE `roster_tag_team_wrestlers` (
  `wrestler_id` int(11) NOT NULL,
  `member_of` varchar(50) DEFAULT NULL COMMENT 'The tag team name this wrestler is a member of',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `height` text,
  `weight` text,
  `description` text,
  `baseHp` text,
  `strength` int(11) DEFAULT NULL,
  `technicalAbility` int(11) DEFAULT NULL,
  `brawlingAbility` int(11) DEFAULT NULL,
  `stamina` int(11) DEFAULT NULL,
  `aerialAbility` int(11) DEFAULT NULL,
  `toughness` int(11) DEFAULT NULL,
  `reversalAbility` int(11) DEFAULT NULL,
  `submissionDefense` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `staminaRecoveryRate` int(11) DEFAULT NULL,
  `moves` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roster_tag_team_wrestlers`
--

INSERT INTO `roster_tag_team_wrestlers` (`wrestler_id`, `member_of`, `name`, `height`, `weight`, `description`, `baseHp`, `strength`, `technicalAbility`, `brawlingAbility`, `stamina`, `aerialAbility`, `toughness`, `reversalAbility`, `submissionDefense`, `staminaRecoveryRate`, `moves`, `image`) VALUES
(5, 'Brainbusters', 'Arn Anderson', '6\'1\"', '245', 'The Enforcer. Master of fundamental wrestling and psychology. Key member of The Four Horsemen alongside Ric Flair. Never held a world championship but was considered one of the best wrestlers never to do so. Exceptional storyteller in the ring and on the microphone. Later became a respected backstage producer and trainer, helping develop future stars.', '1000', 87, 92, 85, 92, 15, 90, 80, '85', 7, '{\"strike\": [\"Left Handed Punch\"], \"grapple\": [\"Spinebuster\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Double A Spinebuster\"], \"highFlying\": [\"None\"]}', 'anderson'),
(7, 'Powers of Pain', 'Barbarian', '6\'2\"', '280', 'One half of the Powers of Pain, known for his brute strength and intimidating presence.', '1100', 95, 64, 93, 82, 70, 96, 40, '80', 5, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerbomb\", \"Body Slam\"], \"finisher\": [\"Headbutt off the Top Rope\"], \"highFlying\": [\"None\"]}', 'barbarian'),
(14, NULL, 'Bobby Eaton', '5\'10\"', '230', 'One of the most underrated tag team wrestlers of all time, known for his smooth style and incredible athleticism.', '1000', 75, 93, 86, 90, 91, 87, 80, '75', 7, '{\"strike\": [\"Elbow Drop\"], \"grapple\": [\"Alabama Jam (Diving Leg Drop)\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Alabama Jam\"], \"highFlying\": [\"Diving Knee Drop\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'eaton'),
(16, NULL, 'Booker T', '6\'3\"', '250', 'Can you dig it, sucka?! Five-time WCW World Heavyweight Champion and one-time World Heavyweight Champion in WWE. Master of the spinaroonie and Book End finisher. Successful tag team career with his brother Stevie Ray as Harlem Heat. Later became a respected commentator and trainer. His charisma and catchphrases made him one of the most entertaining performers of his era.', '1000', 87, 85, 92, 89, 80, 84, 75, '75', 7, '{\"strike\": [\"Scissor Kick\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Book End (Side Slam)\", \"Body Slam\"], \"finisher\": [\"Axe Kick (Booker T\'s Axe Kick)\"], \"highFlying\": [\"Houston Hangover (Diving Senton)\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'bookert'),
(19, NULL, 'Bret Hart', '6\'1\"', '234', 'The Hitman. The Excellence of Execution. Five-time WWE Champion and considered one of the greatest technical wrestlers ever. Member of the legendary Hart wrestling family from Calgary. His matches told perfect stories through pure wrestling ability. The Montreal Screwjob incident in 1997 became one of wrestling\'s most controversial moments. Later had a successful run in WCW before injuries ended his career.', '1050', 85, 100, 89, 96, 20, 93, 95, '90', 8, '{\"strike\": [\"Diving Elbow Drop\"], \"grapple\": [\"Piledriver\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Sharpshooter\"], \"highFlying\": [\"None\"]}', 'brethart'),
(28, NULL, 'Christian', '6\'1\"', '212', 'Captain Charisma. Two-time World Heavyweight Champion and multiple-time Intercontinental and tag team champion. Originally succeeded as part of Edge & Christian before establishing himself as a singles star. His \"peeps\" and various catchphrases showcased his natural comedic timing. Had career-defining runs in TNA Wrestling as a main event star. Known for his intelligence and psychology in crafting memorable matches.', '1000', 85, 93, 83, 90, 80, 84, 80, '70', 7, '{\"strike\": [\"Spear\"], \"grapple\": [\"Killswitch (Unprettier)\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Killswitch\"], \"highFlying\": [\"Frog Splash\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'christian'),
(34, NULL, 'Dan Spivey', '6\'8\"', '280', 'A powerful big man known for his time in the Skyscrapers and as a member of the Varsity Club.', '1000', 92, 76, 90, 83, 10, 87, 50, '80', 5, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerbomb\", \"Body Slam\"], \"finisher\": [\"Spivey Spike (DDT)\"], \"highFlying\": [\"None\"]}', 'spivey'),
(37, NULL, 'Davey Boy Smith', '5\'11\"', '250', 'The British Bulldog. A powerful and athletic wrestler, known for his strength, agility, and classic matches.', '1000', 95, 90, 88, 92, 20, 85, 65, '80', 6, '{\"strike\": [\"Headbutt\"], \"grapple\": [\"Running Powerslam\"], \"finisher\": [\"Running Powerslam\"], \"highFlying\": [\"None\"]}', 'daveyboy'),
(46, NULL, 'Earthquake', '6\'7\"', '468', 'A massive superheavyweight known for his devastating Earthquake Splash and being part of the Natural Disasters.', '1000', 96, 30, 90, 60, 5, 100, 25, '95', 4, '{\"strike\": [\"Avalanche Splash\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Earthquake Splash\", \"Body Slam\"], \"finisher\": [\"Earthquake Splash\"], \"highFlying\": [\"None\"]}', 'earthquake'),
(47, NULL, 'Edge', '6\'5\"', '241', 'The Rated-R Superstar. A master manipulator and opportunist, Edge is known for his incredible charisma, diverse move set, and numerous championship reigns.', '1000', 85, 87, 89, 85, 60, 88, 80, '80', 7, '{\"strike\": [\"Spear\"], \"grapple\": [\"Edgecution (Impaler DDT)\"], \"finisher\": [\"Spear\"], \"highFlying\": [\"Diving Crossbody\"]}', 'edge'),
(72, NULL, 'Kevin Nash', '6\'10\"', '317', 'Big Daddy Cool. A charismatic giant known for his powerbomb and influential role in the Kliq and nWo. A multiple-time world champion.', '1000', 96, 68, 92, 81, 10, 90, 50, '85', 5, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Jackknife Powerbomb\", \"Body Slam\"], \"finisher\": [\"Jackknife Powerbomb\"], \"highFlying\": [\"None\"]}', 'nash'),
(87, NULL, 'Michael Hayes', '6\'1\"', '230', 'P.S. Hayes. The charismatic leader of the Fabulous Freebirds, known for his mic skills and Freebird DDT.', '1000', 84, 87, 89, 86, 10, 82, 65, '70', 6, '{\"strike\": [\"Bionic Elbow\"], \"grapple\": [\"Freebird DDT\"], \"finisher\": [\"Freebird DDT\"], \"highFlying\": [\"None\"]}', 'hayes'),
(94, NULL, 'Owen Hart', '5\'10\"', '227', 'The King of Harts. A highly athletic and technical wrestler, known for his high-flying moves and charismatic personality.', '1000', 82, 94, 78, 90, 91, 83, 85, '80', 8, '{\"strike\": [\"Missile Dropkick\"], \"grapple\": [\"Sharpshooter\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Sharpshooter\"], \"highFlying\": [\"Diving Headbutt\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]}', 'owenhart'),
(102, 'Steiner Brothers', 'Rick Steiner', '5\'11\"', '275', 'The Dog-Faced Gremlin. One half of the Steiner Brothers, known for his amateur wrestling background and powerful suplexes.', '1000', 94, 92, 88, 84, 10, 90, 70, '85', 6, '{\"strike\": [\"Dog-Faced Gremlin Headbutt\"], \"grapple\": [\"Steinerline (Clothesline)\"], \"finisher\": [\"Steiner Bulldog\"], \"highFlying\": [\"None\"]}', 'ricksteiner'),
(105, 'Road Warriors', 'Road Warrior Animal', '6\'2\"', '280', 'One half of the Legion of Doom/Road Warriors, known for his intimidating presence and powerful offense.', '1000', 96, 71, 95, 80, 62, 94, 30, '90', 5, '{\"strike\": [\"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerslam\", \"Body Slam\"], \"finisher\": [\"Doomsday Device (with Hawk)\"], \"highFlying\": [\"None\"]}', 'animal'),
(106, 'Road Warriors', 'Road Warrior Hawk', '6\'3\"', '270', 'One half of the Legion of Doom/Road Warriors, known for his intimidating presence and powerful offense.', '1000', 91, 77, 96, 82, 78, 92, 30, '90', 5, '{\"strike\": [\"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerslam\", \"Body Slam\"], \"finisher\": [\"Doomsday Device (with Animal)\"], \"highFlying\": [\"None\"]}', 'hawk'),
(110, NULL, 'Ron Simmons', '6\'2\"', '270', 'Damn! A powerful and dominant wrestler, known for his strength and being the first recognized African-American World Heavyweight Champion.', '1000', 96, 81, 93, 84, 10, 93, 55, '85', 6, '{\"strike\": [\"Spinebuster\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Dominator\", \"Body Slam\"], \"finisher\": [\"Dominator\"], \"highFlying\": [\"None\"]}', 'simmons'),
(114, NULL, 'Scott Hall', '6\'7\"', '287', 'The Bad Guy. A charismatic and influential wrestler, known for his \'Razor Ramon\' persona and Outsider/nWo run.', '1000', 92, 84, 92, 89, 10, 85, 60, '80', 6, '{\"strike\": [\"Chop\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Razor\'s Edge (Outsider\'s Edge)\", \"Body Slam\"], \"finisher\": [\"Razor\'s Edge\"], \"highFlying\": [\"None\"]}', 'hall'),
(115, 'Steiner Brothers', 'Scott Steiner', '6\'1\"', '275', 'Big Poppa Pump. One half of the Steiner Brothers, known for his amateur wrestling background, powerful suplexes, and later, his eccentric persona.', '1000', 98, 92, 93, 84, 10, 90, 80, '85', 6, '{\"strike\": [\"Frankensteiner (Hurricanrana)\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Steiner Recliner (Camel Clutch)\", \"Body Slam\"], \"finisher\": [\"Steiner Recliner\"], \"highFlying\": [\"None\"]}', 'scottsteiner'),
(117, NULL, 'Shawn Michaels', '6\'1\"', '225', 'The Heartbreak Kid. Mr. WrestleMania. One of the greatest performers of all time, known for his incredible athleticism, charisma, and devastating Sweet Chin Music. A Grand Slam Champion.', '1000', 78, 93, 82, 95, 91, 92, 86, '80', 9, '{\n    \"strike\": [\"Flying forearm & Kip up\", \"Punch\"], \n    \"grapple\": [\"Inverted atomic drop\", \"Teardrop Suplex\", \"Figure-Four Leglock\", \"Russian Leg Sweep\", \"Slingshot Suplex\"], \n    \"finisher\": [\"Sweet Chin Music\", \"Sharpshooter\"], \n    \"highFlying\": [\"Diving Elbow Drop\", \"Dropkick\", \"Flying Crossbody\", \"Top Rope Dropkick\"]\n}', 'michaels'),
(120, NULL, 'Sid Vicious', '6\'9\"', '303', 'The Master and Ruler of the World. A powerful and intense big man, known for his unpredictable nature and powerbomb.', '1000', 97, 62, 92, 83, 51, 95, 40, '85', 5, '{\"strike\": [\"Big Boot\", \"Clothesline\", \"Punch\", \"Elbow Drop\"], \"grapple\": [\"Powerbomb\", \"Body Slam\"], \"finisher\": [\"Powerbomb\"], \"highFlying\": [\"None\"]}', 'sid'),
(127, NULL, 'Terry Gordy', '6\'3\"', '280', 'Bam Bam. A powerful and athletic brawler, known for his time in the Fabulous Freebirds and his hard-hitting style.', '1000', 92, 68, 93, 84, 10, 94, 55, '80', 8, '{\"strike\": [\"Lariat\"], \"grapple\": [\"Powerbomb\"], \"finisher\": [\"Powerbomb\"], \"highFlying\": [\"None\"]}', 'gordy'),
(135, NULL, 'Triple H', '6\'4\"', '255', 'The Game. The King of Kings. A dominant and cerebral competitor, known for his powerful offense, cunning mind, and devastating Pedigree. A multiple-time world champion and wrestling executive.', '1025', 94, 91, 92, 91, 36, 95, 80, '90', 7, '{\"strike\": [\"Sledgehammer Shot (rare)\"], \"grapple\": [\"Pedigree\"], \"finisher\": [\"Pedigree\"], \"highFlying\": [\"None\"]}', 'h'),
(136, 'Brainbusters', 'Tully Blanchard', '5\'10\"', '220', 'The Enforcer. A cunning and technical wrestler, known for his intelligence and being a member of the Four Horsemen.', '1000', 81, 90, 79, 90, 10, 82, 85, '85', 7, '{\"strike\": [\"Piledriver\"], \"grapple\": [\"Slingshot Suplex\", \"Suplex\", \"Inverted atomic drop\", \"Abdominal Stretch\", \"Hip Toss\", \"Arm Bar\"], \"finisher\": [\"Slingshot Suplex\"], \"highFlying\": [\"None\"]}', 'blanchard');

-- --------------------------------------------------------

--
-- Table structure for table `team_records`
--

CREATE TABLE `team_records` (
  `team_id` varchar(511) NOT NULL,
  `wrestler1_id` varchar(255) NOT NULL,
  `wrestler2_id` varchar(255) NOT NULL,
  `wins` int(11) DEFAULT '0',
  `losses` int(11) DEFAULT '0',
  `draws` int(11) DEFAULT '0',
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `wrestler_moves`
--

CREATE TABLE `wrestler_moves` (
  `wrestler_id` int(11) NOT NULL COMMENT 'Foreign key referencing the wrestler_id in the wrestlers table',
  `wrestler_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `move_id` int(11) NOT NULL COMMENT 'Foreign key referencing the move_id in the moves table'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Links wrestlers to their specific moves';

--
-- Dumping data for table `wrestler_moves`
--

INSERT INTO `wrestler_moves` (`wrestler_id`, `wrestler_name`, `move_id`) VALUES
(1, 'Abdullah the Butcher', 1),
(1, 'Abdullah the Butcher', 2),
(6, 'Bam Bam Bigelow', 1),
(6, 'Bam Bam Bigelow', 22);

-- --------------------------------------------------------

--
-- Table structure for table `wrestler_records`
--

CREATE TABLE `wrestler_records` (
  `wrestler_id` varchar(255) NOT NULL,
  `wins` int(11) DEFAULT '0',
  `losses` int(11) DEFAULT '0',
  `draws` int(11) DEFAULT '0',
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_moves`
--
ALTER TABLE `all_moves`
  ADD PRIMARY KEY (`move_id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`match_id`),
  ADD KEY `team1_player1_id` (`team1_player1_id`),
  ADD KEY `team1_player2_id` (`team1_player2_id`),
  ADD KEY `team2_player1_id` (`team2_player1_id`),
  ADD KEY `team2_player2_id` (`team2_player2_id`),
  ADD KEY `idx_match_date` (`match_date`),
  ADD KEY `idx_matches_player1` (`player1_id`),
  ADD KEY `idx_matches_player2` (`player2_id`),
  ADD KEY `idx_matches_winner` (`single_winner_id`),
  ADD KEY `idx_matches_loser` (`single_loser_id`),
  ADD KEY `idx_matches_team_winner` (`team_winner_id`),
  ADD KEY `idx_matches_team_loser` (`team_loser_id`);

--
-- Indexes for table `moves`
--
ALTER TABLE `moves`
  ADD PRIMARY KEY (`move_id`),
  ADD UNIQUE KEY `name` (`move_name`);

--
-- Indexes for table `roster`
--
ALTER TABLE `roster`
  ADD PRIMARY KEY (`wrestler_id`),
  ADD UNIQUE KEY `wrestler_id` (`wrestler_id`) USING BTREE,
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `roster_tag_teams`
--
ALTER TABLE `roster_tag_teams`
  ADD PRIMARY KEY (`tag_team_id`),
  ADD UNIQUE KEY `tag_team` (`tag_team`);

--
-- Indexes for table `roster_tag_team_wrestlers`
--
ALTER TABLE `roster_tag_team_wrestlers`
  ADD PRIMARY KEY (`wrestler_id`),
  ADD UNIQUE KEY `wrestler_id` (`wrestler_id`) USING BTREE,
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `tagteam` (`member_of`);

--
-- Indexes for table `team_records`
--
ALTER TABLE `team_records`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `idx_team_records_wrestler1` (`wrestler1_id`),
  ADD KEY `idx_team_records_wrestler2` (`wrestler2_id`);

--
-- Indexes for table `wrestler_moves`
--
ALTER TABLE `wrestler_moves`
  ADD PRIMARY KEY (`wrestler_id`,`move_id`),
  ADD KEY `move_id` (`move_id`),
  ADD KEY `wrestler_id` (`wrestler_id`),
  ADD KEY `wrest_name` (`wrestler_name`);

--
-- Indexes for table `wrestler_records`
--
ALTER TABLE `wrestler_records`
  ADD PRIMARY KEY (`wrestler_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `all_moves`
--
ALTER TABLE `all_moves`
  MODIFY `move_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=282;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `moves`
--
ALTER TABLE `moves`
  MODIFY `move_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for the move', AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `roster`
--
ALTER TABLE `roster`
  MODIFY `wrestler_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `roster_tag_teams`
--
ALTER TABLE `roster_tag_teams`
  MODIFY `tag_team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `roster_tag_team_wrestlers`
--
ALTER TABLE `roster_tag_team_wrestlers`
  MODIFY `wrestler_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`player1_id`) REFERENCES `wrestler_records` (`wrestler_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`player2_id`) REFERENCES `wrestler_records` (`wrestler_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`single_winner_id`) REFERENCES `wrestler_records` (`wrestler_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_4` FOREIGN KEY (`single_loser_id`) REFERENCES `wrestler_records` (`wrestler_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_5` FOREIGN KEY (`team1_player1_id`) REFERENCES `wrestler_records` (`wrestler_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_6` FOREIGN KEY (`team1_player2_id`) REFERENCES `wrestler_records` (`wrestler_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_7` FOREIGN KEY (`team2_player1_id`) REFERENCES `wrestler_records` (`wrestler_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_8` FOREIGN KEY (`team2_player2_id`) REFERENCES `wrestler_records` (`wrestler_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `roster_tag_team_wrestlers`
--
ALTER TABLE `roster_tag_team_wrestlers`
  ADD CONSTRAINT `tagteam` FOREIGN KEY (`member_of`) REFERENCES `roster_tag_teams` (`tag_team`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team_records`
--
ALTER TABLE `team_records`
  ADD CONSTRAINT `team_records_ibfk_1` FOREIGN KEY (`wrestler1_id`) REFERENCES `wrestler_records` (`wrestler_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `team_records_ibfk_2` FOREIGN KEY (`wrestler2_id`) REFERENCES `wrestler_records` (`wrestler_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wrestler_moves`
--
ALTER TABLE `wrestler_moves`
  ADD CONSTRAINT `wrest_name` FOREIGN KEY (`wrestler_name`) REFERENCES `roster` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wrestler_moves_ibfk_1` FOREIGN KEY (`move_id`) REFERENCES `moves` (`move_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wrst_id` FOREIGN KEY (`wrestler_id`) REFERENCES `roster` (`wrestler_id`) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
