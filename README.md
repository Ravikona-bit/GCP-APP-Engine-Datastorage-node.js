# GCP-APPEngine-Datastorage-node.js
API in GCP using App Engine (standard) and Node with a connection to a (NoSQL) Cloud Datastore database

Prerequsites :- Google cloud account with Fair knowledge on same, GCP SDK and node.js


1. Run "npm install" to generate nodes_modules folder with required dependencies in your machine
2. Run "npx ava" to run test cases
3. Run "npm start" to test in your local machine. Make sure "GOOGLE_APPLICATION_CREDENTIALS" variable is configured in your machine after GCP SDK configured in your local machine. GOOGLE_APPLICATION_CREDENTIALS variable value is your .json file path which contains your GCP service account details
4. Run gcloud app deploy to deploy into cloud
5. Run gcloud app browse to verify the application
6. To verify from UI - /customers to retrieve list of customers and /customers/ to retrieve specific customer details. Soon will update code with add, edit/update and delete features.
7. To verify from Postman or soap ui for JSON resonse use api's /api/customers and /api/customers/
