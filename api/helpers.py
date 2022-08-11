def loadAniDBDataDump(filePath):
    file = open(filePath, "r")
    content = file.readlines()

    d = {}
    for line in content:

        # Skip comments
        if line[0] == '#':
            continue

        l = line.split('|')

        # Only grab official JP title
        if l[1] == '1':
            d[l[0]] = l[3]

    return d