from django.contrib import admin
from reviews.models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'dealer', 'rating', 'sentiment', 'created_at']
    list_filter = ['rating', 'sentiment', 'created_at']
    search_fields = ['comment', 'user__username', 'dealer__name']
