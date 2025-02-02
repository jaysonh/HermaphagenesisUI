from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os

app = Flask(__name__,  static_url_path='/static')

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

api_access = { 
               "test"  : "sj324hjn3j24jj23",
	         "marcin" : "abcd1234" }

def checkApiAccess(api_key):
    element_found = False
    for value in api_access.values():
        if value == api_key:
            element_found = True
            break
    return element_found;

@app.route("/")
def hello():
    print("os.environ: ", os.environ)
    apiKey = request.args.get('key')

    if checkApiAccess( apiKey ) == True:
        return render_template("index.html")
    else:
        return "invalid api key"

if __name__ == "__main__":
    load_dotenv()
    app.run( debug=False, use_reloader=False)

