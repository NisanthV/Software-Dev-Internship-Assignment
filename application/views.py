from .dbUtlity import youtube_id
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from dotenv import load_dotenv
from bson import ObjectId
import os
import requests

load_dotenv()
api_key = os.getenv("API")

class YoutubeApi(APIView):
    def get(self, request):


        ids = list(youtube_id.find())
        print(ids, len(ids))
        if len(ids) == 0: return Response(status=200, data={"message":"There is no id in DB", "items":[]})

        ids = [doc['id'] for doc in ids]

        url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id={",".join(ids)}&key={api_key}"

        response = requests.get(url=url)
        print(response.status_code)
        return Response(status=200, data= dict(response.json()))

    def post(self, request):

        size = len(list(youtube_id.find()))

        if size > 10 : return Response(status=403, data={"message":"Size is already reached"})

        data = request.data.get('yt_id', None)

        if not data:
            return Response(status=400, data={"message":"id can't be full"})

        youtube_id.insert_one({"id":data})

        return Response(status=201, data={"message":"Record saved"})

    def delete(self, request, obj_id):

        if not obj_id:
            return Response({"message":"id is empty"})

        data = youtube_id.find_one({"_id": ObjectId(obj_id)})

        if not data: return Response({"message":"id not in DB"})

        youtube_id.delete_one({"_id": ObjectId(obj_id)})

        return Response({"message":"success"}, status=200)


@api_view(['GET'])
def manage(request):

    ids = list(youtube_id.find())

    if len(ids) == 0:
        return Response(status=200, data={"message": []})

    ids = [[str(doc['_id']),doc['id']] for doc in ids]

    return Response(data={"message":ids}, status=200)