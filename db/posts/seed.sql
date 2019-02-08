create table posts (
    post_id serial primary key,
    user_id integer references users(id),
    post_text text
)