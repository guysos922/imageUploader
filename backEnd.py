from flask import Flask , render_template
from flask import request
import os
#from flask_sqlalchemy import SQLAlchemy


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app = Flask(__name__)


'''
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def static_dir(path):
    return send_from_directory("static", path)
'''

def upload_file():
   
   if request.method == 'POST':
        print ("enterd to the save picture func", request)
        fileName = os.getcwd() + "\pictures" + "1.jpg"
        print(request.data)
        f = open(fileName,'wb')
        f.write(request.data)
        f.close()
        return 'file uploaded successfully'


@app.route('/',  methods = ['GET', 'POST'])
def servP():
    print(upload_file())
    return render_template("index.html")


if __name__ == "__main__":
    app.run()
    