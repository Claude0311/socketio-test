import socketio
# standard Python
sio = socketio.Client()
count = 0
def setCount():
    global count
    count = count +1

@sio.event
def connect():
    print("I'm connected!")

@sio.event
def connect_error(errmsg):
    print("The connection failed!")

@sio.event
def message(data):
    print('I received a message!')

@sio.on('count')
def on_message():
    print('\ncount', count+1)
    setCount()


sio.connect('ws://localhost:3000')
user = 'Jeff'
while True:
    inp=input('o/b/e for OnlyMe, Broadcast, ExcepMe ')
    if inp=='o':
        sio.emit('only me',user)
    elif inp=='b':
        sio.emit('broadcast to everyone',user)
    elif inp=='e':
        sio.emit('broadcast except me',user)
