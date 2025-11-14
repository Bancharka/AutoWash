//her ligger vi al den js vi skal bruge som helpers, og kan derefter kalde dem i vores views og partials

module.exports = {
    uppercase: function (str) {
        return str.toUpperCase();
    }
};