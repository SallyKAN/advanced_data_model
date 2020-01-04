# About This Project
This is for my subject project of advanced data model, in which course we have studied several advanced data models used as solutions in NoSQL data management systems nowadays. Here we mainly focuse on MongoDB and Neo4j, we are given a real world data set in Question and Answer area and a set of target queries. The data set comes from the Artificial
Intelligence Stack Exchange question and answer site (https://ai.stackexchange.com/). The dump is released and maintained by stackexchange: https://archive.org/details/stackexchange. The data files and the description can be found in `data_description.txt` , the target queries are listed as below:
- [Q1] Find the question that attracts most discussions in a given topic; We measure
the intensity of discussion by the total number of answers and comments in a question.
- [Q2] Find the user with the highest UpVote number in a given topic, return the user’s
name and UpVote number. Any user who has posted a question,an answered or a
comment in this topic are candidate users.
- [Q3] For a given topic, discover the questions that are hardest to answer. Here we
measure the difficulty of question by the time it takes to receive an accepted answer.
Questions that do not have an accepted answer will be ignored.
- [Q4] Discover questions with arguable accepted answer. Users can give upVote to both
question and answer. Usually the accepted answer of a question receives the highest
number of upVote among all answers of this question. In rare case, another answer(s)
may receive higher upVote count than the upVote count of the accepted answer. In
this query, you are asked to discover such questions whose accepted answer has less
upVote than the upVote counts of its other answers. Note We are only interested in
questions with at least 5 answers.
- [Q5] Given a time period as indicated by starting and ending date, find the top 5
topics in that period. We rank a topic by the number of users participated in that
topic during the period. Posting question, answering or commenting are all considered
as participation.
- [Q6] Find the top 5 co-authors of a given user. Consider all users involved in a
question as co-authors. This include users posting the question, answering the question
or making comments on either question or answers. For a given user, we rank the
coauthors by the number of questions this user and the coauthor appear together.

# Requirements
## Running Environment 
- Ubuntu 16+
- MongoDB shell version v4.0.11+
- MongoDB db version v4.0.11+
- neo4j 3.5.9+
- Cypher-Shell 1.1.2-alpha01+
- Python 2.7 + or Python 3.6

# Preprocess Data
1. `cd  ./preprocess_scripts/`
2. run command: 
`python ./preprocess.py`
Please change the path in `preprocess.py` to preprocess data:
```
path_prefix = "../data/"
```
Please make sure your data directory has a structure like this:
```
- data/
    - Comments.csv
    - xx.csv
    - xx.csv
```
3. The data will be generated under `../data/`
as `comments_propressed.csv`, `posts_propressed.csv`, `users_propressed.csv`, `votes_propressed.csv`

# Import data to mongoDB

1. Make sure you start the server
 
 `sudo service mongod start`

2. `cd ./mongo/`
2. Change the data path in the bash shell script `import.sh`
```
PREFIX="/home/snape/comp5338_assignments/data/"
```
3. Make the script executable : `chmod +x ./import.sh`

4. Run command: `./import.sh`
- Please make sure the database name `comp5338` used in script hasn't existed before
somehow the `mongoimport` won't overwrite the databases existed, and that might cause error in the later processing
- `creating user_post collection...` could take few minutes, please don't exit during the processing

# Import data to Neo4j
1. Make sure you start the neo4j server
`neo4j start`

2. You need to copy all the preprocessed data into the neo4j import directory
`cp ./path_to_data/*_processed.csv  ./$NEO4J_HOME/import/`

3. Make sure you set environment variables for running `cypher-shell`
```
export NEO4J_USERNAME=neo4j
export NEO4J_PASSWORD=neo4j
```
Please cahnge to your own username and password
or you can specify the `-u USERNAME -p PASSWORD` for the following commands

4. Run command to import
`cat create_schema | cypher-shell`

If you meet an error, it's mostly caused by the file name in the data path)
Please change in the load csv line
`LOAD CSV WITH HEADERS FROM "file:///Votes.csv" AS row` to `LOAD CSV WITH HEADERS FROM "file:///votes_processed.csv" AS row`
`LOAD CSV WITH HEADERS FROM "file:///Comments.csv" AS row` to `LOAD CSV WITH HEADERS FROM "file:///comments_processed.csv" AS row`

# Test queries in MongoDB
1. Run command: `mongo < Q1.js` 

# Test queries in Neo4j
1. Run command: `cypher-shell < Q1` (Please make sure the username and password of Neo4j are set as environment variables)


