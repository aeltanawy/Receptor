# Generated by Django 2.2.3 on 2019-10-10 22:26

from django.db import migrations, models

def create_usage(apps, schema_editor):
    Usage = apps.get_model('oligos', 'Usage')
    usage_list = ['Hybridize', 'Mutagenesis', 'PCR', 'Sequencing', 'Other']
    for use in usage_list:
        usage = Usage(usage=use)
        usage.save()

class Migration(migrations.Migration):
    inital = True

    dependencies = [
        ('oligos', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_usage),
    ]
