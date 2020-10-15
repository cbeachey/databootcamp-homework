import csv

votes = []
candidate = []
vote_count = {}
percentage = {}

total_votes = 0

with open('election_data.csv') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)

    for row in csvreader:
        total_votes += 1
       # if total_votes == 10:
        #    break
        if row[2] not in candidate:
            candidate.append(row[2])     

        if row[2] not in vote_count:
            vote_count[row[2]]=1
        
        else:
           vote_count[row[2]] += 1

            
         


print(f'Election Results')
print(f'-------------------------')
print(f'Total Votes: {total_votes}') 
print(f'-------------------------')
print(vote_count)