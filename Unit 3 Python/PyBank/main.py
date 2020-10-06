import csv

with open('budget_data.csv') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    
    header = next(csvreader)
    row_count = sum(1 for row in csvreader)
    print(f"Total Months: {row_count}")
        

        
    