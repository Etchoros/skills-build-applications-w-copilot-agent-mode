from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Team, User

class APISmokeTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        Team.objects.create(name='marvel')

    def test_api_root_and_users_exists(self):
        resp = self.client.get('/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        # API root should include users link
        self.assertIn('users', resp.data)

    def test_create_and_list_user(self):
        team = Team.objects.get(name='marvel')
        user_data = {'name': 'Peter Parker', 'email': 'peter@marvel.com', 'team': team.id}
        create_resp = self.client.post('/api/users/', user_data, format='json')
        self.assertIn(create_resp.status_code, (status.HTTP_201_CREATED, status.HTTP_200_OK))
        list_resp = self.client.get('/api/users/')
        self.assertEqual(list_resp.status_code, status.HTTP_200_OK)
        self.assertTrue(len(list_resp.data) >= 1)
