"""
Serializers for User authentication and profiles.
"""
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User, EmployerProfile, ApplicantProfile


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""
    
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'role', 'phone', 'avatar', 
                  'is_verified', 'created_at']
        read_only_fields = ['id', 'is_verified', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password]
    )
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password_confirm', 'role']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({
                "password": "Password fields didn't match."
            })
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        
        # Create profile based on role
        if user.role == User.Role.EMPLOYER:
            EmployerProfile.objects.create(user=user, company_name='')
        else:
            ApplicantProfile.objects.create(user=user)
        
        return user


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    
    def validate(self, attrs):
        user = authenticate(
            username=attrs['email'],
            password=attrs['password']
        )
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled")
        attrs['user'] = user
        return attrs


class EmployerProfileSerializer(serializers.ModelSerializer):
    """Serializer for EmployerProfile model."""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = EmployerProfile
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']


class ApplicantProfileSerializer(serializers.ModelSerializer):
    """Serializer for ApplicantProfile model."""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = ApplicantProfile
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
