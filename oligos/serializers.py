from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from .models import Oligo, Usage


class UsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usage
        fields = '__all__'

class UsageListingField(serializers.RelatedField):

    def to_representation(self, value):
        """
        Returns usage name.
        """
        return f'{value.usage}'

    def to_internal_value(self, data):
        """
        Returns the usage record.
        """
        try:
            return Usage.objects.get(usage=data)
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                f"Usage '{data}' does not exist."
            )

class OligoSerializer(serializers.ModelSerializer):

    usages = UsageListingField(many=True, queryset=Usage.objects.all())
    class Meta:
        model = Oligo
        fields = '__all__'

