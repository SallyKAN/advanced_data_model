use comp5338;
db.posts.aggregate([ {$match:{Tags:{$regex:/philosophy/,$options:'si'},PostTypeId:1}}, {$project:{_id:0,Id:1,totalSum:{$add:["$CommentCount","$AnswerCount"]}}},{$sort:{"totalSum":-1}},{$limit:1}])
