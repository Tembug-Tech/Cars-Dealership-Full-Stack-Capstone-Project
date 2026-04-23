from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from dealers.views import DealerViewSet
from reviews.views import ReviewViewSet
from users.views import RegisterView, LoginView, LogoutView
from sentiment.views import SentimentAnalysisView

router = DefaultRouter()
router.register(r'dealers', DealerViewSet, basename='dealer')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/sentiment/', SentimentAnalysisView.as_view(), name='sentiment'),
]
