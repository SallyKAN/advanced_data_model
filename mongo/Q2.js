use comp5338;
db.posts.aggregate([
        {
                "$match" : {
                        "Tags" : {
                                "$regex" : /strong-ai/,
                                "$options" : "si"
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
                                }
                        ],
                        "as" : "vote"
                }
        },
        {
                "$lookup" : {
                        "from" : "users",
                        "localField" : "OwnerUserId",
                        "foreignField" : "Id",
                        "as" : "userInfo"
                }
        },
        {
                "$unwind" : "$userInfo"
        },
        {
                "$project" : {
                        "_id" : 0,
                        "userName" : "$userInfo.DisplayName",
                        "upVoteNumber" : {
                                "$size" : "$vote"
                        }
                }
        },
        {
                "$sort" : {
                        "upVoteNumber" : -1
                }
        },
	{
	"$limit":1
	}
])
