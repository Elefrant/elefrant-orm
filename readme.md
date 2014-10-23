# Elefrant ORM

[![wercker status](https://app.wercker.com/status/abf296cb1fad2ac7c4f47e7eb56784c4/s/master "wercker status")](https://app.wercker.com/project/bykey/abf296cb1fad2ac7c4f47e7eb56784c4)

## Install

```sh
$ npm install --save elefrant-orm
```


## Usage

Elefrant orm connect [Waterline ORM](https://github.com/balderdashy/waterline) with Elefrant Framework

```js
var orm = require('elefrant-orm');

var options = {
adapters: {/* .. Adapter .. */},
connections: {/* .. Connections .. */},
collections: {/* .. Collections .. */},
};

orm(options, function (err, models) {
    if (err) {
        console.log(err);
    } else {
        // Get models
        // models.connections & models.collections
        console.log(models);
    }
});
```

## License

MIT © [Elefrant](http://elefrant.com/#/license)
