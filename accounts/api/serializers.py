from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers


# allow unique email address to be registered
User._meta.get_field('email')._unique = True

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'password')
        extra_kwargs = {
                'password': {'write_only': True, 'required': True},
            }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        # unpacke key-value pair of data
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials!\nPlease enter a correct username and password. Note that both fields may be case-sensitive.")
