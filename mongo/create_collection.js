use comp5338;
db.posts.aggregate(
[
	{
		"$match" : {
			"PostTypeId" : 1
		}
	},
	{
		"$lookup" : {
			"from" : "posts",
			"let" : {
				"postId" : "$Id"
			},
			"pipeline" : [
				{
					"$match" : {
						"$expr" : {
							"$eq" : [
								"$ParentId",
								"$$postId"
							]
						}
					}
				},
				{
					"$project" : {
						"_id" : 0,
						"Id" : 1,
						"OwnerUserId" : 1,
						"CreationDate" : 1
					}
				}
			],
			"as" : "answers"
		}
	},
	{
		"$unwind" : "$answers"
	},
	{
		"$lookup" : {
			"from" : "comments",
			"let" : {
				"postId" : "$Id",
				"answerId" : "$answers.Id"
			},
			"pipeline" : [
				{
					"$match" : {
						"$expr" : {
							"$or" : [
								{
									"$eq" : [
										"$PostId",
										"$$postId"
									]
								},
								{
									"$eq" : [
										"$PostId",
										"$$answerId"
									]
								}
							]
						}
					}
				}
			],
			"as" : "comments"
		}
	},
	{
		"$unwind" : "$comments"
	},
	{
		"$group" : {
			"_id" : "$Id",
			"Tags" : {
				"$first" : "$Tags"
			},
			"questions" : {
				"$addToSet" : {
					"UserId" : "$OwnerUserId",
					"CreationDate" : "$CreationDate"
				}
			},
			"answers" : {
				"$addToSet" : {
					"UserId" : "$answers.OwnerUserId",
					"CreationDate" : "$answers.CreationDate"
				}
			},
			"comments" : {
				"$addToSet" : {
					"UserId" : "$comments.UserId",
					"CreationDate" : "$comments.CreationDate"
				}
			}
		}
	},
	{
		"$project" : {
			"_id" : 0,
			"PostId" : "$_id",
			"Tags" : 1,
			"participation" : {
				"$concatArrays" : [
					"$questions",
					"$answers",
					"$comments"
				]
			}
		}
	},
	{
		"$unwind" : "$participation"
	},
	{
		"$project" : {
			"PostId" : 1,
			"Tags" : 1,
			"UserId" : "$participation.UserId",
			"CreationDate" : "$participation.CreationDate"
		}
	},
	{
		"$out" : "user_post"
	}
])
