from django.db import models
from django.contrib.auth.models import User
from dealers.models import Dealer

class Review(models.Model):
    dealer = models.ForeignKey(Dealer, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    comment = models.TextField()
    purchase = models.BooleanField(default=False)
    purchase_date = models.DateField(null=True, blank=True)
    car_make = models.CharField(max_length=100, null=True, blank=True)
    car_model = models.CharField(max_length=100, null=True, blank=True)
    year = models.IntegerField(null=True, blank=True)
    sentiment = models.CharField(max_length=20, default='neutral', choices=[('positive', 'Positive'), ('negative', 'Negative'), ('neutral', 'Neutral')])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review by {self.user.username} for {self.dealer.name}"

    class Meta:
        ordering = ['-created_at']
