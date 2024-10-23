from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView,UserProfileView,HomeViewSet,AddCommentsView,ChangePasswordView,ChangeSelfInfoView,TableDataView,CityCharView, RateCharView, PriceCharView,CommentsCharView,RecommendationView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# 创建路由视图
router = DefaultRouter()


# url模式
urlpatterns = [
    path("admin/", admin.site.urls),  # 管理员
    path('api/', include(router.urls)),  # API
    path("api/user/register/", CreateUserView.as_view(), name="register"),  # 注册
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),  # 获取 token
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),  # 刷新 token
    path("api/user/me/", UserProfileView.as_view(), name="user_profile"),  # 获取用户信息
    path("api/home/", HomeViewSet.as_view(), name='home'),#获取首页数据包括中国地图等
    path('api/user/ChangePassword/', ChangePasswordView.as_view(),name='change_password'),#修改密码
    path('api/user/ChangeSelfInfo/', ChangeSelfInfoView.as_view(),name='change_self_info'),#修改个人信息
    path('api/get-travel-info/', TableDataView.as_view(), name='get_travel_info'),#获取旅行信息
    path('api/comments/add/<int:id>/', AddCommentsView.as_view(), name='add_comments'),#添加评论
    path('api/city-char/', CityCharView.as_view(), name='city_char'),#城市分布
    path('api/rate-char/', RateCharView.as_view(), name='rate_char'),#评分分布
    path('api/price-char/', PriceCharView.as_view(), name='price_char'),#价格分布
    path('api/comments-char/', CommentsCharView.as_view(), name='comments_char'),#评论分布
    path('api/recommendation/', RecommendationView.as_view(), name='recommendation'),
    path("api-auth/", include("rest_framework.urls")),
]

# 添加媒体文件的 URL
if settings.DEBUG:  # 只在开发模式下添加
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

