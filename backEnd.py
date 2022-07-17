from unicodedata import name
from flask import Flask , render_template
from flask import request
import os

#from flask_sqlalchemy import SQLAlchemy

UPLOAD_FOLDER = '\images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
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
        file.save(file.filename)
        print('saved')
        return 'saved'
    return 'no file'



@app.route('/',  methods = ['GET', 'POST'])
def servP():
    return render_template("index.html")


if __name__ == "__main__":
    app.run()
    