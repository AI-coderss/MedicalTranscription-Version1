from threading import Thread
from app import app as app_app
from doctor import app as doctor_app

def run_app_app():
    app_app.run(port=5000, debug=True, use_reloader=False)

def run_doctor_app():
    doctor_app.run(port=5001, debug=True, use_reloader=False)

if __name__ == "__main__":
    app_thread = Thread(target=run_app_app)
    doctor_thread = Thread(target=run_doctor_app)

    app_thread.start()
    doctor_thread.start()

    app_thread.join()
    doctor_thread.join()