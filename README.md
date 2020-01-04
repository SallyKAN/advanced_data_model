#Requirements
##Running Environment 
- Ubuntu 16+
- MongoDB shell version v4.0.11+
- MongoDB db version v4.0.11+
- neo4j 3.5.9+
- Cypher-Shell 1.1.2-alpha01+
- Python 2.7 + or Python 3.6

#Preprocess Data
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

#Import data to mongoDB

1. Make sure you start the server
 
 `sudo service mongod start`

2. `cd ./mongo/`
2. Change the data path in the bash shell script `import.sh`
```
PREFIX="/home/snape/comp5338_assignments/data/"
```
3. Make the script executable : `chmod +x ./import.sh`

4. run command: `./import.sh`
- Please make sure the database name `comp5338` used in script hasn't existed before
somehow the `mongoimport` won't overwrite the databases existed, and that might cause error in the later processing
- `creating user_post collection...` could take few minutes, please don't exit during the processing

#Import data to Neo4j
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

If you meet an error, it's mostly caused by the file name in the data path, sorry about that(I'm in such a hurry to submit (T _ T)  )
Please change in the load csv line
`LOAD CSV WITH HEADERS FROM "file:///Votes.csv" AS row` to `LOAD CSV WITH HEADERS FROM "file:///votes_processed.csv" AS row`
`LOAD CSV WITH HEADERS FROM "file:///Comments.csv" AS row` to `LOAD CSV WITH HEADERS FROM "file:///comments_processed.csv" AS row`

#Test queries in MongoDB
1. Run command: `mongo < Q1.js` 

#Test queries in Neo4j
1. Run command: `cypher-shell < Q1` (Please make sure the username and password of are set as environment variable)


