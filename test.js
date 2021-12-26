import {Vertex} from './vertex.js';
import {Edge} from './edge.js';
import {Graph} from './graph.js';
import {data} from './test-data/test-01.js';
import {KlUncoarsenExecutor} from './uncoarsen.js';
import {RandomMatchCoarsenExecutor} from './coarsen.js';
import {GgpGraphPartition} from './partition.js';
import {MultilevelGraphPartition} from './multilevel-graph-partition.js';

let vertices = [];
let edges = [];
for(let v of data.vertices){
    vertices.push(new Vertex(v.id, v.property));
}
for(let e of data.edges){
    edges.push(new Edge(e.sour, e.dest, e.property));
}
let graph = new Graph(vertices, edges);


console.log("BEFORE HANDLING: ---------------------------");
console.log(vertices);
console.log(edges);

console.log("AFTER HANDLING: ---------------------------");  
let vs = [...graph.vertices];
let exe_c = new RandomMatchCoarsenExecutor();
let exe_p = new GgpGraphPartition();
let exe_u = new KlUncoarsenExecutor();
let exe_multi = new MultilevelGraphPartition(exe_c, exe_p, exe_u);
let result_multi = exe_multi.execute_partitioning(graph);
console.log(result_multi);


/*

//let exe = new KlUncoarsenExecutor();
let exe_c = new RandomMatchCoarsenExecutor();
let result_c = exe_c.execute_coarsen(graph);
//let result = exe.execute_uncoarsen(graph, g_a, g_b);
//console.log(result);
let exe_p = new GgpGraphPartition();
let result_p = exe_p.execute_partition(result_c);
console.log(result_p);
console.log("000000000000000000000");
let exe_u = new KlUncoarsenExecutor();
let result_u = exe_u.execute_uncoarsen(result_c, result_p[0],  result_p[1]);
console.log(result_u);


*/


