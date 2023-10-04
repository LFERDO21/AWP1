//Nombre del cache
const cacheName = 'proyecto';

//Archivos y recursos para almacenar en cache
const cacheAssets =[
    'index.html',
    'pagina1.html',
    'main.js'
    //agregar mas recursos que se necesiten como imagenes, css,etc.
];

//Instalar Service Worker
self.addEventListener('install',(event)=>{
    console.log('serviceWorker: INSTALADO');

    //Precarga de los recursos para guardar en cache

    event.waitUntil(
        caches.open(cacheName)
        .then((cache) =>{
            console.log('serviceWorker: Cacheado en archivos');
            return cache.addAll(cacheAssets);
        })
        .then(()=> self.skipWaiting())
    );
});


//Activar el service Worker
self.addEventListener('activate',(event)=>{
    console.log('Service Worker: ACTIVADO');

    //Eliminar Caches antiguas
    event.waitUntil(
        caches.keys().then(cacheName =>{
            return Promise.all(cacheName.map(cache =>{
                if (cache !== cacheName){console.log('service Worker: Limpiando el cache antiguo');
            return caches.delete(cache);
        }
        })
        );
        })
    );
});


//Manejamos peticiones
self.addEventListener('fetch', (event)=>{
    console.log('ServiceWork: Fetching');
    event.respondWith(fetch(event.request).catch(() =>
    caches.match(event.request))
    );
});
