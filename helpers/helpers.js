//her ligger vi al den js vi skal bruge som helpers, og kan derefter kalde dem i vores views og partials

module.exports = {
  eq: function (a, b) {
    return a === b;
  },

  uppercase: function (str) {
    return str.toUpperCase();
  },

  array: function () {
    return Array.from(arguments).slice(0, -1);
  },

  toArray: function (value) {
    if (Array.isArray(value)) return value;
    if (value == null) return [];
    return [value];
  },

  concat: function () {
    const args = Array.from(arguments).slice(0, -1);
    return args.join("");
  },

  formatDate: function (d) {
    return new Intl.DateTimeFormat("en-GB").format(new Date(d));
  },

  buttonVariant: function (variant) {
    switch (variant) {
      case "secondary":
        return "button--secondary";
      case "outline":
        return "button--outline";
      case "ghost":
        return "button--ghost";
      case "destructive":
        return "button--destructive";
      default:
        return "button--primary";
    }
  },
};
