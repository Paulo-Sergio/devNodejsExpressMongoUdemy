-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: portal_noticias_nodejs
-- ------------------------------------------------------
-- Server version	5.7.11

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
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `noticias` (
  `id_noticia` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) CHARACTER SET latin1 NOT NULL,
  `noticia` text CHARACTER SET latin1 NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `resumo` varchar(100) CHARACTER SET latin1 NOT NULL,
  `autor` varchar(30) CHARACTER SET latin1 NOT NULL,
  `data_noticia` date DEFAULT NULL,
  PRIMARY KEY (`id_noticia`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticias`
--

LOCK TABLES `noticias` WRITE;
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
INSERT INTO `noticias` VALUES (1,'Titulo da notícia','Conteudo da notícia','2017-02-12 17:45:33','aaaaaaaaaaaaaaa','teste','2017-01-29'),(2,'outra notícia','conteudo da outra notícias','2017-02-12 17:53:42','resumooooooo','frança','2016-12-12'),(3,'Teste','teste conteudo da noticia','2017-02-12 22:17:32','bvcvdbfn','looool','2017-02-01'),(6,'testesetset','fahusahuashausahsuahsuashaushasuahsaushaush hsuashaushausha uhsuahsuahsuah','2017-02-15 00:09:08','meu resumo','Paulo França','2017-02-14'),(7,'jhtgdhedr','hfdgsfbhfs','2017-02-15 00:18:38','hergegbsfgs','hdtghdffgsdf','2017-02-14'),(8,'Hterhehe','edafafaf','2017-02-15 00:40:18','hbdfghtdhbdfhg','sérgio','2017-02-15'),(9,'titulo teste','notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia notícia ','2017-02-15 23:40:26','resumão da noticia','pauloooo','2017-12-12');
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-25 15:57:09
