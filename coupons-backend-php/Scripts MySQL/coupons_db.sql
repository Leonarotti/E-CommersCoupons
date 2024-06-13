-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2024 a las 00:29:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `coupons_db`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spDisableCouponsAndPromotionsByCategoryId` (IN `categoryId` INT)   BEGIN
    -- Deshabilitar cupones asociados a la categoría
    UPDATE coupon
    SET is_enabled = 0
    WHERE id_category = categoryId;

    -- Deshabilitar promociones asociadas a esos cupones
    UPDATE promotion
    SET is_enabled = 0
    WHERE id_coupon IN (
        SELECT id_coupon
        FROM coupon
        WHERE id_category = categoryId
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spDisableCouponsAndPromotionsByEnterpriseId` (IN `enterpriseId` INT)   BEGIN
    -- Deshabilitar cupones asociados a la empresa
    UPDATE coupon
    SET is_enabled = 0
    WHERE id_enterprise = enterpriseId;

    -- Deshabilitar promociones asociadas a esos cupones
    UPDATE promotion
    SET is_enabled = 0
    WHERE id_coupon IN (
        SELECT id_coupon
        FROM coupon
        WHERE id_enterprise = enterpriseId
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spDisablePromotionsByCouponId` (IN `id_coupon` INT)   BEGIN
    UPDATE promotion
    SET is_enabled = 0
    WHERE id_coupon = id_coupon;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetCouponsWithDetails` ()   BEGIN
    SELECT 
        c.id_coupon,
        c.id_enterprise,
        e.name AS enterprise,
        c.id_category,
        cat.name AS category,
        c.name,
        c.img,
        c.location,
        c.regular_price,
        c.percentage + IFNULL(SUM(p.percentage), 0) AS total_percentage,
        c.start_date,
        c.end_date,
        c.is_enabled
    FROM 
        coupon c
    JOIN 
        enterprise e ON c.id_enterprise = e.id_enterprise
    JOIN 
        category cat ON c.id_category = cat.id_category
    LEFT JOIN 
        promotion p ON c.id_coupon = p.id_coupon 
            AND p.is_enabled = 1 
            AND CURDATE() BETWEEN p.start_date AND p.end_date
    WHERE 
        c.is_enabled = 1 
        AND CURDATE() BETWEEN c.start_date AND c.end_date
    GROUP BY 
        c.id_coupon,
        c.id_enterprise,
        e.name,
        c.id_category,
        cat.name,
        c.name,
        c.img,
        c.location,
        c.regular_price,
        c.percentage,
        c.start_date,
        c.end_date,
        c.is_enabled;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetCouponWithDetailsById` (IN `id_coupon` INT)   BEGIN
    SELECT 
        c.id_coupon,
        c.id_enterprise,
        e.name AS enterprise,
        c.id_category,
        cat.name AS category,
        c.name,
        c.img,
        c.location,
        c.regular_price,
        c.percentage,
        c.start_date,
        c.end_date,
        c.is_enabled
    FROM 
        coupon c
    JOIN 
        enterprise e ON c.id_enterprise = e.id_enterprise
    JOIN 
        category cat ON c.id_category = cat.id_category
	WHERE 
        c.id_coupon = id_coupon;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_category`, `name`, `is_enabled`) VALUES
(1, 'Gastronomía', 1),
(2, 'Turismo', 1),
(3, 'Entretenimiento', 1),
(4, 'x', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coupon`
--

CREATE TABLE `coupon` (
  `id_coupon` int(11) NOT NULL,
  `id_enterprise` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `img` varchar(255) NOT NULL,
  `location` varchar(200) NOT NULL,
  `regular_price` decimal(10,2) NOT NULL,
  `percentage` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `coupon`
--

INSERT INTO `coupon` (`id_coupon`, `id_enterprise`, `id_category`, `name`, `img`, `location`, `regular_price`, `percentage`, `start_date`, `end_date`, `is_enabled`) VALUES
(1, 3, 1, 'Cupón para restaurante X', 'https://res.cloudinary.com/dog4dmw2v/image/upload/v1718308508/CouponsImages/myluz5hqftxc7unfonyk.jpg', 'Italia', 12000.00, 10, '2024-06-04', '2024-06-15', 1),
(2, 3, 1, 'Cupón para restaurante Z', 'https://res.cloudinary.com/dog4dmw2v/image/upload/v1717404243/CouponsImages/txcx838fsnchfbaobxvw.png', 'Z', 10000.00, 8, '2024-06-07', '2024-06-28', 1),
(3, 8, 1, 'Cupón para restaurante Y', 'https://res.cloudinary.com/dog4dmw2v/image/upload/v1718299638/CouponsImages/ffoyxcinxdgm9yl2eisf.jpg', 'Y', 1000.78, 5, '2024-06-05', '2024-06-22', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enterprise`
--

CREATE TABLE `enterprise` (
  `id_enterprise` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `license` varchar(13) NOT NULL,
  `date_created` date NOT NULL,
  `phone` varchar(9) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `enterprise`
--

INSERT INTO `enterprise` (`id_enterprise`, `name`, `address`, `license`, `date_created`, `phone`, `email`, `password`, `is_enabled`) VALUES
(3, 'Tesla', 'San Jose', '12-345-678909', '2024-05-01', '8489-9918', 'leon.pereira15@gmail.com', '123', 1),
(8, 'Gama', 'Cartago, Turrialba', '12-3456-7890', '2024-04-30', '8489-9918', 'leon.pereira15@gmail.com', '12345', 1),
(17, 'Prueba 1', 'Cartago', '12-3456-7894', '2024-05-01', '8489-9917', 'leon.pereira15@gmail.com', '123', 0),
(21, 'Empresa Ejemplo', '123 Calle X', '12-4568-1234', '2023-05-29', '1234-5678', 'empresa@ejemplo.com', '123456', 0),
(24, 'Prueba 2', 'San José', '12-345-678900', '2024-05-01', '8489-9917', 'leon.pereira15@gmail.com', '123', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promotion`
--

CREATE TABLE `promotion` (
  `id_promotion` int(11) NOT NULL,
  `id_coupon` int(11) NOT NULL,
  `percentage` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_enabled` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `promotion`
--

INSERT INTO `promotion` (`id_promotion`, `id_coupon`, `percentage`, `start_date`, `end_date`, `is_enabled`) VALUES
(1, 1, 5, '2024-06-11', '2024-06-15', 1),
(2, 1, 5, '2024-06-11', '2024-06-15', 0),
(3, 2, 3, '2024-06-08', '2024-06-20', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id_coupon`),
  ADD KEY `id_enterprise` (`id_enterprise`),
  ADD KEY `id_category` (`id_category`);

--
-- Indices de la tabla `enterprise`
--
ALTER TABLE `enterprise`
  ADD PRIMARY KEY (`id_enterprise`),
  ADD UNIQUE KEY `license` (`license`);

--
-- Indices de la tabla `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id_promotion`),
  ADD KEY `id_coupon` (`id_coupon`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id_coupon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `enterprise`
--
ALTER TABLE `enterprise`
  MODIFY `id_enterprise` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id_promotion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `coupon`
--
ALTER TABLE `coupon`
  ADD CONSTRAINT `coupon_ibfk_1` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprise` (`id_enterprise`),
  ADD CONSTRAINT `coupon_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`);

--
-- Filtros para la tabla `promotion`
--
ALTER TABLE `promotion`
  ADD CONSTRAINT `promotion_ibfk_1` FOREIGN KEY (`id_coupon`) REFERENCES `coupon` (`id_coupon`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
