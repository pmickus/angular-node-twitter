var Hapi = require('hapi'),
  mongoskin = require('mongoskin'),
  Good = require('good')

var server = new Hapi.Server( { debug: { 'request': ['error', 'uncaught'] } }); 
server.connection({ port: 3000 });

var db = mongoskin.db('mongodb://@localhost:27017/test', {safe:true})

var loadCollection = function(name, callback) {
  callback(db.collection(name))
}

function parseJSON(obj) {
  if (typeof(obj) == 'object')
    return obj;
  else if (typeof(obj) == 'string')
    return JSON.parse(obj);
}

server.route([
    {
    method: 'GET',
    path: '/api/{collectionName}',
    handler: function(req, reply) {
      loadCollection(req.params.collectionName, function(collection) {
        collection.find({}, {
          sort: [['_id', -1]]}).toArray(function(e, results) {
            if (e) return reply(e)
            reply(results)
          }
        )
      })
    }
  },
  {
    method: 'GET',
    path: '/api/{collectionName}/{id}',
    handler: function(req, reply) {
      loadCollection(req.params.collectionName, function(collection) {
        collection.findById(req.params.id, function(e, result) {
            if (e) return reply(e)
            reply(result)
        })
      })
    }
  },
  {
    method: 'PUT',
    path: '/api/{collectionName}/{id}',
    handler: function(req, reply) {
      loadCollection(req.params.collectionName, function(collection) {
        req.payload._id = mongoskin.helper.toObjectID(req.payload._id);
        collection.updateById(req.params.id, { $set: parseJSON(req.payload) }, { safe: true, multi: false }, function(e, result) {
          if (e) return reply(e)
          reply(result)
        })
      })
    }
  },  
  {
    method: 'POST',
    path: '/api/{collectionName}',
    handler: function(req, reply) {
      loadCollection(req.params.collectionName, function(collection) {
        collection.insert(parseJSON(req.payload), {}, function(e, results) {
          if (e) return reply(e)
          reply("Success")
        })
      })
    }
  },
  {
    method: 'DELETE',
    path: '/api/{collectionName}/{id}',
    handler: function(req, reply) {
      loadCollection(req.params.collectionName, function(collection) {
        collection.remove({ _id: mongoskin.helper.toObjectID(req.params.id) }, function(e, result) {
          if (e) return reply(e)
          reply(result)
        })
      })
    }  
  }, 
  {
    method: 'GET',
    path: '/public/{path*}',
    handler: {
        directory: {
            path: './public',
            listing: false,
            index: false
        }
    }
  },
  {
    method: 'GET',
    path: '/partials/{path*}',
    handler: {
        directory: {
            path: './partials',
            listing: false,
            index: false
        }
    }
  },
  {
     method: 'GET',
     path: '/{path*}',
     handler: function(req, reply) {
       reply.file("./public/index.html")
     }
  } 
])

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', response: '*' }]
        }]
    }
    }, function (err) {
        if (err) {
            throw err; // something bad happened loading the plugin
        }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
}); 
