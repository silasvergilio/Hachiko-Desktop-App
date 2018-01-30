//import { ipcRenderer } from 'electron';

const electron =  require('electron');
const url = require('url');
const path = require('path');



const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV

//process.env.NODE_ENV = 'production';

let mainWindow;


//Listen for the app to be ready
app.on('ready',function(){
//Creates a new window

       mainWindow = new BrowserWindow({
        title: 'Hachiko',
        width: 1300,
        height: 600,
       // frame: false
       });
       mainWindow.setResizable(false);
      // mainWindow.setFullScreen(true);
       //Load HTML into Window
       mainWindow.loadURL(url.format({
           pathname: path.join(__dirname,'mainWindow.html'),
           protocol: 'file:',
           slashes: true
       }));

       //Quit app when close

       mainWindow.on('closed',function(){
           app.quit();
           mainWindow = null;
       });

       mainWindow.once('ready-to-show', () => {
        mainWindow.show();
      });

       //Build Menu from template
       const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
       Menu.setApplicationMenu(mainMenu);
      
       });

       // Handle add item window
    function createAdicionarEstrategiaWindow(){
    addWindow = new BrowserWindow({
      width: 400,
      height:300,
      title:'Adicionar Estrategia'
    });

    addWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'AdicionarEstrategiaWindow.html'),
      protocol: 'file:',
      slashes:true
    }));

    // Handle garbage collection
    addWindow.on('close', function(){
      addWindow = null;
    });
}
       
       //Recebe a informação para abrir a janela de Adicionar Estratégia
       ipcMain.on('AbrirAddEstrategia',function(){
        createAdicionarEstrategiaWindow();  
       });

       //Recebe a informação para fechar a janela
       ipcMain.on('FecharJanela',function(){
        app.quit();  
       });
      
       // Catch item:add
       ipcMain.on('item:add', function(e, item){
       mainWindow.webContents.send('item:add', item);
       addWindow.close(); 
    // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
       addWindow = null;
  });




// Create menu template

const mainMenuTemplate = [

{
    label: 'File',
    submenu: [
        {
            label: 'Add Item',
            click()
            {
               // createAddWindow();
            }
        },
        {
            label: 'Clear Items',
            click()
            {
                mainWindow.webContents.send('item;clear');
            }
        },
        {
            label: 'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q': 'Ctrl+Q',
            click(){
                app.quit();
            }
        }
    ]
}
];

//if mac, add empty object to the window
 if(process.platform == 'darwin')
 {
     mainMenuTemplate.unshift({});
 }

//Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production')
{
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I': 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}
    