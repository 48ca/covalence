import os

f = open("covalence.conf", "r").read()
arr = f.split("\n")
for i in range(0, len(arr)):
    if arr[i] != "Music" and arr[i] != "Photos":
        if not os.path.exists(arr[i]):
            print("Invalid directory(s) in covalence.conf!")
            exit();
print("All directories valid!")
exit();
