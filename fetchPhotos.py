import os;
import json;
from pprint import pprint

with open("settings.json", r) as s:
	settings = json.load(s);   

while settings["photodir" + num] != null:
	print(settings["photodir" + num]);


