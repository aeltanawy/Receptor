import datetime

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

SENSE_CHOICES = (
    ('S', 'Sense'),
    ('A', 'Antisense'),
    ('U', 'Unspecified')
)

# Create your models here.
class Usage(models.Model):
    usage = models.CharField(max_length=120)

    def __str__(self):
        return self.usage

class Oligo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, unique=True)
    sequence = models.CharField(max_length=200, blank=True)
    details = models.CharField(max_length=800, blank=True)
    create_date = models.DateTimeField('date created')
    modified_date = models.DateTimeField(True, False, 'date modified')
    primer_position = models.CharField(max_length=2, blank=True, choices = SENSE_CHOICES, default='U')
    usages = models.ManyToManyField(Usage, blank=True)
    gene_locus = models.CharField(max_length=120, blank=True)
    organism = models.CharField(max_length=80, blank=True)
    primer_partner = models.CharField(max_length=120, blank=True)
    company = models.CharField(max_length=80, blank=True)
    concentration = models.FloatField(null=True, blank=True)
    grade = models.CharField(max_length=80, blank=True)

    def __str__(self):
        return self.name

    def length(self):
        return len(self.sequence)

    def CanEdit(self, request):
        return (request.user == self.user)

    def CanDelete(self, request):
        return (request.user == self.user) and (self.create_date.date() == datetime.date.today())
