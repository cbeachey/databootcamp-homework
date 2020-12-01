import datetime as dt
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask,jsonify

engine = create_engine("sqlite:///Resources/hawaii.sqlite")

Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()


#inspector = inspect(engine)
#print(inspector.get_table_names())

Measurement = Base.classes.measurement
Station = Base.classes.station

app = Flask(__name__)


@app.route("/")
def home():
    return(f"Welcome to Surf's Up Hawaii Climate App! This is the Home Page<br/>"
    f"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ <br/>"
    f"Available routes: <br/>"
    f"/api/v1.0/precipitation  -> A precipitation analysis  <br/>"
    f"/api/v1.0/stations   -> A list of all of the stations <br/>"
    f"/api/v1.0/tobs   -> Temperature observations of the most active station for the last year of data <br/>"
    f"/api/v1.0/<start>   "
    f"/api/v1.0/<start>/<end>    "
)
   

@app.route("/api/v1.0/precipitation")
def names(): 
    session = Session(engine)
    results = session.query(Measurement.date).all()
    session.close()
    return jsonify(results)



#@app.route("/api/v1.0/stations")


#@app.route("/api/v1.0/tobs")



#@app.route("/api/v1.0/<start>")



#@app.route("/api/v1.0/<start>/<end>")



if __name__ == '__main__': 
    app.run(debug=True)