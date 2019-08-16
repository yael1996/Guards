module.exports = {
  action: function(phenoTypeA, phenoTypeB) {
    // use phenoTypeA and B to create phenotype result 1 and 2
    var result1 = phenoTypeA.slice(0, 2),
      result2 = phenoTypeB.slice(2, 5);

    return [result1, result2];
  }
};
