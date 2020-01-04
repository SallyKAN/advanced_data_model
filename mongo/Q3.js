use comp5338;
db.posts.aggregate(
[
	{
		"$match" : {
			"PostTypeId" : 1,
			"Tags" : {
				"$regex" : /philosophy/,
				"$options" : "si"
			},
			"AcceptedAnswerId" : {
				"$exists" : true,
				"$ne" : ""
			}
		}
	},
	{
		"$lookup" : {
			"from" : "posts",
			"localField" : "AcceptedAnswerId",
			"foreignField" : "Id",
			"as" : "AcceptedAnswer"
		}
	},
	{
		"$unwind" : "$AcceptedAnswer"
	},
	{
		"$project" : {
			"_id" : 0,
			"Id" : 1,
			"PostTypeId" : 1,
			"AcceptedAnswerId" : 1,
			"CreationDate" : 1,
			"OwnerUserId" : 1,
			"Tags" : 1,
			"AnswerCount" : 1,
			"CommentCount" : 1,
			"created" : "$CreationDate",
			"accepted" : "$AcceptedAnswer.CreationDate"
		}
	},
	{
		"$project" : {
			"Id" : 1,
			"PostTypeId" : 1,
			"AcceptedAnswerId" : 1,
			"CreationDate" : 1,
			"OwnerUserId" : 1,
			"Tags" : 1,
			"AnswerCount" : 1,
			"CommentCount" : 1,
			"duration" : {
				"$subtract" : [
					"$accepted",
					"$created"
				]
			}
		}
	},
	{
		"$sort" : {
			"duration" : -1
		}
	},
	{
		"$project" : {
			"duration" : 0
		}
	},
	{
	$limit:1
	}
]).pretty()
