from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from pymongo import MongoClient

from api.models import Team, User, Activity, LeaderboardEntry, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Deleting existing data...')
        Workout.objects.all().delete()
        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='marvel', description='Marvel heroes')
        dc = Team.objects.create(name='dc', description='DC heroes')

        self.stdout.write('Creating users...')
        users = []
        users.append(User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel))
        users.append(User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel))
        users.append(User.objects.create(name='Bruce Banner', email='bruce@marvel.com', team=marvel))
        users.append(User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc))
        users.append(User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc))
        users.append(User.objects.create(name='Diana Prince', email='diana@dc.com', team=dc))

        now = timezone.now()

        self.stdout.write('Creating activities...')
        Activity.objects.create(user=users[0], activity_type='Run', duration_minutes=30, distance_km=5.0, timestamp=now - timedelta(days=2))
        Activity.objects.create(user=users[1], activity_type='Cycle', duration_minutes=45, distance_km=20.0, timestamp=now - timedelta(days=1))
        Activity.objects.create(user=users[3], activity_type='Swim', duration_minutes=60, distance_km=2.0, timestamp=now - timedelta(hours=5))

        self.stdout.write('Creating leaderboard entries...')
        LeaderboardEntry.objects.create(user=users[0], score=950)
        LeaderboardEntry.objects.create(user=users[1], score=900)
        LeaderboardEntry.objects.create(user=users[3], score=980)

        self.stdout.write('Creating workouts...')
        Workout.objects.create(user=users[0], title='HIIT Session', description='High intensity interval training', duration_minutes=25, date=(now - timedelta(days=1)).date())
        Workout.objects.create(user=users[4], title='Evening run', description='Tempo run', duration_minutes=40, date=(now - timedelta(days=3)).date())

        # Ensure unique index on email field using pymongo
        try:
            self.stdout.write('Ensuring unique index on users.email...')
            client = MongoClient('mongodb://localhost:27017', serverSelectionTimeoutMS=5000)
            db = client['octofit_db']
            db['users'].create_index([('email', 1)], unique=True)
            self.stdout.write(self.style.SUCCESS('Unique index on users.email ensured.'))
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Could not create unique index on users.email: {e}'))

        self.stdout.write(self.style.SUCCESS('Database population complete.'))
