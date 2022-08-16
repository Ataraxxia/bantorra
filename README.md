# Bantorra

This little piece of software is meant to help organise your vast anime collection.

## Requirements

Basically ATM you need linux box. I didn't bother making sure that python API is OS-independent when it comes to file-paths.

## How does it work?

The python backend performs a recursive scan of a given path, seraching for "[avi, mkv, mp4]" files and then presents it as a list. The list items can be selected and upon providing desired parameters (destination path, show name, folder naming convention) the files are moved. 

## Running the app

Easiest way is to install yarn (or npm), clone the repo. Then you need to get AniDB API titles dump from https://wiki.anidb.net/API

The file needs to be places within /api/ folder under the name of `anime-titles.dat`.

 Finally, run:

```bash
	yarn start &
	yarn start-api
```

Then everything is accessible under http://localhost:3000

You need to make sure that the user you're running the app as can move and create directories on the source and destination paths!

