use comp5338;
db.posts.find().forEach(function(doc){ doc.CreationDate = new ISODate(doc.CreationDate); db.posts.save(doc) });
db.votes.find().forEach(function(doc){ doc.CreationDate = new ISODate(doc.CreationDate); db.votes.save(doc) });
db.comments.find().forEach(function(doc){ doc.CreationDate = new ISODate(doc.CreationDate); db.comments.save(doc) });

