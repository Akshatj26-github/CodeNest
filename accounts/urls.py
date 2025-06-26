from django.urls import path
from .views import RequestPasswordResetEmail, PasswordResetConfirm

urlpatterns = [
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name='request-reset-email'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirm.as_view(), name='password-reset-confirm'),
]
