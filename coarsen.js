
import {getRanNr} from './utilities.js';
import {Vertex} from './vertex.js';
import {Edge} from './edge.js';
import {Graph} from './graph.js';

class CoarsenExecutor {

    execute_coarsen(graph){
        throw Error("This coarsen execute is not implemented!");
    }
}






class RandomMatchCoarsenExecutor extends CoarsenExecutor {

    execute_coarsen(graph){

        //copy the original vertices and add property with default value /'false/'
        let marked_vertices = [...graph.vertices];
        marked_vertices.forEach( vertex => vertex.matched = false);
        //store all multi-vertex
        let part_vertices = [];
        let multi_vertices_edges_list = graph.edges;

        for(let index = 0; index < marked_vertices.length; index++){
            
            if(!marked_vertices[index].matched){
                
                marked_vertices[index].matched=true;
                part_vertices.push(new Vertex(marked_vertices[index].id, marked_vertices[index].property, true));
                //collect all adjacent vertices and select one randomly;
                let unmatched_adjacent_vertices = [];
                for(let i=0; i<marked_vertices.length; i++){
                    if(marked_vertices[i].matched==false && graph.check_vertices_conneted(marked_vertices[i], marked_vertices[index])){
                        unmatched_adjacent_vertices.push(marked_vertices[i]);
                    }
                }
                
                if(unmatched_adjacent_vertices.length>0){
                    
                    //generate a random nr
                    let random_index = getRanNr(unmatched_adjacent_vertices.length);
                    //set randomly selected v as matched and put it into sub-vertices of multi-vertex
                    unmatched_adjacent_vertices[random_index].matched=true;

                    let master_v = part_vertices.find(v => v.id == marked_vertices[index].id);

                    
                    //
                    let edges_list = [];
                    //let edges_list_extern = [];
                    //this.find_edges_connect_vertices(marked_vertices[index], unmatched_adjacent_vertices[random_index]);
                    //master_v.edges = edges_list;

                    //let edges_list_intern = this.find_edges_connect_vertices(unmatched_adjacent_vertices[random_index],marked_vertices[index]);

                    
                    for(let e of graph.edges){
                        if(
                            (e.sour_vertex_id == unmatched_adjacent_vertices[random_index].id) ||
                            (e.dest_vertex_id == unmatched_adjacent_vertices[random_index].id)
                        ){
                            edges_list.push(e);
                        }
                    }
                    
                    

                    multi_vertices_edges_list = multi_vertices_edges_list.filter(
                        e => !edges_list.includes(e)
                    );

                    master_v.add_sub_vertex(
                        new Vertex(
                        unmatched_adjacent_vertices[random_index].id,
                        unmatched_adjacent_vertices[random_index].property,
                        false,
                        [],
                        edges_list
                        )
                    );
                }
            
            }  
        }


        for(let v of part_vertices){
            for(let v_2 of part_vertices){
                if( (v.id != v_2.id) 
                && (graph.match_sub_vertices(v, v_2))
                && !(multi_vertices_edges_list.find(
                    e => 
                    (e.sour_vertex_id == v.id && e.dest_vertex_id == v_2.id )
                    ||
                    (e.sour_vertex_id == v_2.id && e.dest_vertex_id == v.id)
                )
                )
                ){
                   multi_vertices_edges_list.push(new Edge(v.id, v_2.id, {}, true)); 
                }
            }
        }

        return new Graph(part_vertices, multi_vertices_edges_list);

    }
}



export { CoarsenExecutor, RandomMatchCoarsenExecutor}