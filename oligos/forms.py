from django import forms
from oligos.models import Usage, Oligo
import re

class OligoForm(forms.ModelForm):
    details = forms.CharField(widget=forms.Textarea)
    sequence = forms.CharField(widget=forms.Textarea)
    gene_locus = forms.CharField(required=False)
    organism = forms.CharField(required=False)
    primer_partner = forms.CharField(required=False)
    company = forms.CharField(required=False)
    concentration = forms.FloatField(required=False)
    grade = forms.CharField(required=False)
    usages = forms.ModelMultipleChoiceField(queryset=Usage.objects.all(), widget=forms.CheckboxSelectMultiple, required=False)

    class Meta:
        model = Oligo
        exclude = ('user', 'name', 'create_date', 'modified_date', 'oligo_id')

    def clean_sequence(self):
        """Modifes the entered sequence and validates the nucleobases"""
        seq = self.cleaned_data['sequence']
        seq = seq.upper()
        seq = ''.join(seq.split())
        match = re.search('[^ACGT]', seq)
        if match:
            raise forms.ValidationError("Only A, C, G, and T are allowed.")
        return seq
