create table users(
    id serial primary key,
    username varchar(20) not null unique,
    password varchar not null,
    profile_pic varchar
)