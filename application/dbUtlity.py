from pymongo import MongoClient


URI = "mongodb+srv://nisanthv:eT5mPBCVc5jI3ctx@cluster0.tivpbg6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(URI)

try:
    client.admin.command("ping")          # ↩︎ confirms the link
    print("✅  Successfully connected to MongoDB Atlas")
except Exception as exc:
    print("❌  Connection failed:", exc)

db          = client["Youtube"]
youtube_id  = db["youtube_id"]
