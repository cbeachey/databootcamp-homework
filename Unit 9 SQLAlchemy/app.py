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
session = Session(engine)

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
def precipitation(): 
    yr = dt.date(2017,8,23) - dt.timedelta(days=365)
    prcp = prcp_data = session.query(Measurement.date, Measurement.prcp).\
                    filter(Measurement.date >= yr).\
                    order_by(Measurement.date).all()

    #create dictionary
    prcp_list = dict(prcp)  
    return jsonify(prcp_list)



@app.route("/api/v1.0/stations")
def stations():
    active = session.query(Measurement.station, func.count(Measurement.station)).group_by(Measurement.station)\
                                                                .order_by(func.count(Measurement.station).desc()).all()

    active_list = dict(active)
    return jsonify(active_list)






#@app.route("/api/v1.0/tobs")



#@app.route("/api/v1.0/<start>")



#@app.route("/api/v1.0/<start>/<end>")



if __name__ == '__main__': 
    app.run(debug=True)