from unicodedata import name
from flask import Flask , render_template
from flask import request
from flask import send_from_directory
import os

#from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(app.instance_path, 'images')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
#os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


'''
def allowed_file(filename):
    return '.' in filename and 
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def static_dir(path):
    return send_from_directory("static", path)
'''

# Route to upload image
@app.route('/upload-image', methods=['GET', 'POST'])
def upload_file():
    if 'photo' in request.files:
        file = request.files['photo']
        #file.save(file.filename)
        path = app.config['UPLOAD_FOLDER'] 
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        return file.filename
    return 'no file'


@app.route('/',  methods = ['GET', 'POST'])
def servP():
    return render_template("index.html")

@app.route('/<name>')
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name);

if __name__ == "__main__":
    app.run(host="0.0.0.0")
    