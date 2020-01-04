use comp5338;
db.user_post.aggregate(
[
	{
		"$group" : {
			"_id" : "$UserId",
			"PostIdSet" : {
				"$addToSet" : "$PostId"
			}
		}
	},
	{
		"$project" : {
			"_id" : 0,
			"UserId" : "$_id",
			"PostIdSet" : 1
		}
	},
	{
		"$lookup" : {
			"from" : "user_post",
			"let" : {
				"lookupUserId" : 8
			},
			"pipeline" : [
				{
					"$match" : {
						"$expr" : {
							"$eq" : [
								"$UserId",
								"$$lookupUserId"
							]
						}
					}
				},
				{
					"$group" : {
						"_id" : "$UserId",
						"PostIdSet" : {
							"$addToSet" : "$PostId"
						}
					}
				},
				{
					"$project" : {
						"_id" : 0,
						"PostIdSet" : 1
					}
				}
			],
			"as" : "lookupUser"
		}
	},
	{
		"$unwind" : "$lookupUser"
	},
	{
		"$project" : {
			"UserId" : 1,
			"co_posts_number" : {
				"$size" : {
					"$setIntersection" : [
						"$PostIdSet",
						"$lookupUser.PostIdSet"
					]
				}
			}
		}
	},
	{
		"$match" : {
			"UserId" : {
				"$ne" : 8
			}
		}
	},
	{
		"$sort" : {
			"co_posts_number" : -1
		}
	},
	{
		"$limit" : 5
	}
])
