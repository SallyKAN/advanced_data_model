use comp5338;
db.user_post.aggregate(
[
	{
		"$match" : {
			"CreationDate" : {
				"$gte" : ISODate("2000-04-29T00:00:00Z"),
				"$lt" : ISODate("2020-05-01T00:00:00Z")
			}
		}
	},
	{
		"$project" : {
			"TagName" : {
				"$split" : [
					"$Tags",
					","
				]
			},
			"PostId" : 1,
			"UserId" : 1,
			"CreationDate" : 1
		}
	},
	{
		"$unwind" : "$TagName"
	},
	{
		"$group" : {
			"_id" : "$TagName",
			"userIdSet" : {
				"$addToSet" : "$UserId"
			}
		}
	},
	{
		"$project" : {
			"_id" : 0,
			"topic" : "$_id",
			"userNumber" : {
				"$size" : "$userIdSet"
			}
		}
	},
	{
		"$sort" : {
			"userNumber" : -1
		}
	},
	{
		"$limit" : 5
	}
])
