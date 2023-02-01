# Everything Is Vine

## Design

* [API DESIGN](docs/apis.md)
* [DATA MODEL](docs/data-model.md)
* [GRAPHICAL HUMAN INTERFACE](docs/ghi.md)
* [INTEGRATIONS](docs/integrations.md)

## Developer
* Boden B.

## Intended Market
Our application is intended to be used by winery owners looking for a simple and tailored way to create a winery home page, add wines, update inventory and winery details, and generate revenue from sales.  It also doubles as user interface for the customer, allowing a customer to add inventory to a cart and make a purchase. 

* Winery Customers
* New Winery Owners

## Minimum Viable Product (MVP)
Our MVP is an application that allows a winery owner to create their winery page, list their wines, and update their wine inventory with staff user permissions. Guests are able to add wines to their shopping cart and checkout. Once payment is made, it generates the order and updates the inventory quantity after a successful order is placed. 


## Functionality
* Sample winery can be created on the dashboard page so winery owners can test out the functionality of our application. 
* Request form to allow interested winery owner to contact Everything is Vine for more information on our product 
* Management & staff can edit winery details, and add/update inventory 
* Guests can sign up for an account with the winery to become members.
* Guests or members can look through the current winery inventory.
* Guests or members can add available wines to their shopping carts.
* Guests or members can edit wines in their shopping carts.
* Guests or members can make an order once a payment is made.
* Members get a discount at checkout for their order
* Management can add and update inventory.
* Contact page dynamically populated for each created winery 
* Functional shopping cart keeps shopping items in 'state' and allows for seamless order processing 

## Stretch Goals
* Actual Payment Processing system 
* Wine Rating System
* Inventory Features
    - Search
    - Filter by:
        - Oldest
        - Youngest
        - Price, lowest to highest
        - Price, highest to lowest
        - Varietal 
* Order Shipping 
* Wine Club Events
    - Tasting parties
    - Live music
* Sharing of wine/winery content to social networks 
* Customer Service
* Deployment for individual wineries on their own domain 
* CSS refinements 

## Project Initialization 
* Clone repository down to local machine 
* CD into new project directory
* Open Docker Desktop 
* Run `docker volume create` (plus each of the following one at a time)
    - postgres-data
    - winery
    - sales
    - ghi
* Run `docker compose build`
* Run `docker compose up`
* Run `docker exec -it everything-is-vine-winery-1 bash`
    * Run `python manage.py makemigrations`
    * Run `python manage.py migrate`
* Run `docker exec -it everything-is-vine-sales-1 bash`
    * Run `python manage.py makemigrations`
    * Run `python manage.py migrate`
* Load `localhost:3000/` and enjoy the app!
* If errors occur recommend deleting all docker containers/images/volumes and trying again. 

## Tips:
* When creating a winery, imputing working image URL and real address is important or form may not submit. 
* When creating a user try checking the box at the bottom of the form to explore staff permission functionality. 
* All fields are required for wine and winery creation.

Example Inputs:

* Winery creation:
    - Name = Hilltop Winery
    - Picture URL = https://images.unsplash.com/photo-1596142332133-327e2a0ff006?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80
    - Address (must be real) = 16163 WA-536, Mount Vernon, WA 98273
    - Owner Name = Dave Daverson
    - Description = Dave Daverson developed a passion for wine while watching the movie Sideways after which he left his job as a stock broker and bought a vineyard.  He deeply respects the customs and traditions of the previous owner of his vines, and tries to use new techniques and a cutting edge winery to make the most authentic wines possible.Peter fell in love with this vineyard shortly after watching Sideways.  When consulting oenologist Marcel Dutramplon first saw the property, he said “There is no reason we cannot make great wine on this old and proven terroir.

* Wine Creation (with logged in staff/employee permissions):
    - Brand/Name = Reserve
    - Year/Vintage = 2018
    - Varietal = Cabernet Sauvignon 
    - Region = Napa Valley
    - ABV = 14.6
    - Volume = 750
    - City/State of bottling = Lodi, CA
    - Price = 25
    - Quantity = 500
    - Picture URL = https://www.corleyfamilynapavalley.com/assets/images/products/pictures/2016JCCSpng.png
    - Description = This 2018 vintage represents another year of phenomenal quality wines from our vineyards. The near-perfect 2018 growing season started a little later than typical and saw ideal weather conditions through a mild and moderate summer. The steady and moderate growing season allowed the fruit to develop slowly and steadily, with lower sugar accumulation at ripeness and maintaining a nice acidity with great structure and balance. 
