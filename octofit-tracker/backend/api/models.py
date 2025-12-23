from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, null=True, blank=True, on_delete=models.SET_NULL, related_name='members')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return f"{self.name} <{self.email}>"

class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.IntegerField()
    distance_km = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField()

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.activity_type} by {self.user.email} at {self.timestamp}"

class LeaderboardEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    score = models.IntegerField()
    rank = models.IntegerField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'leaderboard'

    def __str__(self):
        return f"{self.user.email}: {self.score} (rank {self.rank})"

class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    duration_minutes = models.IntegerField()
    date = models.DateField()

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return f"{self.title} ({self.user.email})"
