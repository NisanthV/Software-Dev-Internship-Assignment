from pymongo import MongoClient


URI = "url"

client = MongoClient(URI)

try:
    client.admin.command("ping")          # ↩︎ confirms the link
    print("✅  Successfully connected to MongoDB Atlas")
except Exception as exc:
    print("❌  Connection failed:", exc)

db          = client["Youtube"]
youtube_id  = db["youtube_id"]
