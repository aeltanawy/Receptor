from django.contrib import admin

from .models import Oligo, Usage


#admin.site.register(Oligo)
admin.site.register(Usage)

@admin.register(Oligo)
class OligoAdmin(admin.ModelAdmin):
    list_display = ('oligo_name', 'username', 'sequence', 'created_date')
    list_filter = ('usages', 'created_date', 'company')

    fieldsets = (
        (None, {
            'fields': ('username', 'oligo_name', 'created_date')
        }),
        ('Information', {
            'fields': ('sequence', 'details', 'primer_position', 'primer_partner', 'usages', 'gene_locus', 'organism', 'company', 'concentration', 'grade')
        })
    )
