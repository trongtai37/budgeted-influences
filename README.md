This zip includes:

- Source code of our 2 streaming algorithms, greedy and SGr.
- Facebook dataset (in "data" folder) for testing the algorithms. Due to file size restriction in Github, please find the Sensor dataset in Intel Lab Data (http://db.csail.mit.edu/labdata/labdata.html).

Since estimating F in influence maximization is very time consuming, our code uses OpenMP for parallelization (https://en.wikipedia.org/wiki/OpenMP).

Before running experiments, you should generate cost_matrix in [Constants.cpp](Constants.cpp)
To generate:

```bash
	node data/generateCost.js -n <no_of_nodes> -k <value_of_k> [--equal]
```

To build our code, run:

```bash
	g++ -std=c++11 *.cpp -o ksub -DIL_STD -fopenmp -g
```

After building, to run our code, run:

```bash
	./ksub -f <data filename>
		-V <size of V>
		-t <type of experiment, 0: influence maximization, 1: sensor placement>
		-k <value of k>
		-B <value of B>
		-b <value of beta>
		-r <value of rho>
		-e <value of epsilon>
		-n <value of eta - denoise step for RStream>
		-g <value of gamma>
		-a <algorithm, 0: Greedy, 1: DStream, 2: RStream, 3: SGr, 4: SampleRstream. Please use SSA source code for testing IM algorithm>
		-p <number of threads (OpenMP) to running algorithms>
```
