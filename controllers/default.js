exports.install = function () {
  ROUTE("POST /test", handle_form_submit);
};

function handle_form_submit(req, res) {
  const self = this;
  const { body: data } = self;
  console.log(data);
  self.json(data);

  //self.proxy('https://www.totaljs.com');
}
