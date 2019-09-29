import datetime

from django.contrib.auth.models import User
from django.test import TestCase, Client
from oligos.models import Usage, Oligo
from django.utils import timezone
from django.urls import reverse
from oligos.forms import OligoForm

class OligoTest(TestCase):

    def create_oligo(self):
        # creating superuser
        user = User(username='Tom', password='tom', is_superuser=True)
        user.save()
        # creating oligo data
        name = 'Check-F'
        sequence = 'ctcatcttctctcttctctccac'
        create_date = datetime.date.today()

        return Oligo.objects.create(name=name, sequence=sequence,
                                    create_date=create_date, user=user)

    def test_oligo_creation(self):
        data = self.create_oligo()
        client = Client()
        client.login(username='Tom', password='tom')
        request = client.get("/account/profile/{}/".format(data.user.id), follow=True)
        self.assertTrue(isinstance(data, Oligo))
        self.assertEqual(data.__str__(), data.name)
        self.assertEqual(data.length(), len(data.sequence))
        #self.assertEqual(data.CanEdit(request), True)
        #self.assertEqual(data.CanDelete(request), True)

class UsageTest(TestCase):

    def create_usage(self):
        usage = 'Identifies Tj-ILP1 gene'
        return Usage.objects.create(usage=usage)

    def test_usage_creation(self):
        data = self.create_usage()
        self.assertEqual(data.__str__(), data.usage)
