const fs = require('fs');
const processArgs = require('minimist')(process.argv.slice(2));

const NO_NODES = processArgs.n || 4039;
const K = processArgs.k || 3;
const MIN_COST = 1;
const MAX_COST = 3;
const SEPARATOR = '/*_*/';
const CONSTANT_FILE_PATH = 'Constants.cpp';

const shouldEqualCostEdge = processArgs.equal;

const generateCost = (noOfNodes, k, shouldEqualCostEdge = true) => {
  const originConstants = fs.readFileSync(CONSTANT_FILE_PATH).toString('utf-8');
  const fileWriter = fs.createWriteStream(CONSTANT_FILE_PATH);

  let rawCostMatrix = '{';

  while (noOfNodes--) {
    const edgeCosts = [];
    for (let i = 1; i <= k; i++) {
      const randCost = MIN_COST + Math.random() * (MAX_COST - MIN_COST);
      edgeCosts.push(randCost.toFixed(5));
    }
    if (shouldEqualCostEdge) {
      edgeCosts.fill(edgeCosts[0]);
    }

    rawCostMatrix = rawCostMatrix.concat(`{${edgeCosts.join(',')}},`);
  }
  rawCostMatrix = rawCostMatrix.concat('};');

  fileWriter.write(
    originConstants
      .split(SEPARATOR)
      .shift()
      .concat(SEPARATOR)
      .concat(rawCostMatrix)
  );
};

generateCost(NO_NODES, K, shouldEqualCostEdge);
