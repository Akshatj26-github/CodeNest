from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register_user/', views.register_user, name='register_user'),
    path('updateprofile/', views.update_user_profile,name='updateprofile'),
    path("category/", views.category_view, name="category_view"),
    path("blogs", views.blog_list, name="blog_list"),
    path('blogs/<int:pk>', views.get_blog, name='get_blog'),
    path('blogs/create/', views.create_blog, name='create_blog'),
    path('blogs/update/<int:pk>/', views.update_blog, name='update_blog'),
    path('blogs/delete/<int:pk>/', views.delete_blog, name='delete_blog'),
    path('get_username', views.get_username, name='get_username'),
    path('user/info/<str:username>', views.get_userinfo, name='get_userinfo'),
    path('user/email/<str:email>', views.get_user, name='get-user-by-email'),  
    path("blogs/<int:pk>/like/", views.like_blog, name="like-blog"),
    path('search/', views.search_blogs, name='search_blogs'),

    #submit email form 
    path('reset_password/', auth_views.PasswordResetView.as_view(),name="password_reset"), 
    #email sent success message
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(), name="password_reset_done"), 
    #Link to password reset form in email
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(),name="password_reset_confirm"),  
    #Password successfully changes message
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(),name="password_reset_complete"),  
]
