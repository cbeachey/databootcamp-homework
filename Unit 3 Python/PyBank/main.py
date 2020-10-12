import csv

with open('budget_data.csv') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    totalrev = 0

    header = next(csvreader)
    row_count = sum(1 for row in csvreader)
    
    for row in csvreader:

        count += 1
        revenue = float(row[1])     
        totalrev += revenue

print(f"Total Months: {row_count}")
print(totalrev)