#!/usr/bin/env python3

import os
import sys
import json
from mutagen import File

def get_immediate_subdirectories(a_dir):
	return [name for name in os.listdir(a_dir)
		if os.path.isdir(os.path.join(a_dir, name))]

def matches(x,m):
	if m == 'music':
		extensions = ['.mp3','.wav','.m4a','.aac','.aiff']
		for e in extensions:
			if x.endswith(e):
				return True
	elif m == 'photos':
		extensions = ['.jpg','.gifv','.gif','.png','jpeg','.svg']
		for e in extensions:
			if x.endswith(e):
				return True
	return False

def generate(path,mode):
	f = []
	for dirpath, subdirs, files in os.walk(path):
		f.extend(os.path.join(dirpath, x) for x in files if matches(x.lower(),mode))
	d = []

	prefix = 'music/thumbs' 
	for name in f:
		try:
			ifn = prefix + os.path.dirname(name)
			pre, ext = os.path.splitext(name)
			ifm = prefix + pre + '.jpg'
			d.append({'path':name})
			file = File(name) # mutagen can automatically detect format and type of tags
			if not file: continue
			if 'TIT2' in file.tags:
				title = file.tags['TIT2'].text[0]
				d[-1]['title'] = title
			if 'TABL' in file.tags:
				album = file.tags['TABL'].text[0]
				d[-1]['album'] = album
			artwork = file.tags['APIC:'].data # access APIC frame and grab the image
			if not os.path.exists(ifn):
				os.makedirs(ifn)
			with open(ifm, 'wb') as img:
			   img.write(artwork) # write artwork to new image
			d[-1]['image'] = ifm
			
		except:
			print("Failed to extract data for {}".format(name))

	return d
		

def main():
	try:
		data = open('covalence.conf','r').read().split()
		if data[0] != "Music":
			raise Exception
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
	except:
		print("Malformed covalence.conf")
		print(sys.last_traceback)

main()
