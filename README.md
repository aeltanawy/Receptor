# Receptor application

This is version 3.0 of Receptor application.

Receptor is a web-based application to inventory and track lab groups’ oligos (RNA/DNA material) that is built using Django framework. This updated version of Receptor helps storing and retrieving your oligos information organizing the data in a database that is easily searchable.

The app helps researchers be more productive and share material in ways that avoid unnecessary delays and expenses ultimately to better empower them to discover and share more about the diseases they study.

Receptor is hosted on AWS at *(In progress)*

### Receptor versions:
  - v1.0: Django, Python 2
  - v2.0: Django, Python 3
  - v3.0: Django, DRF, React, Python 3

---

## Configuration for development

1. Create a `.env` file located in `Receptor/recptor` along with `setting.py` with the following variables defined:
     ```
     DB_USER=<your_username>
     DB_PASS=<your_password>
     DJANGO_SECRET_KEY=<db_key>
     DJANGO_DEBUG='True'
     DB_NAME='receptor'
     ```

2. Create and activate a virtual environment

3. Install the project packages
     ```
     pip install -r requirements
     ```

4. Download Postgres database

    <details><summary><b>Mac using Homebrew</b></summary>

    1. Download [Homebrew](https://brew.sh/)
    2. Install postgres
         ```
         brew install postgresql
         ```
    3. Start postgres
         ```
         brew services start postgresql
         ```

    </details>

5. Create the receptor database and a superuser
     ```
     python manage.py makemigrations
     python manage.py migrate
     python manage.py createsuperuser
    ```

6. Download and install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

---

## Running Receptor

1. Run Receptor backend
     ```
     python manage.py runserver
     ```

2. Run Receptor frontend (this way you can see code changes live)
     ```
     cd ./frontend
     npm start
     ```

---


## Contributions

.. are welcomed! 🤝