
# Overview

This repository implements an extensible **Multilevel Graph Partition** 

**Three steps of Multilevel Graph Partition:** 
1. Coarsening
2. Partitioning
3. Uncoarsening

**Coarsening can be obtained by followings:**
- Matching
- Max-matching
    - Random matching 
        - Heavy Edge Matching(HEM)
        - Light Edge Matching(LEM)
    - Heavy Clique Matching(HCM)

**Partition step can be achieved by one of followings:**
- Spectral Bisection(SB) 
- geometric bisection 
- combinatorial methods
- Graph Growing Algorithm(GGP) 
    1. randomly select a vertex v
    2. grow a region around v in breath-first strategy until half of vertex-weight included
- Greedy Graph Growing Algorithm(GGGP)

**Uncoarsen step can be achieved by one of followings:**
- Kernighan-Lin(KL) 
- Greedy Refinement
- Boundary Refinement

```python
#import dependencies
import {KlUncoarsenExecutor} from './uncoarsen.js';
import {RandomMatchCoarsenExecutor} from './coarsen.js';
import {GgpGraphPartition} from './partition.js';
import {MultilevelGraphPartition} from './multilevel-graph-partition.js';

#in each step different algorithm can be attached
let exe_c = new RandomMatchCoarsenExecutor();
let exe_p = new GgpGraphPartition();
let exe_u = new KlUncoarsenExecutor();
let exe_multi = new MultilevelGraphPartition(exe_c, exe_p, exe_u);

#execute multilevel partition
let result_multi = exe_multi.execute_partitioning(graph);
```

--- -- - - --

**Implementation in this repo:** 
1. Coarsening: random matching
2. Partitioning: Graph growing algorithm
3. Uncoarsening: Kernighan-lin refinement

--- -- - - --

**Coarsen example, red line for edge merged from multiple edges**

<img src="./img/before-coarsen.png" height="300px">  <img src="./img/after-coarsen.png">

**Uncoarsen example, relocate red/blue node into the other group**

<img src="./img/before-uncor.png" height="200px" width="300px"> <img width="50px"> <img src="./img/after-uncor.png" height="200px" width="300px">



