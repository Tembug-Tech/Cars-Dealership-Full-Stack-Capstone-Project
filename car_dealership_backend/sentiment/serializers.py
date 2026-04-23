from rest_framework import serializers

class SentimentAnalysisSerializer(serializers.Serializer):
    text = serializers.CharField()
    sentiment = serializers.CharField(read_only=True)
