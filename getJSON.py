#!/usr/bin/env python3

import os
import json

def get_immediate_subdirectories(a_dir):
	return [name for name in os.listdir(a_dir)
		if os.path.isdir(os.path.join(a_dir, name))]

def matches(x,m):
	if m == 'music':
		extensions = ['.mp3','.wav','.m4a','.aac','.aiff']
		for e in extensions:
			if x.lower().endswith(e):
				return True
	elif m == 'photos':
		extensions = ['.jpg','.gifv','.gif','.png','jpeg','.svg']
		for e in extensions:
			if x.lower().endswith(e):
				return True
	return False

def generate(path,mode):
	f = []
	for dirpath, subdirs, files in os.walk(path):
		f.extend(os.path.join(dirpath, x) for x in files if matches(x,mode))
	return f
		

def main():
	# try:
	data = open('covalence.conf','r').read().split()
	# if data[0] != "Music":
		# raise Exception
	index = 1
	while data[index] != "Photos":
		line = data[index]
		p = os.path.abspath(line)
		with open(p + '/metadata.json','w') as f:
			arr = generate(p,'music')
			if arr:
				f.write(json.dumps({'files':arr}))
				print("Created metadata.json for " + p)
		index += 1
	l = len(data)
	index += 1
	while index < l:
		line = data[index]
		p = os.path.abspath(line)
		with open(p + '/metadata.json','w') as f:
			arr = generate(p,'photos')
			if arr:
				f.write(json.dumps({'files':arr}))
				print("Created metadata.json for " + p)
		index += 1
	# except:
		# print("Malformed covalence.conf")

main()
