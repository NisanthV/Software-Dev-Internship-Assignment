from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client.get_database("Youtube")
youtube_id = db.get_collection("youtube_id")