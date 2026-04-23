from django.core.management.base import BaseCommand
from dealers.models import Dealer
from django.contrib.auth.models import User
from reviews.models import Review

class Command(BaseCommand):
    help = 'Seed initial data for the application'

    def handle(self, *args, **options):
        # Create some sample dealers
        dealers_data = [
            {'name': 'Downtown Auto Sales', 'city': 'New York', 'state': 'NY', 'address': '123 Main St, New York, NY 10001'},
            {'name': 'City Motors', 'city': 'Los Angeles', 'state': 'CA', 'address': '456 Broadway Ave, Los Angeles, CA 90001'},
            {'name': 'Tech Cars LLC', 'city': 'San Francisco', 'state': 'CA', 'address': '789 Market St, San Francisco, CA 94102'},
            {'name': 'Texas Auto Group', 'city': 'Houston', 'state': 'TX', 'address': '101 Main St, Houston, TX 77001'},
            {'name': 'Sunshine Automobiles', 'city': 'Miami', 'state': 'FL', 'address': '200 Biscayne Blvd, Miami, FL 33131'},
            {'name': 'Midwest Motors', 'city': 'Chicago', 'state': 'IL', 'address': '300 Michigan Ave, Chicago, IL 60601'},
            {'name': 'Seattle Automotive', 'city': 'Seattle', 'state': 'WA', 'address': '400 Pike St, Seattle, WA 98101'},
            {'name': 'Boston Classics', 'city': 'Boston', 'state': 'MA', 'address': '500 Washington St, Boston, MA 02108'},
        ]

        for dealer_data in dealers_data:
            dealer, created = Dealer.objects.get_or_create(
                name=dealer_data['name'],
                defaults=dealer_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created dealer: {dealer.name}'))

        # Create a sample user for reviews
        user, created = User.objects.get_or_create(
            username='testuser',
            defaults={
                'email': 'test@example.com',
                'first_name': 'Test',
                'last_name': 'User'
            }
        )
        if created:
            user.set_password('testpass123')
            user.save()
            self.stdout.write(self.style.SUCCESS('Created test user'))

        # Create some sample reviews
        sample_reviews = [
            {'dealer_id': 1, 'rating': 5, 'comment': 'Excellent service! Very happy with my purchase.'},
            {'dealer_id': 1, 'rating': 4, 'comment': 'Good experience, friendly staff.'},
            {'dealer_id': 2, 'rating': 3, 'comment': 'Average service, some issues with paperwork.'},
            {'dealer_id': 3, 'rating': 5, 'comment': 'Outstanding experience! Highly recommend.'},
            {'dealer_id': 4, 'rating': 2, 'comment': 'Poor service, not satisfied with the experience.'},
        ]

        for review_data in sample_reviews:
            dealer_id = review_data.pop('dealer_id')
            review, created = Review.objects.get_or_create(
                dealer_id=dealer_id,
                user=user,
                rating=review_data['rating'],
                comment=review_data['comment'],
                defaults={
                    'purchase': True,
                    'car_make': 'Toyota',
                    'car_model': 'Camry',
                    'year': 2023
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created review for dealer {dealer_id}'))

        self.stdout.write(self.style.SUCCESS('Successfully seeded database'))
