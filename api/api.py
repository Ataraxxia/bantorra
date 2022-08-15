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


@app.route('/api/movefiles', methods=['POST'])
def movefiles():
    animeData = loadAniDBDataDump('anime-titles.dat')

    moving_info = request.get_json()
    print(moving_info)

    anidb_id = moving_info['anidbid']
    naming_convention = moving_info['namingConvention']
    destination = moving_info['destination']
    files = moving_info['selected']

    if destination[-1] == '/':
        destination = destination[:-1]

    path = ""

    match naming_convention:
        case 'jp':
            title = re.sub('[^a-zA-Z0-9 \.\-]', '', animeData[anidb_id])
            #title = animeData[anidb_id]
            path = '{}/{}'.format(destination, title)
        case 'id':
            path = '{}/{}'.format(destination, anidb_id)

    if path == "":
        return make_response("", 500)

    isExist = os.path.exists(path)
    if isExist == False:
        os.makedirs(path)
        print("Created new path")

    files = list(map(itemgetter(1), moving_info['selected']))
    for file in files:
        dst = '{}/{}'.format(path, file.split('/')[-1])
        print('Move {} to {}'.format(file, dst))
        shutil.move(file, dst)

    return make_response("", 200);