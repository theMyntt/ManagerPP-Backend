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
	('311e6eda-266e-4423-98e2-236b01fd6fee', 'ADMIN1', 'ADMIN', 'admin@admin.org', '12345678', curdate(), curdate());

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