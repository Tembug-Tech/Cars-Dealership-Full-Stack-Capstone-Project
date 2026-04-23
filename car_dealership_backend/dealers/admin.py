from django.contrib import admin
from dealers.models import Dealer

@admin.register(Dealer)
class DealerAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'state', 'created_at']
    list_filter = ['state', 'created_at']
    search_fields = ['name', 'city']
