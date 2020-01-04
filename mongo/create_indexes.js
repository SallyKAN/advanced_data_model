use comp5338;
db.posts.createIndex({Id:1});
db.votes.createIndex({PostId:1});
db.users.createIndex({Id:1});
db.comments.createIndex({PostId:1});


