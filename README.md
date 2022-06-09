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

1. Create a `.env` file located in `Receptor/receptor` along with `settings.py` with the following variables defined:
     ```
     DB_USER=<your_username>
     DB_PASS=<your_password>
     DJANGO_DEBUG='True'
     DB_NAME='receptor'
     HOSTS='<host_name or public_ip>,<another_host_name>'
     ```

2. Create and activate a virtual environment

3. Install the project packages
     ```
     pip install -r requirements.txt
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

5. Create the receptor database
    1. Open the psql shell
        ```
        psql postgres
        ```
    2. Create 'receptor' database
        ```
        CREATE DATABASE receptor;
        exit;
        ```

6. Make migrations, migrate and create a superuser
     ```
     python manage.py makemigrations oligos
     python manage.py migrate
     python manage.py createsuperuser
    ```

7. Download and install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

---

## Running Receptor

1. Run Receptor backend
     ```
     python manage.py runserver
     ```

2. Run Receptor frontend (this way you can see code changes live)
     ```
     cd ./frontend
     npm install #to install the project dependencies
     npm start
     ```

---


## Contributions

.. are welcomed! 🤝
