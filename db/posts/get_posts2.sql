select * 
from users u
join posts p on u.id=p.user_id
where u.id=$1;
