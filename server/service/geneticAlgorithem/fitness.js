module.exports = {
  action: function(phenotype) {
    // use phenotype and possibly some other information
    // to determine the fitness number.  Higher is better, lower is worse.

    var fitness = 0;
    for (var i = 0; i < 5; i++) {
      for (var j = i; j < 5; j++) {
        if (phenotype[j] > phenotype[i]) fitness++;
      }
    }
    return fitness;
  }
};
