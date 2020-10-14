import csv

months = []
profit_loss_change = []

total_months = 0
totalrev = 0
profit_loss = 0
previous_month = 0
revenue = 0

with open('budget_data.csv') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)
    
    for row in csvreader:   

        total_months += 1
        revenue = float(row[1])     
        totalrev += revenue

        if (total_months==1):
            previous_month = revenue
            continue

        else:
            profit_loss = revenue - previous_month
            months.append(row[0])
            profit_loss_change.append(profit_loss)
            previous_month = revenue

        sum_profit = sum(profit_loss_change)
        avg_profit_loss = round(sum_profit/(total_months - 1), 2)

    greatest_increase = max(profit_loss_change)
    greatest_decrease = min(profit_loss_change)

    best_month = profit_loss_change.index(greatest_increase)
    worst_month = profit_loss_change.index(greatest_decrease)

    best_month_final = str(months[best_month])
    worst_month_final = str(months[worst_month])

print("Financial Analysis")
print("----------------------------")
print(f"Total Months: {total_months}")    
print(f"Total: ${totalrev}")
print(f"Average Change: {avg_profit_loss}")
print(best_month_final)