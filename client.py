import socketio

# standard Python
sio = socketio.Client()

@sio.event
def connect():
    print("I'm connected!")

@sio.event
def connect_error():
    print("The connection failed!")

@sio.event
def message(data):
    print('I received a message!')

@sio.on('handshake')
def on_message(data):
    print('HandShake', data)
    sio.emit('hey', {'symbol': 'USDJPY'})


sio.connect('ws://localhost:8001')
sio.emit('python', 'hello world')