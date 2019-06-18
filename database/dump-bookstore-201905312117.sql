-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: bookstore
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.40-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` int(11) NOT NULL,
  `title` varchar(1086) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `isbn` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`id`) REFERENCES `authors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_books`
--

DROP TABLE IF EXISTS `genre_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre_books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bookId` (`book_id`),
  KEY `FK_genreId` (`genre_id`),
  CONSTRAINT `FK_bookId` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FK_genreId` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_books`
--

LOCK TABLES `genre_books` WRITE;
/*!40000 ALTER TABLE `genre_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `genre_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Action fiction','2019-05-30 22:00:00','2019-05-30 22:00:00'),(2,'Adventure','2019-05-30 22:00:00','2019-05-30 22:00:00'),(3,'Comic','2019-05-30 22:00:00','2019-05-30 22:00:00'),(4,'Crime','2019-05-30 22:00:00','2019-05-30 22:00:00'),(5,'Docufiction','2019-05-30 22:00:00','2019-05-30 22:00:00'),(6,'Epistolary','2019-05-30 22:00:00','2019-05-30 22:00:00'),(7,'Erotic','2019-05-30 22:00:00','2019-05-30 22:00:00'),(8,'Fantasy','2019-05-30 22:00:00','2019-05-30 22:00:00'),(9,'Fiction','2019-05-30 22:00:00','2019-05-30 22:00:00'),(10,'Gothic','2019-05-30 22:00:00','2019-05-30 22:00:00'),(11,'Historical','2019-05-30 22:00:00','2019-05-30 22:00:00'),(12,'Horror','2019-05-30 22:00:00','2019-05-30 22:00:00'),(13,'List of writing genres','2019-05-30 22:00:00','2019-05-30 22:00:00'),(14,'Magic realism','2019-05-30 22:00:00','2019-05-30 22:00:00'),(15,'Mystery','2019-05-30 22:00:00','2019-05-30 22:00:00'),(16,'Nautical','2019-05-30 22:00:00','2019-05-30 22:00:00'),(17,'Non-Fiction','2019-05-30 22:00:00','2019-05-30 22:00:00'),(18,'Paranoid','2019-05-30 22:00:00','2019-05-30 22:00:00'),(19,'Philosophical','2019-05-30 22:00:00','2019-05-30 22:00:00'),(20,'Picaresque','2019-05-30 22:00:00','2019-05-30 22:00:00'),(21,'Political','2019-05-30 22:00:00','2019-05-30 22:00:00'),(22,'Psychological','2019-05-30 22:00:00','2019-05-30 22:00:00'),(23,'Romance','2019-05-30 22:00:00','2019-05-30 22:00:00'),(24,'Saga','2019-05-30 22:00:00','2019-05-30 22:00:00'),(25,'Satire','2019-05-30 22:00:00','2019-05-30 22:00:00'),(26,'Science','2019-05-30 22:00:00','2019-05-30 22:00:00'),(27,'Speculative','2019-05-30 22:00:00','2019-05-30 22:00:00'),(28,'Superhero','2019-05-30 22:00:00','2019-05-30 22:00:00'),(29,'Thriller','2019-05-30 22:00:00','2019-05-30 22:00:00'),(30,'Urban','2019-05-30 22:00:00','2019-05-30 22:00:00'),(31,'Western','2019-05-30 22:00:00','2019-05-30 22:00:00');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'bookstore'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-31 21:17:55
