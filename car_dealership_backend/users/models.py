from django.db import models

# Extended user model - using Django's built-in User model
# Additional user-specific data can be added here if needed

class UserProfile(models.Model):
    from django.contrib.auth.models import User
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    
    def __str__(self):
        return self.user.username
