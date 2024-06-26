from flask import Flask, render_template
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__,  static_url_path='/static')

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

@app.route("/")
def hello():
    
    return render_template("index.html")

if __name__ == "__main__":
    app.run()

