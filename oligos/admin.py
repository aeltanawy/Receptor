from django.contrib import admin

from .models import Oligo, Usage


#admin.site.register(Oligo)
#admin.site.register(Usage)

@admin.register(Oligo)
class OligoAdmin(admin.ModelAdmin):
    list_display = ('name', 'sequence', 'create_date')
    list_filter = ('usages', 'create_date', 'company')

    fieldsets = (
        (None, {
            'fields': ('user', 'name', 'create_date')
        }),
        ('Information', {
            'fields': ('sequence', 'details', 'primer_position', 'primer_partner', 'usages', 'gene_locus', 'organism', 'company', 'concentration', 'grade')
        })
    )
