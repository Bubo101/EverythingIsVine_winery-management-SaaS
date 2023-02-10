import os
import json
import requests



GEO_API_KEY = os.environ["GEO_API_KEY"]

localCache = {}

def get_geo(address):

    if address in localCache:
        return localCache[address]

    params = {
        "access_key": GEO_API_KEY,
        "query": f"{address}",
    }
    url = "http://api.positionstack.com/v1/forward"
    response = requests.get(url, params=params)
    content = json.loads(response.content)

    if response.ok:
        localCache[address] = {
            "latitude": content["data"][0]["latitude"], 
            "longitude": content["data"][0]["longitude"],
        }
    try:
        return {
            "latitude": content["data"][0]["latitude"],
            "longitude": content["data"][0]["longitude"],
        }
    except (KeyError, IndexError):
        return {"geo_data": None}

"""

* Explanation for Airbnb Connect Apprenticeship Program - Code Snippet Submission *

This function serves as an anti-corruption layer / 3rd party API call.  

When the internal server is pinged from the front end microservice to get winery details, the internal API calls 
this function passing in the winery address in order to return positional coordinates (if they are available).

This data is then passed into the internal API response to the front end React component that renders the google map,
automatically centering and placing a pin on the map of each corresponding winery contact page.

I am proud of writing this function because it shows expertise with:
- Using 3rd party APIs and API Key environment variables
- Making JSON requests and subsequently decoding it to an object for parsing
- Utilizing memoization to improve load times and speed of the internal API using the variable "localCache"
    by storing coordinates for addresses searched before.  If it has been searched before it is stored and 
    retrieved immediately for the internal API response and a call to the 3rd party API is not needed.

"""