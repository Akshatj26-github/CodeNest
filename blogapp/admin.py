from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Blog, Category
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html

class CustomUserAdmin(UserAdmin):
    list_display = ("username", "first_name", "last_name", "email", "job_title", "profile_picture")


    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {
            "fields": ("first_name", "last_name", "email", 'bio', 'profile_picture', 'job_title',
                       'facebook', 'twitter', 'instagram', 'linkedin')
        }),
        (_("Permissions"), {
            "fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions"),
        }),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {
            'fields': ('bio', 'profile_picture', 'job_title', 'facebook', 'twitter', 'instagram', 'linkedin')
        }),
    )

admin.site.register(User, CustomUserAdmin)

class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "is_draft", "category", "created")  

admin.site.register(Category)
admin.site.register(Blog, BlogAdmin)
