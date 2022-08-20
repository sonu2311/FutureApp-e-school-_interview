from flask_lib import FlaskLib
import flask_lib
import time
import os
import urllib.request
import math
import csv
import io
import json
import random

backend = FlaskLib()

@backend.api('/hi')
def hi(d):
	return "Hello", db.readQuery("select * from person")

backend.run(port=5503)

# session["login_key"]["name"] = frontend_dict["name"]