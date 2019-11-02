from django.contrib.postgres.search import SearchQuery, SearchRank
from django.contrib.postgres.search import SearchVector
from django.contrib.auth.decorators import permission_required
#from django.utils.decorators import method_decorator
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy

from .models import Oligo


def edit(request, oligo_id):
    return HttpResponse(f"Editing {oligo_id}.")

def delete(request, oligo_id):
    return HttpResponse(f"Deleting {oligo_id}.")

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
            name_vector = SearchVector('name', weight='A')
            user_vector = SearchVector('user', weight='B')
            gene_vector = SearchVector('gene_locus', weight='C')
            search_vector = name_vector + user_vector + gene_vector
            search_rank = SearchRank(search_vector, search_query)
            query_set = query_set.annotate(search=search_vector).filter(search=search_query)
            query_set = query_set.annotate(rank=search_rank).order_by('-rank')

        return query_set


class OligoDetailView(DetailView):
    model = Oligo


class OligoUpdate(UpdateView):
    model = Oligo
    fields = ['user', 'name', 'sequence', 'details', 'primer_position', 'primer_partner', 'usages', 'gene_locus', 'organism', 'company', 'concentration', 'grade']
    success_url = reverse_lazy('oligos:index')
