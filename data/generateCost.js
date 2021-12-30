const fs = require('fs');

const NO_NODES = 4039;
const K = 3;
const MIN_COST = 1;
const MAX_COST = 3;

const generateCost = (noOfNodes, k, shouldEqualCostEdge = true) => {
  const fileWriter = fs.createWriteStream('cost_matrix.txt');
  fileWriter.write('{');
  
  while(noOfNodes--){
    const edgeCosts = [];
    for(let i = 1; i <= k; i++){
      const randCost = MIN_COST + Math.random() * (MAX_COST - MIN_COST);
      edgeCosts.push(randCost.toFixed(5));
    }
    if(shouldEqualCostEdge){
      edgeCosts.fill(edgeCosts[0]);
    }

    fileWriter.write(`{${edgeCosts.join(',')}},`);
  }
  fileWriter.write('}');
}

generateCost(NO_NODES, K, false)