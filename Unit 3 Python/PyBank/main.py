import csv

with open('budget_data.csv') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        print(row[0])
    