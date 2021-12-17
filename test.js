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


//console.log("BEFORE HANDLING: ---------------------------");
//console.log(vertices);
//console.log(edges);

//console.log("AFTER HANDLING: ---------------------------");  
let vs = [...graph.vertices];
let g_a = [];
let g_b = [];//
        
let vertices_middle_index = Math.floor(vs.length/2);
//set first half of vertices with label 'A' 
for(let i=0; i<vertices_middle_index; i++){
    g_a.push(vs[i]);  
}
//set second half of vertice with label 'B'
for(let i=vertices_middle_index; i<vs.length; i++){
    g_b.push(vs[i]);   
}

//console.log(vertices[0]);

let exe_c = new RandomMatchCoarsenExecutor();
//console.log(exe_c);
let exe_p = new GgpGraphPartition();
let exe_u = new KlUncoarsenExecutor();
let exe_multi = new MultilevelGraphPartition(exe_c, exe_p, exe_u);
let result_multi = exe_multi.execute_partitioning(graph);




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


