
'''
Coding Temple Prework Assignment: Coding Questions

Source (Python 101/102):
    https://codingtemple.github.io/python/week1/
    https://codingtemple.github.io/python/week2/

Created By: JulieAnn Scherer
Date: July 5, 2022
'''

########################################################

# Question 1
# Write a function to print "hello_USERNAME!" USERNAME is the input of the function. The first line of the code has been defined as below. 

def hello_name(USERNAME):
    print("hello_" + USERNAME)

# Question 2
# Write a python function, first_odds that prints the odd numbers from 1-100 and returns nothing def first_odds():

def first_odds():
    cnt = 1
    while cnt <= 100:
        print(cnt)
        cnt += 2
    return

# Question 3
# Please write a Python function, max_num_in_list to return the max number of a given list. The first line of the code has been defined as below. 

def max_num_in_list(a_list):
    a_list.sort()
    max_num = a_list[-1]
    return max_num

# Question 4
# Write a function to return if the given year is a leap year. A leap year is divisible by 4, but not divisible by 100 unless it is also divisible by 400. The return should be boolean Type (true/false). 

def is_leap_year(a_year):
    if a_year % 4 == 0 and a_year % 100 != 0 or a_year % 400 == 0:
        return True
        #print("The year %i is indeed a leap year!" % a_year)
    else:
        return False
        #print("The year %i is not leap year :(" % a_year)

# Question 5
# Write a function to check to see if all numbers in the list are consecutive numbers. For example, [2,3,4,5,6,7] are consecutive numbers, but [1,2,4,5] are not consecutive numbers. The return should be boolean Type. 

def is_consecutive(a_list):
    for i in range(1,len(a_list)):      # start at i=1
        cur_elmnt = a_list[i]           # cur_elmnt is the element at location i 
        last_elmnt = a_list[i-1]        # last_elmnt gives us the element from the last iteration
        if (cur_elmnt > last_elmnt and cur_elmnt == last_elmnt + 1) or (last_elmnt > cur_elmnt and last_elmnt == cur_elmnt + 1):    #if in ascending order and cur_elmnt is one more than last_elmnt -or- descending and vice versa
            continue                    # continue iterating through for loop
        else:
            return False                # else, return False and break
    return True                         # if the function iterates through all the elements, the numbers are consecutive so return True


########################################################


def main():
    print("\nQuestion 1:")
    hello_name("bob&tom")

    print("\nQuestion 2:")
    first_odds()

    print("\nQuestion 3:")
    l0 = [1,5,16,5,21,7,20,19,-5,0]
    print("What is the max number in list {}?    -> {}".format(l0, max_num_in_list(l0)))

    print("\nQuestion 4:")
    v1 = 1901
    v2 = 4000
    print("Is {} a leap year?   -> {}".format(v1,is_leap_year(v1)))
    print("Is {} a leap year?   -> {}".format(v2,is_leap_year(v2)))

    print("\nQuestion 5:")
    l1 = [2,3,4,5,6,7]
    l2 = [1,2,4,5]
    l3 = [9,8,7,6,5,4]
    print("Are all the numbers in list {} consecutive?   -> {}".format(l1, is_consecutive(l1)))
    print("Are all the numbers in list {} consecutive?   -> {}".format(l2, is_consecutive(l2)))
    print("Are all the numbers in list {} consecutive?   -> {}".format(l3, is_consecutive(l3)))

main()