exports.install = function () {
  ROUTE("/test", handle_form_submit, ["post", "json"]);
};

function handle_form_submit() {
  const self = this;
  const { body: data } = self;

  if (is_valid_data(data) === false) {
    self.json(get_error_response("Los datos proporcionados no son válidos"));
  }

  RESTBuilder.make(function (builder) {
    builder.url("https://jsonplaceholder.typicode.com/posts");
    builder.post(data);
    builder.exec(function (error, response) {
      const res = !error
        ? response
        : get_error_response(
            "Ocurrió un error al intentar conectarse al servidor"
          );

      self.json(res);
    });
  });
}

// Helper function, returns an object that contains an error and message fields
function get_error_response(message) {
  return {
    error: true,
    message: message,
  };
}

// Validate if only reciving the expected type of data
function is_valid_data(data) {
  if (!data) return false;

  return (
    Object.keys(data).sort().join() ===
    ["body", "userId", "title"].sort().join()
  );
}
