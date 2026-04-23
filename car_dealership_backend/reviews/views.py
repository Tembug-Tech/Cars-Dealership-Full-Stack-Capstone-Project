from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from reviews.models import Review
from reviews.serializers import ReviewSerializer
from sentiment.utils import analyze_sentiment

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Review.objects.all()
        dealer_id = self.request.query_params.get('dealer_id', None)
        if dealer_id is not None:
            queryset = queryset.filter(dealer_id=dealer_id)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Perform sentiment analysis
        comment = serializer.validated_data.get('comment', '')
        sentiment = analyze_sentiment(comment)
        
        self.perform_create(serializer, sentiment=sentiment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer, sentiment=None):
        serializer.save(sentiment=sentiment or 'neutral')
