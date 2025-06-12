CREATE DATABASE IF NOT EXISTS db_carro;
USE db_carro;

CREATE TABLE IF NOT EXISTS marcas (
	id INT AUTO_INCREMENT PRIMARY KEY,
 	nome VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS modelos (
	id INT AUTO_INCREMENT PRIMARY KEY,
 	nome VARCHAR(20) NOT NULL,
 	ano INT NOT NULL,
 	id_marcas INT,
 	FOREIGN KEY (id_marcas) REFERENCES marcas(id)
);

CREATE TABLE IF NOT EXISTS veiculos (
	id INT AUTO_INCREMENT PRIMARY KEY,
 	cor VARCHAR(25) NOT NULL,
 	preco DECIMAL(10, 2) NOT NULL,
 	marca VARCHAR(30),
 	modelo VARCHAR(30),
    foto VARCHAR(255),
 	quilometragem INT NOT NULL,
 	disponibilidade BOOL
);

INSERT INTO marcas (nome) VALUES ('Toyota');

INSERT INTO modelos (nome, ano, id_marcas) VALUES ('Corolla', 2020, 1);

INSERT INTO veiculos (cor, preco, marca, modelo, foto, quilometragem, disponibilidade)
VALUES ('Prata', 85000.00, 'Toyota', 'Corolla', 'https://via.placeholder.com/400x250?text=Corolla+2020', 45000, TRUE);