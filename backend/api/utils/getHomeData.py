from api.utils import getPublicData
import random
import time
import sys
import os

travelMapData = getPublicData.getAllTravelInfoMapData()
userData =  getPublicData.getAllUsersInfoData()

def getHomeTagData():
    a5Len = 0
    commentsLenMax = 0
    commentsLenTitle = ''
    provienceDic = {}
    for travel in travelMapData:
        if travel.level == '5A景区':a5Len += 1
        if int(travel.commentsLen) > commentsLenMax:
            commentsLenMax = int(travel.commentsLen)
            commentsLenTitle = travel.title
        if provienceDic.get(travel.province,-1) == -1:provienceDic[travel.province] = 1
        else:provienceDic[travel.province] += 1

    provienceDicSort = list(sorted(provienceDic.items(),key=lambda x:x[1],reverse=True))[0][0]

    return a5Len,commentsLenTitle,provienceDicSort

def getAnthorData():
    scoreTop10 = []
    for travel in travelMapData:
        if travel.score == '5':
            scoreTop10.append(travel)
    
    maxLen = len(scoreTop10)
    scoreTop10Data = []
    for i in range(10):
        randomIndex = random.randint(0, maxLen - 1)
        scoreTop10Data.append(scoreTop10[randomIndex])

    saleCountTop10 = list(sorted(travelMapData,key=lambda x:int(x.saleCount),reverse=True))[:10]

    return scoreTop10Data,saleCountTop10

def getNowTime():
    timeFormat = time.localtime()
    year = timeFormat.tm_year
    mon = timeFormat.tm_mon
    day = timeFormat.tm_mday
    return year,mon,day

def getGeoData():
    dataDic = {}
    for i in travelMapData:
        for j in getPublicData.cityList:
            for city in j['city']:
                if city.find(i.province) != -1:
                    if dataDic.get(j['province'],-1) == -1:
                        dataDic[j['province']] = 1
                    else:
                        dataDic[j['province']] += 1

    resutData = []
    for key,value in dataDic.items():
        resutData.append({
            'name':key,
            'value':value
        })

    return resutData



def getUserCreateTimeData():
    dataDic = {}
    for user in userData:
        if dataDic.get(str(user.createTime),-1) == -1:
            dataDic[str(user.createTime)] = 1
        else:
            dataDic[str(user.createTime)] += 1

    resutData = []
    for key, value in dataDic.items():
        resutData.append({
            'name': key,
            'value': value
        })
    return resutData

