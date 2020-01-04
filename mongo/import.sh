#!/bin/bash

DB="comp5338"
mongo $DB --eval "db.dropDatabase()"
echo "drop $DB.."
echo

PREFIX="/home/snape/comp5338_assignments/data/"
TYPE="csv"
cd $PREFIX
for filename in $(ls | grep "processed.csv"); do
	#echo $filename
	collection=`echo -n $filename|cut -d'_' -f 1`
	echo $collection
	echo "import $collection ..."
	mongoimport --db $DB --collection $collection  --type $TYPE --headerline --file $PREFIX$filename
	echo "create $collection done"
	echo 
done

cd -
echo "converting date to ISO format..."
echo 
mongo --quiet < convert_date.js

echo "creating user_post collection..."
echo 
mongo < create_collection.js
echo "create user_post done"

echo "creating indexes..."
echo 
mongo < create_indexes.js



