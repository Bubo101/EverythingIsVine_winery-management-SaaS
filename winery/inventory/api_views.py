from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Winery, Wine

class WineryEncoder(ModelEncoder):
    model = Winery
    properties = [
        "id",
        "name",
        "url",
        "address",
        "description",
        "owner",
    ]

class WineListEncoder(ModelEncoder):
    model = Wine
    properties = [
        "id",
        "brand",
        "year",
        "varietal",
        "description",
        "region",
        "abv",
        "volume",
        "city_state",
        "price",
        "picture_url",
        "quantity",
        "winery",
        ]
    encoders = {
        "winery" : WineryEncoder(),
    }

@require_http_methods(["GET"])
def api_list_winery(request):
    if request.method == "GET":
        wineries = Winery.objects.all()

        return JsonResponse(
            {"wineries": wineries},
            encoder=WineryEncoder,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_winery(request, pk):
    if request.method == "GET":
        try:
            winery = Winery.objects.get(id=pk)
            return JsonResponse(
                winery,
                encoder=WineryEncoder,
                safe=False
            )
        except Winery.DoesNotExist:
            response = JsonResponse({"message": "Winery does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def api_list_wines(request, pk):
    if request.method == "GET":
        wines = Wine.objects.filter()

        return JsonResponse(
            {"wines": wines},
            encoder=WineListEncoder,
        )
    else:
        content = json.loads(request.body)  

        try:
            if "winery" in content:
                winery = Winery.objects.get(name=content["winery"])
                content["winery"] = winery
        except Winery.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid winery name"},
                status=400,
            )

        wine = Wine.objects.create(**content)
        return JsonResponse(
            wine,
            encoder=WineListEncoder,
            safe=False,
        )

# @require_http_methods(["GET"])
# def api_list_wines_by_winery(request, winery_id):
#     if request.method == "GET":
#         appointments = Wine.objects.filter(vin=vin)
#         print(appointments)
#         return JsonResponse(
#             {"appointments": appointments},
#             encoder=ServiceAppointmentListEncoder,
#         )