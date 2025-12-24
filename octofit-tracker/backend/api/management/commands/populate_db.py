from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from api.models import Team, User, Activity, LeaderboardEntry, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Check if data already exists
        if User.objects.exists():
            self.stdout.write(self.style.WARNING('Data already exists. Skipping population.'))
            return

        self.stdout.write('Creating teams...')
        marvel = Team.objects.create(name='Marvel Avengers', description='Earth\'s Mightiest Heroes')
        dc = Team.objects.create(name='Justice League', description='DC\'s Finest Heroes')

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
        Activity.objects.create(
            user=users[0], 
            activity_type='Running', 
            duration_minutes=30, 
            distance_km=5.0, 
            timestamp=now - timedelta(days=2)
        )
        Activity.objects.create(
            user=users[1], 
            activity_type='Cycling', 
            duration_minutes=45, 
            distance_km=20.0, 
            timestamp=now - timedelta(days=1)
        )
        Activity.objects.create(
            user=users[3], 
            activity_type='Swimming', 
            duration_minutes=60, 
            distance_km=2.0, 
            timestamp=now - timedelta(hours=5)
        )
        Activity.objects.create(
            user=users[2], 
            activity_type='Weightlifting', 
            duration_minutes=40, 
            distance_km=0, 
            timestamp=now - timedelta(days=3)
        )
        Activity.objects.create(
            user=users[4], 
            activity_type='Boxing', 
            duration_minutes=50, 
            distance_km=0, 
            timestamp=now - timedelta(days=1)
        )

        self.stdout.write('Creating leaderboard entries...')
        LeaderboardEntry.objects.create(user=users[3], rank=1, score=980)
        LeaderboardEntry.objects.create(user=users[0], rank=2, score=950)
        LeaderboardEntry.objects.create(user=users[4], rank=3, score=920)
        LeaderboardEntry.objects.create(user=users[1], rank=4, score=900)
        LeaderboardEntry.objects.create(user=users[5], rank=5, score=880)

        self.stdout.write('Creating workouts...')
        Workout.objects.create(
            user=users[0],
            title='HIIT Cardio Blast',
            description='High intensity interval training for maximum calorie burn',
            duration_minutes=25,
            date=(now - timedelta(days=1)).date()
        )
        Workout.objects.create(
            user=users[1],
            title='Strength Builder',
            description='Full body strength training routine',
            duration_minutes=45,
            date=(now - timedelta(days=2)).date()
        )
        Workout.objects.create(
            user=users[2],
            title='Morning Yoga Flow',
            description='Gentle yoga routine to start your day',
            duration_minutes=30,
            date=(now - timedelta(days=3)).date()
        )
        Workout.objects.create(
            user=users[4],
            title='Combat Training',
            description='Mixed martial arts inspired workout',
            duration_minutes=60,
            date=now.date()
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated database with test data!'))
        self.stdout.write(f'Created {User.objects.count()} users')
        self.stdout.write(f'Created {Team.objects.count()} teams')
        self.stdout.write(f'Created {Activity.objects.count()} activities')
        self.stdout.write(f'Created {LeaderboardEntry.objects.count()} leaderboard entries')
        self.stdout.write(f'Created {Workout.objects.count()} workouts')
