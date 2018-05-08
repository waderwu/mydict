const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

const sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database("/home/waderwu/code/js/dict-chrome/oald.db",function(e){
 if (e ) throw e;
});


db.get("select translation from oald where word='apple'",function(err,row){

})

function createWindow () {
    // 创建一个窗口.
    win = new BrowserWindow({width: 800, height: 600})

    // 然后加载应用的 index.html。
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }


ipcMain.on('search', (event, arg) => {
    console.log(arg)
    db.get("select translation from oald where word=?",arg, function(e,row){
      if (!e && row !== undefined ) event.sender.send("translate",row.translation)
      else event.sender.send("translate","oops")
    })
})

app.on('ready', createWindow)
