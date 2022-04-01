import pyrebase
Config = {
  "apiKey": "AIzaSyBAauDLnXPRk_IHFAK12t0KgICpNFChheI",
  "authDomain": "test-db2c5.firebaseapp.com",
  "projectId": "test-db2c5",
  "storageBucket": "test-db2c5.appspot.com",
  "messagingSenderId": "451706318245",
  "appId": "1:451706318245:web:bedd914c82cca84a6a8c4c",
  "measurementId": "G-V8C1BJT305",
  "databaseURL":""
}

firebase = pyrebase.initialize_app(Config)
storage = firebase.storage()
path_on_cloud = "images/foo.jpg"
path_local = "k.jpg"
#storage.child(path_on_cloud).put(path_local)

storage.child(path_on_cloud).download("test_download.jpg","ki.jpg")
