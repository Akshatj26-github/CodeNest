from django.shortcuts import render
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

User = get_user_model()
class RequestPasswordResetEmail(APIView):
    def post(self, request):
        try:
            email = request.data.get("email")
            frontend_url = request.data.get("frontend_url", "https://codenest-project.onrender.com")
            print("Received email:", email)
            print("Frontend URL:", frontend_url)

            user = User.objects.get(email=email)

            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            reset_link = f"{frontend_url}/reset-password/{uidb64}/{token}"

            print("Generated reset link:", reset_link)

            send_mail(
                subject="Reset your password",
                message=f"Click here to reset your password: {reset_link}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )

            return Response({"message": "Email sent"}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("Error:", str(e))  # Key to debugging 500
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PasswordResetConfirm(APIView):
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                password = request.data.get("password")
                user.set_password(password)
                user.save()
                return Response({"message": "Password has been reset successfully."}, status=200)
            return Response({"error": "Invalid token or UID."}, status=400)
        except Exception:
            return Response({"error": "Something went wrong."}, status=400)
