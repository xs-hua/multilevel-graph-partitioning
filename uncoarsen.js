
class UncoarsenExecutor {

    execute_uncoarsen(graph){
        throw Error("This uncoarsen executor is not implemented!");
    }
}


class KlUncoarsenExecutor extends UncoarsenExecutor {

    //execute uncoarsen with Kernighan-lin algorithm
    execute_uncoarsen(graph, group_a, group_b){
        
        //label v in v_group_a with label A
        group_a.forEach(v => 
            v.label = "A"
        );

        //label v in v_group_a with label B
        group_b.forEach(v => 
            v.label = "B"
        );

        //combine group_a and group_b
        let vertices = group_a.concat(group_b);


        //
        console.log("BEFORE-KL");
        console.log(vertices);
        //

        let edge_cut_total_max_last;

        while(true){
            let v_group_a = [];
            let v_group_b = [];

            //distribute vertices according to its label
            vertices.forEach( v => {
                if(v.label == 'A')
                    v_group_a.push(v);
                else
                    v_group_b.push(v);
            })
            
            let vertex_edge_cut = {};
            
            //caculate edge cut of all vertices
            v_group_a.forEach(v => vertex_edge_cut[v.id] = graph.get_vertex_d_value(v));
            v_group_b.forEach(v => vertex_edge_cut[v.id] = graph.get_vertex_d_value(v));

            //debugging logs
            //console.log(vertex_edge_cut);
            //

            let vertices_edge_cuts = [];

            for(let v of v_group_a){

                let edge_cut_max = -Infinity;
                
                let v_pair = this.find_max_edge_cut_combi(graph, v_group_a, v_group_b, vertex_edge_cut, edge_cut_max);
                let vertex_a = v_pair[0][0];
                let vertex_b = v_pair[0][1];
                edge_cut_max = v_pair[1];
                this.remove_v_from_array(v_group_a, vertex_a);
                this.remove_v_from_array(v_group_b, vertex_b);

                vertices_edge_cuts.push([[vertex_a, vertex_b], edge_cut_max]);
                
                //debugging logs
                /*
                for(let ele of vertices_edge_cuts){
                    console.log(vertices_edge_cuts.length+" - "+ele[0][0].id+" - "+ele[0][1].id+" - "+ele[1]);
                }
                */
                //
                
                this.update_edge_cut_value(graph, v_group_a, vertex_edge_cut, vertex_a, vertex_b);
                this.update_edge_cut_value(graph, v_group_b, vertex_edge_cut, vertex_b, vertex_a);
                
            }

            let edge_cut_total_max = -Infinity;
            let max_index = 0;
            for(let i=1; i<=vertices_edge_cuts.length; i++){
                let max = 0;
                for(let ii=0; ii<i; ii++)
                    max+=vertices_edge_cuts[ii][1];
                if(max>edge_cut_total_max){
                    edge_cut_total_max=max;
                    max_index=i;
                }
            }

            if(edge_cut_total_max>0){
            //if((!edge_cut_total_max_last && edge_cut_total_max>0) || (edge_cut_total_max>0 && edge_cut_total_max>edge_cut_total_max_last)){
                for(let i=0; i<max_index; i++){
                    for(let ii=0; ii<vertices.length; ii++){
                        if(vertices[ii].id == vertices_edge_cuts[i][0][0].id){
                            console.log("shift "+vertices[ii].id+" to B");
                            vertices[ii].label = "B";
                        }
                        else if(vertices[ii].id == vertices_edge_cuts[i][0][1].id){
                            console.log("shift "+vertices[ii].id+" to A");
                            vertices[ii].label = "A";
                        }
                    }
                }
                edge_cut_total_max_last = edge_cut_total_max;
            }else{
                //console.log("IN ELSE - "+edge_cut_total_max);
                break;
            }
        }//end while loop

        return vertices;

    }

    //find the v_a v_b combi which has together biggest edge-cut-value
    find_max_edge_cut_combi(graph, group_a, group_b, vertex_edge_cut, max){

        let vertices_pair=[];

        //console.log(group_b);

        for(let v_a of group_a){
            for(let v_b of group_b){
                let dupli_edges = graph.count_vertices_connected(v_a, v_b);
                let vertices_edge_cut = vertex_edge_cut[v_a.id] + vertex_edge_cut[v_b.id] - 2*dupli_edges;
                
                //debugging logs
                //console.log("COMPARE: "+v_a.id+" - "+v_b.id+" - "+vertices_edge_cut);
                //

                if(vertices_edge_cut > max){
                    //console.log("OVERWRITE A: "+v_a.id+", B: "+v_b.id);
                    max = vertices_edge_cut;
                    vertices_pair[0]=v_a;
                    vertices_pair[1]=v_b;
                }
            }
        }
        return [vertices_pair, max];
    }

    remove_v_from_array(array, ele){
        let v_index = array.indexOf(ele)
        if(v_index > -1)
            array.splice(v_index,1);
    }

    update_edge_cut_value(graph, group, vertex_edge_cut, v_a, v_b){
        for(let v of group){
            let edge_cut_with_a = graph.count_vertices_connected(v, v_a);
            let edge_cut_with_b = graph.count_vertices_connected(v, v_b);
            vertex_edge_cut[v.id] += 2*edge_cut_with_a;
            vertex_edge_cut[v.id] -= 2*edge_cut_with_b;
        }
    }






}



export { UncoarsenExecutor, KlUncoarsenExecutor }