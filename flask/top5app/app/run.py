from flask import Flask, render_template, url_for

app = Flask(__name__, template_folder = "templates")

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    return render_template('index.html')

@app.route('/music')
def music():
    return render_template('music.html')

shows = [
        {'title':'Stranger Things',
            'release_year': 2016,
            'no_seasons': 4,
            'genre': 'Mystery',
            'rotten_tomatoes': '91%',
            'imdb_rating': 8.7,
            'network':'Netflix'},
        {'title':'West World',
            'release_year': 2016,
            'no_seasons': 3,
            'genre': 'Sci-fi',
            'rotten_tomatoes': '81%',
            'imdb_rating': 8.6,
            'network':'HBO'},
        {'title':'The Mandalorian',
            'release_year': 2019,
            'no_seasons': 2,
            'genre': 'Space Western',
            'rotten_tomatoes': '93%',
            'imdb_rating': 8.7,
            'network':'Disney'},
        {'title':'Locke & Key',
            'release_year': 2020,
            'no_seasons': 3,
            'genre': 'Drama',
            'rotten_tomatoes': '74%',
            'imdb_rating': 7.4,
            'network':'Netflix'},
        {'title':'Only Murders in the Building',
            'release_year': 2021,
            'no_seasons': 2,
            'genre': 'Mystery',
            'rotten_tomatoes': '100%',
            'imdb_rating': 8.1,
            'network':'Hulu'}
]

@app.route('/tvshows')
def tvshows():
    return render_template('tvshows.html',shows=shows)

if __name__ == '__main__':
    app.run(debug = True)