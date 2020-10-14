import csv

votes = []

total_votes = 0

with open('election_data.csv') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)

    for row in csvreader:
       total_votes += 1

print(f'Election Results')
print(f'-------------------------')
print(f'Total Votes: {total_votes}') 
print(f'-------------------------')

