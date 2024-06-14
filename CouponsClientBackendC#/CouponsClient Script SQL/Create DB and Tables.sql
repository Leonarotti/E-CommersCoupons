USE master
GO
--DROP DATABASE CouponsClientBD
CREATE DATABASE CouponsClientBD
GO
USE CouponsClientBD
GO
CREATE TABLE client (
    id_client INT PRIMARY KEY IDENTITY,
    dni VARCHAR(12) UNIQUE NOT NULL,
    [name] VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    birth_date DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    [password] NVARCHAR(MAX) NOT NULL
);

CREATE TABLE sale (
    id_sale INT PRIMARY KEY IDENTITY,
    id_client INT NOT NULL FOREIGN KEY REFERENCES client(id_client),
	card_number varchar(30) NOT NULL,
    sale_date DATETIME NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE sale_detail (
    id_sale_detail INT PRIMARY KEY IDENTITY,
    id_sale INT NOT NULL FOREIGN KEY REFERENCES sale(id_sale),
    id_coupon INT NOT NULL,
	regular_price DECIMAL(10, 2) NOT NULL,
	[percentage] INT NOT NULL,
	quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);
