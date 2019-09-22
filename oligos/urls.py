from django.urls import path

from . import views

app_name = 'oligos'
urlpatterns = [
    # /oligos/
    path('', views.index, name='index'),
    # /oligos/<int:oligo_id>/
    path('<int:oligo_id>/', views.detail, name='detail'),
    # /oligos/<int:oligo_id>/edit/
    path('<int:oligo_id>/edit/', views.edit, name='edit'),
    # /oligos/<int:oligo_id>/delete/
    path('<int:oligo_id>/delete/', views.delete, name='delete'),
    # /oligos/batch/
    path('batch/', views.batch, name='batch'),
    # /oligos/search/
    path('search/', views.search, name='search'),
]
