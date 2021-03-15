"""
WSGI config for receptor project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application
# import dotenv


# dotenv.load_dotenv(override=True)

# sys.path.append(os.getenv("RECEPTOR_DIR"))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'receptor.settings')

application = get_wsgi_application()
