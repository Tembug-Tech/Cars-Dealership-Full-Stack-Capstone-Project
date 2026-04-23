from rest_framework import serializers
from dealers.models import Dealer

class DealerSerializer(serializers.ModelSerializer):
    reviews_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Dealer
        fields = ['id', 'name', 'city', 'state', 'address', 'reviews_count', 'average_rating', 'created_at']
        read_only_fields = ['created_at']

    def get_reviews_count(self, obj):
        return obj.reviews.count()

    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews.exists():
            ratings = [review.rating for review in reviews]
            return sum(ratings) / len(ratings)
        return 0
