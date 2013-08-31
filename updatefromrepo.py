# UpdateFromRepo.py
import os

# make export files
path = os.path.abspath('').split('/')
repo = path[len(path)-2] + "/" + path[len(path)-1]
repo = repo[ : len(repo)-3 ]

os.system('mkdir /root/geogit-viz/public/' + repo.split('/')[0] + ' ; mkdir /root/geogit-viz/public/' + repo + ' ; mkdir /root/geogit-viz/public/' + repo + '/shp ; mkdir /root/geogit-viz/public/' + repo + '/pg ; mkdir /root/geogit-viz/public/' + repo + '/sl')

os.system('geogit shp export HEAD:node /root/geogit-viz/public/' + repo + '/shp/node.shp --alter -o')
os.system('geogit shp export HEAD:way /root/geogit-viz/public/' + repo + '/shp/way.shp --alter -o')
os.system('geogit shp export HEAD:relation /root/geogit-viz/public/' + repo + '/shp/relation.shp --alter -o')
os.system('zip /root/geogit-viz/public/' + repo + '/shp.zip /root/geogit-viz/public/' + repo + '/shp/node.* /root/geogit-viz/public/' + repo + '/shp/way.* /root/geogit-viz/public/' + repo + '/shp/relation.*')

"""
os.system('geogit pg export HEAD:node /root/geogit-viz/public/' + repo + '/pg/node.pg --alter -o')
os.system('geogit pg export HEAD:way /root/geogit-viz/public/' + repo + '/pg/way.pg --alter -o')
os.system('geogit pg export HEAD:relation /root/geogit-viz/public/' + repo + '/pg/relation.pg --alter -o')
os.system('zip /root/geogit-viz/public/' + repo + '/pg.zip /root/geogit-viz/public/' + repo + '/pg/node.* /root/geogit-viz/public/' + repo + '/pg/way.* /root/geogit-viz/public/' + repo + '/pg/relation.*')

os.system('geogit sl export HEAD:node /root/geogit-viz/public/' + repo + '/sl/node.sl --alter -o')
os.system('geogit sl export HEAD:way /root/geogit-viz/public/' + repo + '/sl/way.sl --alter -o')
os.system('geogit sl export HEAD:relation /root/geogit-viz/public/' + repo + '/sl/relation.sl --alter -o')
os.system('zip /root/geogit-viz/public/' + repo + '/sl.zip /root/geogit-viz/public/' + repo + '/sl/node.* /root/geogit-viz/public/' + repo + '/sl/way.* /root/geogit-viz/public/' + repo + '/sl/relation.*')
"""