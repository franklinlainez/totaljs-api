exports.install = function () {
  ROUTE("POST /test", handle_form_submit);
};

function handle_form_submit(req, res) {
  const self = this;
  const { body: data } = self;
  console.log(data);

  RESTBuilder.make(function (builder) {
    // builder === instance of RESTBuilder
    builder.url("https://jsonplaceholder.typicode.com/posts");
    builder.post(self.body);
    builder.schema("User");
    builder.exec(function (err, response) {
      !err && response.$save();
    });
  });

  self.json(data);

  //self.proxy('https://www.totaljs.com');
}
