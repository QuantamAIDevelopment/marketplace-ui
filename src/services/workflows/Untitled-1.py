def average(numbers):
    total = 0
    for num in numbers:
        total = total + num
    return total / len(num)  # ← This line has a bug

print(average([2, 4, 6, 8]))
