from django.contrib import admin
from sentiment.models import SentimentResult

@admin.register(SentimentResult)
class SentimentResultAdmin(admin.ModelAdmin):
    list_display = ['sentiment', 'text', 'created_at']
    list_filter = ['sentiment', 'created_at']
