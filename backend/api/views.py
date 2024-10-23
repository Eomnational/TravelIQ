from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer, TravelInfoSerializer,UserProfileSerializer
from .models import TravelInfo,Profile
from rest_framework.views import APIView
from api.utils import getHomeData,getPublicData,getAddCommentsData,getEchartsData,getRecommendationData
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate
from api.recommdation import getUser_ratings,user_bases_collaborative_filtering
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # 允许未登录用户访问注册接口

    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        # 检查用户是否已存在
        if User.objects.filter(username=username).exists():
            return Response({'error': '用户已存在'}, status=status.HTTP_400_BAD_REQUEST)

        # 调用父类的 create 方法
        return super().create(request, *args, **kwargs)
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = UserSerializer

    def get(self, request):
        try:
            user = request.user
            profile = Profile.objects.get(user_id=user.id)
            return Response({
                "username": user.username,
                "avatar": profile.avatar.url if profile.avatar else None,
                "sex": profile.sex,
                "address": profile.address,
                "textarea": profile.textarea,
                "created_at": user.date_joined.strftime('%Y-%m-%d'),
            }, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def put(self, request):
        user = request.user
        old_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'error': '旧密码错误'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        # 生成新的 JWT
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': '密码修改成功',
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)

class ChangeSelfInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        try:
            user = request.user
            profile = Profile.objects.get(user_id=user.id)
            created_at = user.date_joined.strftime('%Y-%m') if user.date_joined else None
            
            return Response({
                "username": user.username,
                "avatar": profile.avatar.url if profile.avatar else None,
                "sex": profile.sex,
                "address": profile.address,
                "textarea": profile.textarea,
                "created_at": created_at,
            }, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request):
        user = request.user
        sex = request.data.get('sex')
        address = request.data.get('address')
        textarea = request.data.get('textarea')
        avatar = request.FILES.get('avatar')  # 使用 request.FILES 获取上传的文件

        try:
            profile = Profile.objects.get(user=user)  # 使用 user 对象更直观
            profile.sex = sex if sex is not None else profile.sex
            profile.address = address if address is not None else profile.address
            profile.textarea = textarea if textarea is not None else profile.textarea
            
            if avatar:  # 如果有上传的头像文件
                avatar_name = default_storage.save(f'avatar/{avatar.name}', ContentFile(avatar.read()))
                profile.avatar = avatar_name  # 去掉前缀，直接保存文件名
            
            profile.save()
            return Response({'message': '个人信息修改成功'}, status=status.HTTP_200_OK)

        except Profile.DoesNotExist:
            # 如果用户的 Profile 不存在，创建新的 Profile
            profile = Profile(user=user, sex=sex, address=address, textarea=textarea)
            if avatar:
                avatar_name = default_storage.save(f'avatar/{avatar.name}', ContentFile(avatar.read()))
                profile.avatar = avatar_name  # 去掉前缀，直接保存文件名
            profile.save()
            return Response({'message': '个人信息创建成功'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class HomeViewSet(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        a5Len, commentsLenTitle, provienceDicSort = getHomeData.getHomeTagData()
        scoreTop10Data, saleCountTop10 = getHomeData.getAnthorData()
        year, mon, day = getHomeData.getNowTime()
        geoData = getHomeData.getGeoData()
        # 使用序列化器将 TravelInfo 对象列表转换为 JSON 格式
        scoreTop10DataSerialized = TravelInfoSerializer(scoreTop10Data, many=True).data
        saleCountTop10Serialized = TravelInfoSerializer(saleCountTop10, many=True).data

        return Response({
            'a5Len': a5Len,
            'commentsLenTitle': commentsLenTitle,
            'provienceDicSort': provienceDicSort,
            'scoreTop10Data': scoreTop10DataSerialized,
            'nowTime': {
                'year': year,
                'mon': getPublicData.monthList[mon - 1],
                'day': day
            },
            'geoData': geoData,
            'saleCountTop10': saleCountTop10Serialized
        })



class TableDataView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # 获取所有的 TravelInfo 数据
        tableData = TravelInfo.objects.all()
        
        # 使用 TravelInfoSerializer 进行序列化
        serializer = TravelInfoSerializer(tableData, many=True)
        
        # 返回序列化后的数据
        return Response({'tableData': serializer.data})

class AddCommentsView(APIView):
    permission_classes = [AllowAny]
 
    def get(self, request, id):
        try:
            travel_info = TravelInfo.objects.get(id=id)
            serializer = TravelInfoSerializer(travel_info)
            return Response(serializer.data)
        except TravelInfo.DoesNotExist:
            return Response({"error": "Not found"}, status=404)
    def post(self, request, id):
        # 从 JWT 获取当前用户
        user = request.user

        # 获取旅行信息
        travelInfo = getAddCommentsData.getTravelById(id)

        # 从请求数据中获取评分和内容
        rate = request.data.get('rate')
        content = request.data.get('content')

        # 验证评分和内容是否为空
        if not rate or not content:
            return Response({'error': '评分和内容不能为空'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # 确保评分是一个整数
            rate = int(rate)
            if rate < 1 or rate > 5:  # 可根据需要设置评分范围
                return Response({'error': '评分必须在1到5之间'}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'error': '评分必须是整数'}, status=status.HTTP_400_BAD_REQUEST)

        # 添加评论
        getAddCommentsData.addComments({
            'id': id,
            'rate': rate,
            'content': content,
            'userInfo': user,  # 使用当前用户
            'travelInfo': travelInfo
        })

        return Response({'message': '评论添加成功'}, status=status.HTTP_201_CREATED)
    
class CityCharView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        Xdata, Ydata = getEchartsData.cityCharDataOne()
        resultData = getEchartsData.cityCharDataTwo()

        return Response({

            'cityCharOneData': {
                'Xdata': Xdata,
                'Ydata': Ydata
            },
            'cityCharTwoData': resultData
        })

class RateCharView(APIView):
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        cityList = getPublicData.getCityList()
        travelList = getPublicData.getAllTravelInfoMapData(cityList[0])
        charOneData = getEchartsData.getRateCharDataOne(travelList)
        charTwoData = getEchartsData.getRateCharDataTwo(travelList)

        return Response({
            'cityList': cityList,
            'charOneData': charOneData,
            'charTwoData': charTwoData
        })
    def post(self, request):
        # 从请求中获取城市参数
        province = request.data.get('province')

        if not province:
            return Response({"error": "Province is required."}, status=400)

        # 获取该城市的数据
        travelList = getPublicData.getAllTravelInfoMapData(province)
        charOneData = getEchartsData.getRateCharDataOne(travelList)
        charTwoData = getEchartsData.getRateCharDataTwo(travelList)

        return Response({
            'charOneData': charOneData,
            'charTwoData': charTwoData
        })

class PriceCharView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        cityList = getPublicData.getCityList()
        travelList = getPublicData.getAllTravelInfoMapData()
        xData, yData = getEchartsData.getPriceCharDataOne(travelList)
        x1Data, y1Data = getEchartsData.getPriceCharDataTwo(travelList)
        disCountPieData = getEchartsData.getPriceCharDataThree(travelList)

        return Response({
            'cityList': cityList,
            'echartsData': {
                'xData': xData,
                'yData': yData,
                'x1Data': x1Data,
                'y1Data': y1Data,
                'disCountPieData': disCountPieData
            }
        })

class CommentsCharView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        xData, yData = getEchartsData.getCommentsCharDataOne()
        commentsScorePieData = getEchartsData.getCommentsCharDataTwo()
        x1Data, y1Data = getEchartsData.getCommentsCharDataThree()

        return Response({
            'echartsData': {
                'xData': xData,
                'yData': yData,
                'commentsScorePieData': commentsScorePieData,
                'x1Data': x1Data,
                'y1Data': y1Data
            }
        })

class RecommendationView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        userInfo = request.user
        try:
            user_ratings = getUser_ratings()
            recommended_items = user_bases_collaborative_filtering(userInfo.id, user_ratings)
            resultDataList = getRecommendationData.getAllTravelByTitle(recommended_items)
        except:
            resultDataList = getRecommendationData.getRandomTravel()

        # Serialize the result data list
        serializer = TravelInfoSerializer(resultDataList, many=True)
        
        return Response({
            'resultDataList': serializer.data  # Use the serialized data
        })