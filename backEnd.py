from flask import Flask , render_template
#from flask_sqlalchemy import SQLAlchemy


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///images.db'

'''
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def static_dir(path):
    return send_from_directory("static", path)
'''

@app.route('/')
def servP():
    return render_template("index.html")


    


if __name__ == "__main__":
    app.run()