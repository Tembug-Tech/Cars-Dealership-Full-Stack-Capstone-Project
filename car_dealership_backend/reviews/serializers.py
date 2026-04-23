from rest_framework import serializers
from reviews.models import Review
from django.contrib.auth.models import User

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    dealer_name = serializers.CharField(source='dealer.name', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'dealer', 'dealer_name', 'user', 'user_name', 'rating', 'comment', 
                  'purchase', 'purchase_date', 'car_make', 'car_model', 'year', 'sentiment', 'created_at']
        read_only_fields = ['user', 'created_at', 'sentiment']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
