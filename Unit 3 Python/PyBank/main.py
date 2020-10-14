import csv

months = []
profit_loss = []

total_months = 0
totalrev = 0
previous_month = 0
current_month = 0

with open('budget_data.csv') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)
    
    for row in csvreader:   

        total_months += 1
        revenue = float(row[1])     
        totalrev += revenue


print("Financial Analysis")
print("----------------------------")
print(f"Total Months: {total_months}")    
print(f"Total: ${totalrev}")