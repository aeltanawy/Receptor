Receptor application
====================
This is version 2.0 of Receptor application.

Receptor is a web-based application that is built using django framework for managing laboratory data. This updated version of Receptor helps storing and retrieving your oligos information organizing the data in a database that is easily searchable.


Initial Configuration
---------------------
This initial configuration is done by the application administrator, or your local IT officer, so that your organisation is able to access Receptor via a localhost server.

1. If you don't have it already, install [Python 3.8.0](https://www.python.org/downloads/).

2. Create virtual environment
   - The easiest is with using [conda](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/20/conda/) but feel free to use virtualenv.


3. Activate virtual environment

4. Clone Receptor application
    - Clone the receptor application
      ```
      git clone https://github.com/aeltanawy/Receptor.git
      ```
    - Install [pip](https://pip.pypa.io/en/stable/installing/) inside the virtual environment
    - Install Receptor `requirements.txt` file
      ```
      pip install -r requirements.txt
      ```

Configure Receptor
------------------
1. `cd` into your cloned local `Receptor` repository

2. Change `receptor.config` file by changing the values of the following variables:
    - **DB_USER**: your username to access the postgresql database
    - **DB_PASS**: your password to access the postgresql database
    - **ENVVARS_PATH**: the path to httpd `envvars` file
    - **HTTPD_PATH**: the path to httpd installation where `httpd.conf` can be located
    - **ADMIN_EMAIL**: the administrator email where users can inquire to in case of server errors
    - **RECEPTOR_DIR**: the path to the cloned local `Receptor` repository
    - **PYTHON_PATH**: the path to your virtual environment `site-packages` directory


3. Load the configuration `receptor.config` file to initialize the parameters
    ```
    source receptor.config
    ```

4. In `templates/home.html`, change **your lab** with your actual lab name to appear on Receptor homepage.


5. Run database migrations
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```

6. Create superuser(s)
    ```
    python manage.py createsuperuser
    ```
    Follow the instructions in your terminal


Configure Receptor with Apache2 and mod-wsgi
--------------------------------------------
**Install apache2**

  - **Mac** using homebrew
      ```
      brew install httpd
      ```

    Mac comes with its native version of apache2. For the Receptor application, when installing apache2 with homebrew, you will have to create `envvars` file in `/usr/local/Cellar/httpd/2.*/bin`, replacing * with the apache2 version number.

  - **Linux**

    The [APACHE HTTP SERVER PROJECT](http://httpd.apache.org/docs/current/platform/rpm.html) explains the steps for Redhat / CentOS / Fedora.

  - **Windows**

    The [APACHE HTTP SERVER PROJECT](http://httpd.apache.org/docs/current/platform/windows.html) explains the steps for Microsoft Windows.


Running Receptor with Apache2 and mod_wsgi
------------------------------------------
  Run Receptor: `sudo apachectl start`

  Stop Receptor: `sudo apachectl stop`

  Restart Receptor: `sudo apachectl restart`


User access
-----------
  Enter `localhost` in a browser.


Receptor logs location
-------------------
  Logs are located in `site/logs`


User to change password
-----------------------
To allow a user to change their password without admin intervention, you need to integrate Receptor with an email service. To setup SMTP Email backend with Receptor, go to `settings.py` and uncomment **SMTP Email setup for production** settings after filling in the correct values.
