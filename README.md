# Service Charge Application - Team 7

![appLogo](/guide_images/appLogo.png) 

<br>
Collaborators:<br>
<br>Lj Vincent Tudtud - UCLM
<br>Jeorge Ryan Lou - UC Banilad
<br>Cathleen Rose Gadiane - UCLM

---
## Open your Eclipse for J2EE
1. Select file tab and choose Import
2. Select Maven and choose Existing Maven Projects
3. Browse to the directory of the ServiceChargeApp then select the `backend` folder

---
## Application Properties Setup

1. In the resources folder open application.properties

![applcationProperties](/guide_images/applcationProperties.png)

2. Check the appropriate port (MySQL Workbench)

![MySQLport](/guide_images/mysqlPort.png)

3. check if the `username` and `password` are correct, based on your MySQL

---
## Create Database Schema using model (MySQL Workbench)

1. Select file tab and choose Open Model then choose `database_model` file from the root folder
2. Select database tab and choose forward engineer
3. click next... and finish

---
## Adding SQL Connection (Eclipse)

1. Select Data Source Explorer. Right click and select New..
2. Select MySQL
3. Click the add driver icon

![newConnection](/guide_images/newSqlConnection.png)

4. In the Name/Type tab select MySQL JDBC Driver version 5.1
5. In JAR List tab select the driver file and click Edit JAR/Zip...
6. Open file `mysql-connector-j-8.0.32` in root folder of the app
7. In Properties tab, check every attribute if it syncs with your database that you just configure earlier then click ok

![connectionProfile](/guide_images/connectionProfile.png)

8. Click Test Connection if it is successfully connected to the database

![pingSuccess](/guide_images/pingSuccess.png)

---
## Build Project

1. Right click the project then select Run As then Maven install

![mavenInstall](/guide_images/mavenInstall.png)

2. If build is success, then right click the `ServiceChargeApplication.java` select Run As then Java Application

![runApp](/guide_images/runApp.png)

If everything is up and running go to your postman

---
## Configure Postman

1. Create a Post request and configure the URL to http://localhost:8080/api/v1/login
2. Configure Headers:
    - **Accept:** `application/json`
    - **Content-Type:** `application/x-www-form-urlencoded`

![setupHeaders](/guide_images/setupHeaders.png)

3. Send request and you should see the result as follows

![loginResult](/guide_images/loginResult.png)
