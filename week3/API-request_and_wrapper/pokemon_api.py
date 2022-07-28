#### Pokemon API Wrapper
# Create a python wrapper for the Pokemon API. It should take in a pokemon name and display the pokemon with its height and weight

import requests
import json

r = requests.get('https://pokeapi.co/api/v2/pokemon/pikachu')
# r = requests.get('https://pokeapi.co/api/v2/pokemon')
dir(r)

## get JSON object of r -> returns python dict
pokemon_json = r.json()

## convert JSON object to string for easy viewing
pokemon_str = json.dumps(pokemon_json, indent=2)
print(pokemon_str)

# ------------------------------------------------

print(len(pokemon_json)) 
# 18

print(pokemon_json.keys())
# dict_keys(['abilities', 'base_experience', 'forms', 'game_indices', 'height', 'held_items', 'id', 'is_default', 'location_area_encounters', 'moves', 'name', 'order', 'past_types', 'species', 'sprites', 'stats', 'types', 'weight'])

for key,value in pokemon_json.items():
    print(key)
    print(value)
    print("\n\n")

for i in pokemon_json['sprites']:
    print(i)

print(pokemon_json['name'])
print(pokemon_json['height'])
print(pokemon_json['weight'])
print(pokemon_json['sprites']['front_default'])

# ------------------------------------------------

class Pokemon:
    def __init__(self) -> None:
        self.url = 'https://pokeapi.co/api/v2/pokemon'
    
    def _get(self, pokemon_name, **params):
        pokemon_url = f"{self.url}/{pokemon_name}"
        pokemon_request = requests.get(pokemon_url)
        if pokemon_request.ok:
            return pokemon_request.json()
        else:
            print("Error message")
        
    def display_pokemon(self, pokemon_name):
        pokemon_data = self._get(pokemon_name)
        pokemon_name = pokemon_data['name']
        pokemon_height = pokemon_data['height']
        pokemon_weight = pokemon_data['weight']
        pokemon_sprite = pokemon_data['sprites']['front_default']
        print(f"Name: {pokemon_name}\nHeight: {pokemon_height}\nWeight: {pokemon_weight}\nSprite: {pokemon_sprite}")

pokemon1 = Pokemon()
pokemon1.display_pokemon('squirtle')

pokemon2 = Pokemon()
pokemon2.display_pokemon('pikachu')