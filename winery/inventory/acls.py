import os
import json
import requests

GEO_API_KEY = os.environ["GEO_API_KEY"]

def get_geo(address):
    # headers = {"Authorization": }
    params = {
        "access_key": GEO_API_KEY,
        "query": f"{address}",
    }
    url = "http://api.positionstack.com/v1/forward"
    response = requests.get(url, params=params)
    content = json.loads(response.content)
    try:
        return {"latitude": content["data"][0]["latitude"], "longitude": content["data"][0]["longitude"]}
    except (KeyError, IndexError):
        return {"geo_data": None}