module.exports = {
  action: function(oldPhenotype) {
    // use oldPhenotype and some random
    // function to make a change to your
    // phenotype

    var resultPhenotype = oldPhenotype;
    [resultPhenotype[0], resultPhenotype[4]] = [
      resultPhenotype[4],
      resultPhenotype[0]
    ];

    return resultPhenotype;
  }
};
