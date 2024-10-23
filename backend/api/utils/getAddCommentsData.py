from api.models import TravelInfo
from api.utils.getHomeData import getNowTime
import json

def getTravelById(id):
    travel = TravelInfo.objects.get(id=id)
    travel.img_list = json.loads(travel.img_list)
    travel.comments = json.loads(travel.comments)

    return travel

def addComments(commentData):
    # 'author': author,
    # 'content': content,
    # 'score': score
    # authorId
    travelInfo = commentData['travelInfo']
    travelInfo.comments.append({
        'author':commentData['userInfo'].username,
        'score':commentData['rate'],
        'content':commentData['content'],
        'userId':commentData['userInfo'].id,
    })
    travelInfo.comments = json.dumps(travelInfo.comments)
    travelInfo.img_list = json.dumps(travelInfo.img_list)
    travelInfo.save()