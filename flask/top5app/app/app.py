from flask import Flask, render_template, url_for

app = Flask(__name__, template_folder = "templates")

import routes