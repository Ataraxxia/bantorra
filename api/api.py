from flask import Flask, request
from pathlib import Path

from helpers import *

app = Flask(__name__)

@app.route('/healthcheck')
def get_current_time():
    return {"response": "ok"}


@app.route('/api/listing', methods=['GET'])
def listing():
    print("got req")
    animeData = loadAniDBDataDump('anime-titles.dat')
    path = request.args.get('path')
    files = list(Path(path).rglob("*.[ma][kpv][vi4]")) #match mkv mp4 avi

    fileList = []
    for f in files:
        fileList.append({"name": '{}'.format(f.name), "path": '{}'.format(f.resolve())})

    resp = {"anime_data": animeData, "file_list": fileList }
    return resp
