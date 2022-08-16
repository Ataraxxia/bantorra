from flask import Flask, request, make_response
from pathlib import Path
import re
import os
import shutil

from helpers import *

app = Flask(__name__)

ANIME_DATA = loadAniDBDataDump('anime-titles.dat')

@app.route('/healthcheck')
def get_current_time():
    return {"response": "ok"}


@app.route('/api/listing', methods=['GET'])
def listing():
    print("got req")
    path = request.args.get('path')
    files = list(Path(path).rglob("*.[ma][kpv][vi4]")) #match mkv mp4 avi

    fileList = []
    for f in files:
        fileList.append({"name": '{}'.format(f.name), "path": '{}'.format(f.resolve())})

    resp = {"anime_data": ANIME_DATA, "file_list": fileList }
    return resp


@app.route('/api/movefiles', methods=['POST'])
def movefiles():
    print("got POST req")
    print(request)
    moving_info = request.get_json()
    print(moving_info)

    anidb_id = moving_info['anidb_id']
    naming_convention = moving_info['naming_convention']
    destination = moving_info['destination']
    files = moving_info['files']

    if destination[-1] == '/':
        destination = destination[:-1]

    path = ""

    match naming_convention:
        case 'jp':
            # Just a precaution,
            # Leave in only alfanumeric chars and .-!'
            title = re.sub('[^a-zA-Z0-9 \.\-\!\']', '', ANIME_DATA[anidb_id])
            path = '{}/{}'.format(destination, title)
        case 'id':
            path = '{}/{}'.format(destination, anidb_id)

    if path == "":
        return make_response("", 500)

    isExist = os.path.exists(path)
    if isExist == False:
        os.makedirs(path)
        print("Created new path")

    try:
        for f in files:
            dst = '{}/{}'.format(path, f['name'].split('/')[-1])
            #print('Move {} to {}'.format(f, dst))
            shutil.move(f['path'], dst)
    except:
        print("Got exception")


    return make_response("", 200);