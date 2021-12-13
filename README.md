
# Overview

This repository implements **Multilevel Graph Partition** algorithm proposed in [Multilevel Graph Partitioning Schemes](https://www.researchgate.net/publication/221085380_Multilevel_Graph_Partitioning_Schemes)

*Reference:* G. Karypis and V. Kumar, “Multilevel Graph Partitioning Schemes,” in ICPP, 1995.


**Steps:** 
1. Coarsening
2. Partitioning
3. Uncoarsening

**Coarsening can be obtained by followings:**
- Matching
- Max-matching
    - Random matching
        - Heavy Edge Matching(HEM)
        - Light Edge Matching(LEM)
    - Heavy Clique Matching(HCM)?????

**Partitioning by followings:**
- Spectral Bisection(SB) [33, 2, 18]
- geometric bisection [28]
- combinatorial methods [25, 8, 9]
- Graph Growing Algorithm(GGP)
- Greedy Graph Growing Algorithm(GGGP)

**Uncoarsening by followings:**
- Kernighan-Lin(KL): Fiduccia-Mattheyses(FM)??????
- Greedy Refinement
- Boundary Refinement

**Spectral bisection**


**Graph growing heuristics**
1. randomly select a vertex v
2. grow a region around v in breath-first strategy until half of vertex-weight included


**k-way partition**
- via recursive bisection in order to achieve sets of subgraph with k vertices





