'''
Goal: Calculate the Return on Investment (ROI) for a rental property

Program is intended for investors or individuals owning a property.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Step 1: Calculate the total monthly income
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
1.1 Rental income = no of units * monthly rent  $2000
1.2 Laundry     $0
1.3 Storage     $0
1.4 Misc        $0

Total monthly income = $2,000

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Step 2: Calculate the total monthly expenses
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
2.1 Tax         $150
2.2 Insurance   $100
2.3 Utilities   $0 (renters pay for all utilities)
2.3.1 Electric
2.3.2 Water
2.3.3 Sewer
2.3.4 Garbage
2.3.5 Gas
2.4 Home Owners Association (HOA) fees  $0 (not in HOA area)
2.5 Lawn/snow   $0
2.6 Vacancy (e.g., amnt time the property is vacant between renters )   $100 (5% of rent)
2.7 Repairs     $100
2.8 Property management     $299
2.9 mortgage = (selling price - deposit) * interest (e.g., 5% rate over 30 years)    $860 ($160,000 total)

Total monthly expenses = $1,610

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Step 3: Calculate monthly cash flow 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
~ how much extra cash you have

3.1 Monthly income (step 1)     $2000
3.2 Monthly expenses (step 2)   $1610

Total monthly cash flow = $390 (income - expenses)

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Step 4: Calculate the cash-on-cash return on investment (ROI)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
~ compare monthly cash flow to amnt of $ put into the property
~ way to see if the return on cash flow is good or not 

*4A Total amount invested into the property
-------------------------------------------
4A.1 Down payment   $40000 (20% of property value)
4A.2 Closing costs  $3000
4A.3 Rehab/repairs  $7000
4A.4 Misc           $0
Investment = $50,000

*4B Total annual cash flow
---------------------------
4B.2 Monthly cash flow (step 3)     $390
4B.1 No of months/year               12
Annual cash flow = $4,680

*4C CALCULATE ROI (!!!)
------------------------
Total annual cash flow ($4680) / total investment ($50000) * 100

--> ROI = 9.36%

'''
import time


# Abstract Base Class
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
from abc import ABCMeta
class ProfitLoss():
    def __init__(self) -> None:
        __metaclass__ = ABCMeta

    def run(self, time='', category='', category_type=''):
        adding = True
        while adding:
            value = input(f"What is your {time} {category_type} {category}? Please enter in $0.00 format. ").strip('$').replace(',','')
            try:
                float(value)
                break
            except:
                print("Invalid response.")
            adding = False
        return round(float(value),2)

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# Total monthly income
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# 1.1 Rental income = no of units * monthly rent  $2000
# 1.2 Laundry     $0
# 1.3 Storage     $0
# 1.4 Misc        $0
# Total monthly income = $2,000

class Income(ProfitLoss):         # Income is a component of class CashFlow
    def __init__(self) -> None:
        super().__init__()
        self.total_income = 0
    
    def __str__(self):
        return f"${round(float(self.total_income),2)}"

    def add_rent(self, rent):
        self.total_income += rent

    def add_laundry(self, laundry):
        self.total_income += laundry
    
    def add_storage(self, storage):
        self.total_income += storage
    
    def add_misc_income(self, miscincome):
        self.total_income += miscincome

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# Total monthly expenses
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# 2.1 Tax         $150
# 2.2 Insurance   $100
# 2.3 Utilities   $0 (renters pay for all utilities)
# 2.3.1 Electric
# 2.3.2 Water
# 2.3.3 Sewer
# 2.3.4 Garbage
# 2.3.5 Gas
# 2.4 Home Owners Association (HOA) fees  $0 (not in HOA area)
# 2.5 Lawn/snow   $0
# 2.6 Vacancy (e.g., amnt time the property is vacant between renters )   $100 (5% of rent)
# 2.7 Repairs     $100
# 2.8 Property management     $299
# 2.9 mortgage = (selling price - deposit) * interest (e.g., 5% rate over 30 years)    $860 ($160,000 total)
# Total monthly expenses = $1,610

class Expenses(ProfitLoss):       # Expenses is a component of class CashFlow
    def __init__(self) -> None:
        super().__init__()
        self.total_expenses = 0
    
    def __str__(self):
        return f"${round(float(self.total_expenses),2)}"

    def add_tax(self, tax):
        self.total_expenses += tax

    def add_mortgage(self, mortgage):
        self.total_expenses += mortgage

    def add_insurance(self, insurance):
        self.total_expenses += insurance

    def add_electric(self, electric):
        self.total_expenses += electric

    def add_water(self, water):
        self.total_expenses += water

    def add_sewer(self, sewer):
        self.total_expenses += sewer

    def add_garbage(self, garbage):
        self.total_expenses += garbage

    def add_gas(self, gas):
        self.total_expenses += gas

    def add_hoa_fees(self, hoa):
        self.total_expenses += hoa

    def add_vacancy_cost(self, vacancy):
        self.total_expenses += vacancy

    def add_rehab_cost(self, rehab):
        self.total_expenses += rehab

    def add_propmanage_cost(self, propmanage):
        self.total_expenses += propmanage

    def add_misc(self, misc):
        self.total_expenses += misc

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# Total amount invested into the property
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# 4A.1 Down payment   $40000 (20% of property value)
# 4A.2 Closing costs  $3000
# 4A.3 Rehab/repairs  $7000
# 4A.4 Misc           $0
# Investment = $50,000

class Investments(ProfitLoss):    # Investments is a component of class ROI
    def __init__(self) -> None:
        super().__init__()
        self.total_investment = 0

    def __str__(self):
        return f"${round(float(self.total_investment),2)}"

    def add_down_payment(self, downpayment):
        self.total_investment += downpayment

    def add_closing_cost(self, closingcost):
        self.total_investment += closingcost

    def add_rehab_cost(self, rehabcost):
        self.total_investment += rehabcost
    
    def add_misc(self, misc):
        self.total_investment += misc

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# Monthly cash flow 
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# ~ how much extra cash you have
# 3.1 Monthly income (step 1)     $2000
# 3.2 Monthly expenses (step 2)   $1610
# Total monthly cash flow = $390 (income - expenses)

class CashFlow():       # CashFlow is a composite of classes Expenses and Income
    def __init__(self, income_obj, expense_obj) -> None:
        self.income_obj = income_obj
        self.expense_obj = expense_obj
        self.total_cashflow = income_obj - expense_obj
    
    def __repr__(self):
        return f"${round(float(self.total_cashflow),2)}"

    def __str__(self):
        return f"${round(float(self.total_cashflow),2)}"

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# ROI Calculator (%)
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
# Total annual cash flow (monthly cashflow * 12)    $4680
# / total investment                                $50000

class ROI():            # ROI is a composite of classes Investments and CashFlow
    def __init__(self, invest_obj, cashflow_obj) -> None:
        self.invest_obj = round(float(invest_obj),2)
        self.cashflow_obj = round(float(cashflow_obj * 12),2)
        self.roi = self.cashflow_obj / self.invest_obj / 100 if self.invest_obj != 0 else 0
    
    def __repr__(self):
        return f"{round(float(self.roi),2)}%"

    def __str__(self):
        return f"{round(float(self.roi),2)}%"



# *****************************************************************
# ************************** RUN PROGRAM **************************
# *****************************************************************

def main():
    print("Welcome!\nTo calculate the cash-on-cash return on investment (ROI) for your rental property, we need to take a look at your investments, monthly income, and monthly expenses.")
    monthly_income = Income()
    monthly_expenses = Expenses()
    investments = Investments()
    
    while True:
        menu_option = input("What would you like to do? add / show / exit ")
        if menu_option == "add":
            while True:
                action = input("What would you like to add? income / expenses / investments / none ").lower()
                
                # *** INCOME ***
                if action == 'income':
                    adding_income = True
                    while adding_income:
                        income_source_to_add = input("What source of income would you like to add? rent / laundry / storage / misc / none ").lower()
                        if income_source_to_add == "rent":
                            rent = monthly_income.run('monthly', 'income', 'rent')
                            monthly_income.add_rent(rent)
                        elif income_source_to_add == "laundry":
                            laundry = monthly_income.run('monthly', 'income', 'laundry')
                            monthly_income.add_rent(laundry)
                        elif income_source_to_add == "storage":
                            storage = monthly_income.run('monthly', 'income', 'storage')
                            monthly_income.add_rent(storage)
                        elif income_source_to_add == "misc":
                            misc = monthly_income.run('monthly', 'income', 'misc')
                            monthly_income.add_rent(misc)
                        elif income_source_to_add == 'none':
                            print("Exiting...")
                            break                            
                        else:
                            "Invalid Response"
                            continue
                        print(f"Your total monthly income is {monthly_income}.")
                        next = input("Would you like to add another source of income? y/n ")
                        if next == 'y':
                            continue
                        else:
                            adding_income = False   # break out of the 'income' loop
                
                # *** EXPENSE ***
                elif action == 'expenses':
                    adding_expense = True
                    while adding_expense:
                        print("You can add one of the following expenses: \n"
                            "Property tax \t\t-> 'tax' \n"
                            "Mortgage \t\t-> 'mortgage' \n"
                            "Renters Insurance \t-> 'insurance' \n"
                            "Utilities \t\t-> 'utilities' \n"
                            "HOA Fees \t\t-> 'hoa' \n"
                            "Vacancy \t\t-> 'vacancy' \n"
                            "Rehab/Repair \t\t-> 'rehab' \n"
                            "Property Management \t-> 'propmanage' \n")
                        expense_to_add = input("What type of expense would you like to add? tax / mortgage / insurance / utilities / hoa / vacancy / rehab / propmanage / misc / none \t").lower()
                        if expense_to_add == 'tax':
                            tax = monthly_expenses.run('monthly', 'expense', 'tax')
                            monthly_expenses.add_tax(tax)
                        elif expense_to_add == 'mortgage':
                            mortgage = monthly_expenses.run('monthly', 'expense', 'mortgage')
                            monthly_expenses.add_mortgage(mortgage)
                        elif expense_to_add == 'insurance':
                            insurance = monthly_expenses.run('monthly', 'expense', 'insurance')
                            monthly_expenses.add_insurance(insurance)
                        elif expense_to_add == '':
                            adding_utility = True
                            while adding_utility:
                                utility_type = input("Which utility expense would you like to add? electric / water / sewer / garbage / gas ")
                                if utility_type == 'electric':
                                    electric = monthly_expenses.run('monthly', 'expense', 'electric')
                                    monthly_expenses.add_electric(electric)
                                elif utility_type == 'water':
                                    water = monthly_expenses.run('monthly', 'expense', 'water')
                                    monthly_expenses.add_water(water)
                                elif utility_type == 'sewer':
                                    sewer = monthly_expenses.run('monthly', 'expense', 'sewer')
                                    monthly_expenses.add_sewer(sewer)
                                elif utility_type == 'garbage':
                                    garbage = monthly_expenses.run('monthly', 'expense', 'garbage')
                                    monthly_expenses.add_garbage(garbage)
                                elif utility_type == 'gas':
                                    gas = monthly_expenses.run('monthly', 'expense', 'gas')
                                    monthly_expenses.add_gas(gas)
                                else:
                                    print("Invalid response.")
                                    continue
                                adding_utility = False
                        elif expense_to_add == 'hoa':
                            hoa = monthly_expenses.run('monthly', 'expense', 'HOA')
                            monthly_expenses.add_hoa_fees(hoa)
                        elif expense_to_add == 'vacancy':
                            vacancy = monthly_expenses.run('monthly', 'expense', 'vacancy')
                            monthly_expenses.add_vacancy_cost(vacancy)
                        elif expense_to_add == 'rehab':
                            rehab = monthly_expenses.run('monthly', 'expense', 'rehabilitaton/repair')
                            monthly_expenses.add_rehab_cost(rehab)
                        elif expense_to_add == 'propmanage':
                            propmanage = monthly_expenses.run('monthly', 'expense', 'property management')
                            monthly_expenses.add_propmanage_cost(propmanage)
                        elif expense_to_add == 'misc':
                            propmanage = monthly_expenses.run('monthly', 'expense', 'miscellaneous')
                            monthly_expenses.add_propmanage_cost(propmanage)
                        elif expense_to_add == 'none':
                            print("Exiting...")
                            break
                        else:
                            print("Invalid response")
                            continue
                        print(f"Your total monthly expenses are {monthly_expenses}.")                
                        next = input("Would you like to add another expense? y/n ")
                        if next == 'y':
                            continue
                        else:
                            adding_expense = False
                
                # *** INVESTMENT ***
                elif action == 'investments':
                    adding_investment = True
                    while adding_investment:
                        investment_to_add = input("What type of investment would you like to add? downpayment / closing / rehab / misc / none ").lower()
                        if investment_to_add == 'downpayment':
                            downpayment = investments.run('total', 'investment', 'down payment')
                            investments.add_down_payment(downpayment)
                        elif investment_to_add == 'closing':
                            closingcost = investments.run('total', 'investment', 'closing')
                            investments.add_closing_cost(closingcost)
                        elif investment_to_add == 'rehab':
                            rehab = investments.run('total', 'investment', 'rehabilitation')
                            investments.add_rehab_cost(rehab)
                        elif investment_to_add == 'misc':
                            misc = investments.run('total', 'investment', 'misc')
                            investments.add_misc(misc)
                        elif investment_to_add == 'none':
                            print("Exiting...")
                            break                            
                        else:
                            print("Invalid response")
                            continue
                        print(f"Your total investments are {investments}.")
                        next = input("Would you like to add another form of investment? y/n ")
                        if next == 'y':
                            continue
                        else:
                            adding_investment = False        
                
                # *** QUIT ***
                elif action == 'none':
                    print("Returning to main menu ...")
                    break
                
                # Invalid Response
                else:
                    print("Invalid response.")
                    continue

        elif menu_option == "show":
            showing = True
            while showing:
                view = input("What would you like to view? income / expenses / cashflow / investments / ROI / none ").lower()
                if view == "income":
                    print(f"Your total monthly income is {monthly_income}.")
                
                elif view == "expenses":
                    print(f"Your total monthly expenses are {investments}.")
                
                elif view == "cashflow":
                    print(f"Your total annual cashflow is {investments}.")
                
                elif view == "investments":
                    print(f"Your total investment amount is {investments}.")

                elif view == 'none':
                    print("Returning to main menu ...")
                    break

                elif view == "roi":
                    if investments.total_investment == 0:
                        print("Warning! No investments on record.")
                        time.sleep(2)
                        print("ROI cannot be calculated.")
                        break
                    else:
                        annual_cashflow = CashFlow(monthly_income.total_income, monthly_expenses.total_expenses)
                        roi = ROI(investments.total_investment, annual_cashflow.total_cashflow)
                        print(f"Total monthly income: {monthly_income}")
                        print(f"Total monthly expenses: {monthly_expenses}")
                        print(f"Total annual cashflow: {annual_cashflow}")
                        print(f"Total investments: {investments}")
                        print("***********************************")
                        print(f"Your cash on cash ROI is {roi}")
                        print("***********************************")
                else:
                    print("Invalid response.")
                    continue
        
        elif menu_option == "exit":
            print("Exiting ...")
            break
        
        else:
            print("Invalid response")
            continue

main()