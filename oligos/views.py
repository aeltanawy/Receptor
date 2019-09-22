from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
#from django.template import loader
from .models import Oligo

def index(request):
    oligo_set = Oligo.objects.all()
    #template = loader.get_template('oligos/index.html')
    context = {
        'oligo_set' : oligo_set,
    }
    #return HttpResponse(template.render(context, request))
    return render(request, 'oligos/index.html', context)

def detail(request, oligo_id):
    oligo = get_object_or_404(Oligo, pk=oligo_id)
    return render(request, 'oligos/detail.html', {'oligo': oligo})

def edit(request, oligo_id):
    return HttpResponse(f"Editing {oligo_id}.")

def delete(request, oligo_id):
    return HttpResponse(f"Deleting {oligo_id}.")

def batch(request):
    return HttpResponse("Batch Oligo")

def search(request):
    return HttpResponse("Search Oligo")
