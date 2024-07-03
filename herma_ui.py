from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__,  static_url_path='/static')

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

api_access = { "jayson" : "1234",
               "marcin"  : "abcd1234",
               "test"  : "sj324hjn3j24jj23" }

def checkApiAccess(api_key):
    element_found = False
    for value in api_access.values():
        print(f"checking value {value} against {api_key}")
        if value == api_key:
            print(f"found api_key {api_key}") 
            element_found = True
            break
    return element_found;

@app.route("/")
def hello():

    apiKey = request.args.get('key')

    if checkApiAccess( apiKey ) == True:
        return render_template("index.html")
    else:
        return "invalid api key"

if __name__ == "__main__":
    app.run()

