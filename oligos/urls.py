from django.urls import path
from django.conf.urls import url
from django.contrib.auth.decorators import permission_required

from . import views

app_name = 'oligos'
urlpatterns = [
    # /oligos/
    path('', views.OligoListView.as_view(), name='index'),
    path('generic_search/', views.OligoSearchView.as_view(), name='generic_search'),
    # /oligos/<int:oligo_id>/
    path('<int:pk>/', views.OligoDetailView.as_view(), name='detail'),
    # /oligos/<int:oligo_id>/edit/
    path('<int:pk>/update/', permission_required('oligos.change_oligo')(views.OligoUpdate.as_view()), name='update'),
    # /oligos/<int:oligo_id>/delete/
    path('<int:pk>/delete/', permission_required('oligos.change_oligo')(views.OligoDelete.as_view()), name='delete'),
    # /oligos/batch/
    path('batch/', views.batch, name='batch'),
    # /oligos/search/
    path('search/', views.search, name='search'),
    # /oligos/index/
    #url(r'^$', views.OligoListView.as_view(), name='index')
]
