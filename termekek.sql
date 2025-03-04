-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 04. 19:30
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webshoppp`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termekek`
--

CREATE TABLE `termekek` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `termekleiras` text DEFAULT NULL,
  `ar` int(11) NOT NULL,
  `kategoria` int(11) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `termekek`
--

INSERT INTO `termekek` (`id`, `nev`, `termekleiras`, `ar`, `kategoria`, `imageUrl`) VALUES
(1, 'Fehér nadrág', 'Kényelmes fehér nadrág', 5000, 2, 'fehgatya.png'),
(2, 'Fehér póló', 'Klasszikus fehér póló', 3500, 4, 'fehpolo.png'),
(3, 'Fehér pulóver', 'Meleg fehér pulóver', 7500, 5, 'fehpull.png'),
(4, 'Kék nadrág', 'Kényelmes kék nadrág', 5000, 2, 'kekgatya.png'),
(5, 'Kék póló', 'Klasszikus kék póló', 3500, 4, 'kekpolo.png'),
(6, 'Kék pulóver', 'Meleg kék pulóver', 7500, 5, 'kekpull.png'),
(7, 'Fekete nadrág', 'Kényelmes fekete nadrág', 5000, 2, 'fekgatya.png'),
(8, 'Fekete póló', 'Klasszikus fekete póló', 3500, 4, 'fekpolo.png'),
(9, 'Fekete pulóver', 'Meleg fekete pulóver', 7500, 5, 'fekpull.png'),
(10, 'Zöld nadrág', 'Kényelmes zöld nadrág', 5000, 2, 'zoldgatya.png'),
(11, 'Zöld póló', 'Klasszikus zöld póló', 3500, 4, 'zoldpolo.png'),
(12, 'Zöld pulóver', 'Meleg zöld pulóver', 7500, 5, 'zoldpull.png'),
(13, 'Bézs nadrág', 'Kényelmes bézs nadrág', 5000, 2, 'bezsgatya.png'),
(14, 'Bézs póló', 'Klasszikus bézs póló', 3500, 4, 'bezspolo.png'),
(15, 'Bézs pulóver', 'Meleg bézs pulóver', 7500, 5, 'bezspull.png');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategoria` (`kategoria`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `termekek`
--
ALTER TABLE `termekek`
  ADD CONSTRAINT `termekek_ibfk_1` FOREIGN KEY (`kategoria`) REFERENCES `kategoriak` (`cs_azonosito`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
