import datetime

from django.contrib.postgres.search import SearchQuery, SearchRank
from django.contrib.postgres.search import SearchVector
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, Http404, JsonResponse
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.forms import ModelForm
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, generics

from .serializers import OligoSerializer, UsageSerializer
from .models import Oligo, Usage


class UsageViewset(viewsets.ModelViewSet):
    queryset = Usage.objects.all()
    serializer_class = UsageSerializer
    permission_classes = [permissions.IsAuthenticated]

class OligoViewset(viewsets.ModelViewSet):
    # queryset = Oligo.objects.all()
    serializer_class = OligoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Handle GET requests.
        """
        return Oligo.objects.all().order_by('-created_date')

    def perform_create(self, serializer):
        """
        Handle POST requests.
        """
        data = self.request.data
        serializer.save(username=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        """
        Handle PATCH requests.
        """
        # get the oligo record created_date value
        created_date = Oligo.objects.get(id=request.data['id']).created_date

        # set the modified_date as now
        modified_date = datetime.datetime.now()

        # update the request data
        request.data['created_date'] = created_date
        request.data['modified_data'] = modified_date

        return super().partial_update(request, *args, **kwargs)

# class OligoDetailView(DetailView)

FIELDS = ['username', 'oligo_name', 'sequence', 'details', 'primer_position', 'primer_partner', 'usages', 'gene_locus', 'organism', 'company', 'concentration', 'grade']

def batch(request):
    return HttpResponse("Batch Oligo")

def search(request):
    return HttpResponse("Search Oligo")


class OligoListView(ListView):
    model = Oligo
    paginate_by = 25


class OligoSearchView(ListView):
    """Display Oligos list filtered by search query."""
    model = Oligo
    paginate_by = 25

    def get_queryset(self):
        query_set = Oligo.objects.filter()

        keywords = self.request.GET.get('q')
        if keywords:
            search_query = SearchQuery(keywords)
            name_vector = SearchVector('oligo_name', weight='A')
            user_vector = SearchVector('username', weight='B')
            gene_vector = SearchVector('gene_locus', weight='C')
            search_vector = name_vector + user_vector + gene_vector
            search_rank = SearchRank(search_vector, search_query)
            query_set = query_set.annotate(search=search_vector).filter(search=search_query)
            query_set = query_set.annotate(rank=search_rank).order_by('-rank')

        return query_set


class OligoDetailView(DetailView):
    model = Oligo

    def get(self, request, pk):
        oligo = Oligo.objects.get(pk=pk)
        if request.user.username == oligo.username or request.user.is_superuser:
            can_change = True
        else:
            can_change = False
        return render(request, 'oligos/oligo_detail.html', {'oligo': oligo, 'can_change': can_change})


class OligoUpdate(UpdateView):
    model = Oligo
    fields = FIELDS
    success_url = reverse_lazy('oligos:index')


class OligoDelete(DeleteView):
    model = Oligo
    success_url = reverse_lazy('oligos:index')


class OligoCreate(CreateView):
    model = Oligo
    fields = FIELDS
    success_url = reverse_lazy('oligos:index')


class OligoForm(ModelForm):
    class Meta:
        model = Oligo
        fields = FIELDS


def clone(request, pk):
    oligo = get_object_or_404(Oligo, pk=pk)
    oligo.pk = None
    form = OligoForm(request.POST or None, instance=oligo)
    if form.is_valid():
        form.save()
        return redirect('oligos:index')
    return render(request, 'oligos/clone.html', {'form': form})
