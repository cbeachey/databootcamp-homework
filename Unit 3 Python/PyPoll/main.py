import csv

votes = {}
candidate = []
vote_count = {}


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
        
    vote_percentages = {}
    for key in vote_count.keys():
        vote_list = []
        vote_list.append(vote_count[key]/total_votes * 100)
        vote_list.append(vote_count[key])
        vote_percentages[key] = vote_list

winner = max((candidate), key = candidate.count)

print(f'Election Results')
print(f'-------------------------')
print(f'Total Votes: {total_votes}') 
print(f'-------------------------')
#print(vote_count)
for key in vote_percentages:
    print(f"{key}: {vote_percentages[key][0]}% ({vote_percentages[key][1]})")
print(f'-------------------------')
print(f'Winner: {winner}')
print(f'-------------------------')


with open('Output.csv', 'w', newline='') as outputfile: 
    csvwriter = csv.writer(outputfile)
    csvwriter.writerow([f'Election Results'])
    csvwriter.writerow([f'-------------------------'])
    csvwriter.writerow([f'Total Votes: {total_votes}']) 
    csvwriter.writerow([f'-------------------------'])
    for key in vote_percentages:
        csvwriter.writerow([f"{key}: {vote_percentages[key][0]}% ({vote_percentages[key][1]})"])
    csvwriter.writerow([f'-------------------------'])
    csvwriter.writerow([f'Winner: {winner}'])
    csvwriter.writerow([f'-------------------------'])