select * 
from users u
join posts p on u.id=p.user_id
where p.post_id=$1;