import csv
import datetime

# Please change this as the path of directory where you put data under
path_prefix = "../data/"


def convert_date(old_time):
    d = datetime.datetime.strptime(old_time, '%d/%m/%y %H:%M')
    new_time = datetime.date.strftime(d, "%Y-%m-%dT%H:%M:%S.000")
    return new_time


with open(path_prefix + 'Votes.csv', mode='r') as file, open(path_prefix + 'votes_processed.csv', mode='w') as output:
    reader = csv.reader(file, delimiter=',')
    headers = next(reader, None)
    writer = csv.writer(output, delimiter=',')
    headers = [headers[0], headers[1], headers[2], headers[3]]
    writer.writerow(headers)
    for row in reader:
        old_time = row[3]
        row[3] = convert_date(old_time)
        row = [row[0], row[1], row[2], row[3]]
        writer.writerow(row)
    print("Votes.csv processed done")

with open(path_prefix + 'Posts.csv', mode='r') as file, open(path_prefix + 'posts_processed.csv', mode='w') as output:
    reader = csv.reader(file, delimiter=',')
    headers = next(reader, None)
    writer = csv.writer(output, delimiter=',')
    headers = [headers[0], headers[1], headers[2], headers[3], headers[6], headers[11], headers[12],
               headers[13], headers[15]]
    writer.writerow(headers)
    for row in reader:
        creation_date = row[3]
        if '/' in creation_date:
            row[3] = convert_date(creation_date)
        row = [row[0], row[1], row[2], row[3], row[6], row[11], row[12], row[13], row[15]]
        writer.writerow(row)
    print("Posts.csv processed done.")

with open(path_prefix + 'Users.csv', mode='r') as file, open(path_prefix + 'users_processed.csv', mode='w') as output:
    reader = csv.reader(file, delimiter=',')
    headers = next(reader, None)
    writer = csv.writer(output, delimiter=',')
    headers = [headers[0], headers[3]]
    writer.writerow(headers)
    for row in reader:
        row = [row[0], row[3]]
        writer.writerow(row)
    print("Users.csv processed done.")

with open(path_prefix + 'Comments.csv', mode='r') as file, open(path_prefix + 'comments_processed.csv',
                                                                mode='w') as output:
    reader = csv.reader(file, delimiter=',')
    headers = next(reader, None)
    writer = csv.writer(output, delimiter=',')
    headers = [headers[0], headers[1], headers[3], headers[4]]
    writer.writerow(headers)
    for row in reader:
        creation_date = row[3]
        if '/' in creation_date:
            row[3] = convert_date(creation_date)
        row = [row[0], row[1], row[3], row[4]]
        writer.writerow(row)
    print("Comments.csv processed done.")
