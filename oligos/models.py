import datetime
import re

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from django.urls import reverse

SENSE_CHOICES = (
    ('S', 'Sense'),
    ('A', 'Antisense'),
    ('U', 'Unspecified')
)

class UsageManager(models.Manager):
    def create_usage(self, usage):
        usage = self.create(usage=usage)
        return usage


class Usage(models.Model):
    usage = models.CharField(max_length=120)
    objects = UsageManager()

    def __str__(self):
        return self.usage


class Oligo(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=30, unique=True)
    sequence = models.CharField(max_length=200, blank=True)
    details = models.CharField(max_length=800, blank=True)
    create_date = models.DateTimeField('date created')
    modified_date = models.DateTimeField(True, False, 'date modified')
    primer_position = models.CharField(max_length=2, blank=True, choices = SENSE_CHOICES, default='U')
    usages = models.ManyToManyField(Usage, blank=True)
    gene_locus = models.CharField(max_length=120, blank=True)
    organism = models.CharField(max_length=80, blank=True)
    primer_partner = models.CharField(max_length=120, blank=True)
    company = models.CharField(max_length=80, blank=True)
    concentration = models.FloatField(null=True, blank=True)
    grade = models.CharField(max_length=80, blank=True)

    def __str__(self):
        """String represnting the Oligo object"""
        return self.name

    def get_absolute_url(self):
        """Returns the url to access a particular instance of the model."""
        return reverse('detail', args[str(self.id)])

    def length(self):
        return len(self.sequence)

    class Meta:
        ordering = ['create_date']


def extract_number(oligoname):
    match = re.search('\d\d\d\d\d*',oligoname)
    if match:
        return int(match.group(0))
    else:
        return None

def auto_name():
    q = Oligo.objects.all().order_by('-create_date')[:100]
    namelist = list(q.values_list('name', flat=True))
    numlist = []
    for name in namelist:
        num = extract_number(name)
        if num:
            numlist.append(num)
    numlist.sort(reverse=True)
    topnum = numlist[0]
    newname = 'RU-O-'+str(topnum+1)
    return newname

def auto_name_oligolist(oligolist):
    for oligo in oligolist:
        oligo.name = auto_name()
        oligo.save()
    return oligolist


class UserMap(models.Model):
    oldname = models.CharField(max_length=30)
    newname = models.CharField(max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.oldname+'->'+self.newname

def new_Oligo(request):
    return(Oligo(user=request.user,create_date=datetime.datetime.now()))

def import_File(request, oligofile):
    dest = open(LOCAL_WORKING_DIR+'/oligos.txt', 'wb+')
    for chunk in oligofile.chunks():
        dest.write(chunk)
    dest.close()
    dest = open(LOCAL_WORKING_DIR+'/oligos.txt', 'r')

    for line in dest:
        items = line.split('\t')
        name = items[0]
        sequence = items[14]
        oligo = new_Oligo(request)
        oligo.name = name
        oligo.sequence = sequence
        oligo.save()

def process_batch_submission(request, oligofile):
    randid = str(random.randint(100,999))
    dest = open(LOCAL_WORKING_DIR+'/oligos'+randid+'.txt', 'wb+')
    for chunk in oligofile.chunks():
        dest.write(chunk)
    dest.close()
    dest = open(LOCAL_WORKING_DIR+'/oligos'+randid+'.txt', 'r')

    oligolist=[]
    for line in dest:
        items = line.split('\t')
        if len(items)==13:
            if items[0]!='Sequence':
                oligo = new_Oligo(request)
                oligo.sequence = items[0]
                oligo.details = items[1]
                if items[2]:
                    if items[2].upper()[0]=='A':
                        oligo.primer_position = 'A'
                    elif items[2].upper()[0]=='S':
                        oligo.primer_position = 'S'
                    else:
                        oligo.primer_position = 'U'
                oligo.gene_locus = items[3]
                oligo.organism = items[4]
                oligo.primer_partner = items[5]
                oligo.company = items[6]
                oligo.grade = items[7]
                oligolist.append(oligo)
    dest.close()
    auto_name_oligolist(oligolist)
    dest = open(LOCAL_WORKING_DIR+'/oligos'+randid+'.txt', 'r')
    n=0
    for line in dest:
        line.strip('\n')
        line.strip('\r')
        line.strip('\n')
        line.strip('\r')
        items = line.split('\t')
        if len(items)==13:
            if items[0]!='Sequence':
                oligo = oligolist[n]
                if items[8]:
                    if items[8].upper()[0]=='Y':
                        oligo.usages.add(Usage.objects.get(usage='PCR'))
                if items[9]:
                    if items[9].upper()[0]=='Y':
                        oligo.usages.add(Usage.objects.get(usage='Sequencing'))
                if items[10]:
                    if items[10].upper()[0]=='Y':
                        oligo.usages.add(Usage.objects.get(usage='Hybridize'))
                if items[11]:
                    if items[11].upper()[0]=='Y':
                        oligo.usages.add(Usage.objects.get(usage='Mutagenesis'))
                if items[12]:
                    if items[12].upper()[0]=='Y':
                        oligo.usages.add(Usage.objects.get(usage='Other'))
                oligo.save()
                n+=1
    dest.close()


def import_usermap(filename):
    f = open(filename,'r')
    for line in f:
        v=line.split('\t')
        oldname=v[0]
        newname=v[1]
        ai=v[2]
        if User.objects.filter(username=newname):
            user = User.objects.get(username=newname)
        else:
            user = User(username=newname)
            user.set_password('rec')
            user.save()
        if ai.find('i')>-1:
            print(newname, 'inactive')
            user.set_password('inactivestatus')
            user.is_active=False
            user.save()
        else:
            print(newname, 'active')
        if not UserMap.objects.filter(oldname=oldname):
            m = UserMap()
            m.oldname = oldname
            m.newname = newname
            m.user = user
            m.save()
    f.close()

def cleanoligoname(name,offset=0):
    number = extract_number(name)
    if number:
        return 'RU-O-'+str(number+offset)
    else:
        return name

def cleanuser(olduser):
    olduser.strip()
    q = UserMap.objects.filter(oldname = olduser)
    if q:
        user = q[0].user
    else:
        user = User.objects.get(username='unknown')
    return user

def makedetail(name,info,reference,usage):
    v = name.split('\n')
    desc = ''
    if len(v)>1:
        desc = v[len(v)-1]
        if len(desc)>0:
            desc = desc.strip()+'\n'
    if len(info)>0:
        desc=desc+info+'\n'
    if len(reference)>0:
        desc=desc+reference+'\n'
    for use in usage.split('\n'):
        use.strip()
        if use=='':
            pass
        elif Usage.objects.filter(usage__iexact=use):
            pass
        else:
            desc=desc+use+'\n'
    desc = desc.strip()
    return desc

def cleandate(olddate):
    datestring = olddate.replace('.','/')
    v = datestring.split('/')
    try:
        month = int(v[0])
        day = int(v[1])
        year = int(v[2])
        cdate = datetime.datetime(year,month,day)
        return cdate
    except:
        return ''

def cleansequence(sequence):
    sequence = sequence.upper()
    newseq=''
    for c in sequence:
        if c in 'ACTG':
            newseq+=c
    return newseq

def cleanpos(pos):
    if 'antisense' in pos:
        return 'A'
    if 'sense' in pos:
        return 'S'
    return 'U'

def getusages(usage):
    v = usage.split('\n')
    ulist=[]
    otherfound = False
    for use in v:
        use.strip()
        if use=='':
            pass
        elif Usage.objects.filter(usage__iexact=use):
            u=Usage.objects.get(usage__iexact=use)
            ulist.append(u)
        else:
            if not otherfound:
                u=Usage.objects.get(usage='Other')
                ulist.append(u)
                otherfound=True
    return ulist;

def unicodeline(line):
    line2=u''
    for c in line:
        try:
            c=unicode(c,'utf-8')
        except:
            c='\n'
        line2+=c
    return line2

def parseoligo(line):
    v=line.split('","')
    dic={}
    dic['oligoid']=v[0].strip('"')
    dic['olduser']=v[1]
    dic['info']=v[2]
    dic['cdate']=v[3]
    dic['mdate']=v[4]
    dic['sequence']=v[5]
    dic['reference']=v[6]
    dic['gene_locus']=v[7]
    dic['organism']=v[8]
    dic['usage']=v[9]
    dic['primer_position']=v[10]
    dic['primer_partner']=v[11]
    dic['company']=v[12]
    dic['concentration']=v[13]
    dic['grade']=v[14].strip('"')
    for k,v in dic.iteritems():
        v=v.replace('\x0b','\n')
        v=v.strip()
        dic[k]=v
    return dic

def writeerrorstring(dic,message):
    f2 = open('c:/pydata/boxit/errorlog.txt','a')
    v=[]
    v.append(dic['oligoid'])
    v.append(dic['olduser'])
    v.append(dic['info'])
    v.append(dic['cdate'])
    v.append(dic['mdate'])
    v.append(dic['sequence'])
    v.append(dic['reference'])
    v.append(dic['gene_locus'])
    v.append(dic['organism'])
    v.append(dic['usage'])
    v.append(dic['primer_position'])
    v.append(dic['primer_partner'])
    v.append(dic['company'])
    v.append(dic['concentration'])
    v.append(dic['grade'])
    failline=''
    for item in v:
        failline+='"'
        failline+=item
        failline+='",'
    failline+='"'+message+'"\n'
    f2.write(failline)
    f2.close()
    return failline

def import_oligos(filename):
    f = open(filename,'r')
    for line in f:
        line=unicodeline(line)
        dic=parseoligo(line)
        if dic is not None:
            name = cleanoligoname(dic['oligoid'])
            if not name:
                name='unknown'
            user = cleanuser(dic['olduser'])
            details = makedetail(dic['oligoid'],
                                 dic['info'],
                                 dic['reference'],
                                 dic['usage'])
            cdate = cleandate(dic['cdate'])
            sequence = cleansequence(dic['sequence'])
            primer_position = cleanpos(dic['primer_position'])
            primer_partner = cleanoligoname(dic['primer_partner'])
            usages = getusages(dic['usage'])

            while Oligo.objects.filter(name = name):
                name=name+'-'+str(random.randint(100,999))
            oligo = Oligo(name=name)
            oligo.user = user
            oligo.details = details
            if cdate:
                oligo.create_date = cdate
                lastdate=cdate
            else:
                oligo.create_date = lastdate
            oligo.sequence = sequence
            oligo.save()
            if usages:
                for use in usages:
                    oligo.usages.add(use)
            if dic['gene_locus']:
                oligo.gene_locus = dic['gene_locus']
            if dic['organism']:
                oligo.organism = dic['organism']
            oligo.primer_position = primer_position
            oligo.primer_partner = primer_partner
            if dic['company']:
                oligo.company = dic['company']
            if dic['concentration'].isdigit():
                oligo.concentration = float(dic['concentration'])
            if dic['grade']:
                oligo.grade = dic['grade']
            oligo.save()
    f.close()
