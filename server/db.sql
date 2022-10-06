drop database if exists todo;

create database if not exists todo;

use todo;

create table task (
    id int primary key auto_increment,
    description varchar(255) not null
);

insert into task (description) values ("This is my test task");
insert into task (description) values ("This is another test task");