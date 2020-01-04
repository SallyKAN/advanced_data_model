use comp5338;

db.posts.aggregate([
	{
		"$match" : {
			"PostTypeId" : 2,
			"ParentId" : {
				"$exists" : true,
				"$ne" : ""
			}
		}
	},
	{
		"$lookup" : {
			"from" : "posts",
			"localField" : "ParentId",
			"foreignField" : "Id",
			"as" : "Parent"
		}
	},
	{
		"$unwind" : "$Parent"
	},
	{
		"$match" : {
			"Parent.AnswerCount" : {
				"$gte" : 5
			},
			"Parent.AcceptedAnswerId" : {
				"$exists" : true,
				"$ne" : ""
			}
		}
	},
	{
		"$lookup" : {
			"from" : "votes",
			"let" : {
				"postId" : "$Id"
			},
			"pipeline" : [
				{
					"$match" : {
						"$expr" : {
							"$and" : [
								{
									"$eq" : [
										"$PostId",
										"$$postId"
									]
								},
								{
									"$eq" : [
										"$VoteTypeId",
										2
									]
								}
							]
						}
					}
				},
				{
					"$group" : {
						"_id" : "$PostId",
						"voteNumber" : {
							"$sum" : 1
						}
					}
				}
			],
			"as" : "votes"
		}
	},
	{
		"$unwind" : "$votes"
	},
	{
		"$project" : {
			"_id" : 0,
			"AnswerId" : "$Id",
			"ParentId" : "$Parent.Id",
			"AcceptedAnswerId" : "$Parent.AcceptedAnswerId",
			"upVoteNumber" : "$votes.voteNumber",
			"isAccepted" : {
				"$cond" : {
					"if" : {
						"$ne" : [
							"$Parent.AcceptedAnswerId",
							"$Id"
						]
					},
					"then" : 0,
					"else" : 1
				}
			}
		}
	},
	{
		"$group" : {
			"_id" : "$ParentId",
			"maxUpVoteNumber" : {
				"$max" : "$upVoteNumber"
			},
			"answers" : {
				"$push" : {
					"AnswerId" : "$AnswerId",
					"upVoteNumber" : "$upVoteNumber",
					"isAccepted" : "$isAccepted"
				}
			}
		}
	},
	{
		"$project" : {
			"questionId" : "$_id",
			"maxUpVoteNumber" : 1,
			"answers" : 1
		}
	},
	{
		"$unwind" : "$answers"
	},
	{
		"$match" : {
			"answers.isAccepted" : {
				"$eq" : 1
			}
		}
	},
	{
		"$project" : {
			"_id" : 0,
			"questionId" : 1,
			"maxUpVoteNumber" : 1,
			"acceptedAnswerUpVoteNumber" : "$answers.upVoteNumber",
			"arguable" : {
				"$ne" : [
					"$answers.upVoteNumber",
					"$maxUpVoteNumber"
				]
			}
		}
	},
	{
		"$match" : {
			"arguable" : true
		}
	}
]).pretty()

