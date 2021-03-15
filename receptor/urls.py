from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    # path('accounts/', include('accounts.urls')),
    path('api/auth/', include('accounts.api.urls')),
    # path('accounts/', include('django.contrib.auth.urls')),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('oligos/', include('oligos.urls')),
]
