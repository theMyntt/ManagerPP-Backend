-- DEFAULT DB
drop database if exists manager_db;
create database manager_db;
use manager_db;

create table users(
	id varchar(255) not null,
    access_code varchar(7) not null,
    name varchar(80) not null,
    email varchar(90) not null,
    password varchar(255) not null,
    createdAt date not null,
    updatedAt date not null,
    primary key (id),
    unique(access_code)
);

insert into users values
	('311e6eda-266e-4423-98e2-236b01fd6fee', '12345678', 'ADMIN1', 'ADMIN', 'admin@admin.org', curdate(), curdate());

create table corporation(
	id varchar(255) not null,
    name varchar(255) not null,
    email varchar(80) not null,
    phone varchar(20),
    primary key (id),
    unique(name, email, phone)
);

-- TEST DB
drop database if exists manager_db_test;
create database manager_db_test;
use manager_db_test;

create table users(
	id varchar(255) not null,
    access_code varchar(7) not null,
    name varchar(80) not null,
    email varchar(90) not null,
    password varchar(255) not null,
    createdAt date not null,
    updatedAt date not null,
    primary key (id),
    unique(access_code)
);

create table corporation(
	id varchar(255) not null,
    name varchar(255) not null,
    email varchar(80) not null,
    phone varchar(20),
    primary key (id),
    unique(name, email, phone)
);

select * from users;