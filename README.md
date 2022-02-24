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

## Configuration for deployment on Linux Ubuntu

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
     pip install -r requirements.txt
     ```

4. Download Postgres database

     <details><summary><b>Linux Ubuntu</b></summary>

     ```
     sudo apt install libpq-dev python3.8-dev
     sudo apt install postgresql postgresql-contrib
     pip install psycopg2
     sudo -u postgres -i # creates postgres database for system user postgres
     ```

    </details>

5. Create the receptor database
     1. Open the psql shell and create a role for ubuntu
        ```
        psql postgres
        sudo -u postgres createuser ubuntu
        ```
     2. Create 'receptor' databse
        ```
        CREATE DATABASE receptor;
        exit;
        ```
     3. Update the receptor/.env file with database username and password
        ```
        DB_USER='ubuntu'
        DB_PASS='<your_pass>'
        ```

6. Make migrations, migrate and create a superuser
     ```
     python manage.py makemigrations
     pythin manage.py makemigrations oligos
     python manage.py migrate
     python manage.py createsuperuser
    ```

7. Download and install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

---

## Running Receptor for production

1. Build Receptor static files
     ```
     cd ./frontend
     npm run-script build
     ```
2. Collect static files
     ```
     cd .. # to go back to project root dir
     python manage.py collectstatic
     ```

---

## Contributions

.. are welcomed! 🤝
