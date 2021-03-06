import { Graph } from "./graph.js";

class MultilevelGraphPartition {

    //implements with Adapter Pattern
    constructor(coarsen_executor, partition_executor, uncoarsen_executor){
        this.coarsen_executor = coarsen_executor;
        this.partition_executor = partition_executor;
        this.uncoarsen_executor = uncoarsen_executor;
        //console.log(this.coarsen_executor);
    }

    execute_partitioning(graph){

        let multi_g = this.coarsen_executor.execute_coarsen(graph);
        let [g_a, g_b] = this.partition_executor.execute_partition(multi_g);
        let vertices = this.uncoarsen_executor.execute_uncoarsen(multi_g, g_a, g_b);

        //separate vertices according to label
        let v_a = [];
        let v_b = [];
        for(let v of vertices){
            if(v.label == 'A'){
                v_a.push(v);
                delete v.label;
            }
            else{
                v_b.push(v);
                delete v.label;
            }        
        }

        //allocate edges to two parts according to its sour vertex id
        let e_a = multi_g.find_sour_v_edges(v_a);
        let e_b = multi_g.find_sour_v_edges(v_b);

        //find edges which connect two graphs
        let connect_edges = Graph.find_connect_edges(v_a, v_b, multi_g.edges);

        let e_a_filter = e_a.filter( e => !connect_edges.includes(e) );
        let e_b_filter = e_b.filter( e => !connect_edges.includes(e) );

        return [new Graph(v_a, e_a_filter), new Graph(v_b, e_b_filter), connect_edges];
    }

    exe_coarsen(graph){
        return this.coarsen_executor(graph);
    }
    
    //return 2 array
    exe_partition(graph){
        return this.partition_executor(graph);
    }

    //[graph, graph_1, graph_2]
    exe_uncoarsen(graph, two_graphs){
        return this.uncoarsen_executor(graph, two_graphs[0], two_graphs[1]);
    }

}

export {MultilevelGraphPartition}


