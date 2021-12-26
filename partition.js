
import { getRanNr } from './utilities.js';

class GraphPartition {

    execute_partition() {
        throw Error("This partition execute is not implemented!");
    }
}

class GgpGraphPartition extends GraphPartition {

  execute_partition(graph) {  
    //set up vertices group a, group b
    let v_group_a = [];
    let v_group_b = []; 
    //randomly select a v from top level
    let v_index = getRanNr(graph.vertices.length);
    let current_v = graph.vertices[v_index];
    v_group_a.push(graph.vertices[v_index]);
    
    let queue = [];
    //let queue_index=0;
    //let visited = [];
    //let visited_index=0;  
    for (let v of graph.vertices) {
      //console.log("<---->");
      //console.log(current_v);
      //console.log(v);
      //console.log(graph.check_vertices_conneted(v, current_v));
      if (v != current_v && graph.check_vertices_conneted(v, current_v)) {
          queue.push(v);
      }      
    }
    //console.log(queue);  
    //let queue_index = 0;
    //let position_index = 0;   
    //
    for (let v of queue) {
      if (v_group_a.length < graph.vertices.length/2) {
          v_group_a.push(v);   
      }     
    }   
    /*  
    //
    while(v_group_a.length<graph.vertices.length/2){    
        console.log("---LOOP-ITER:")
        console.log(v_group_a);
        console.log("---QUEUE-IS:");
        console.log(queue); 
        if(queue.length==0){
            break;
        }else if(queue_index>=queue.length){
            //do....
            while(!quque[position_index])
            queue = quque[position_index];  
        }else{
            visited.push(queue[queue_index]);
            size+=1;
        }   
        //
        for(let v of queue){
            if(size >= graph.vertices.length/2)
                break;
            else{
                visited.push(v);
                size+=1;
            }
        }  
        queue = []; 
        for(let i=0;i<visited.length;i++){
            let connect_to_visited = [];
            for(let v of graph.vertices){
                if(!v_group_a.includes(v) && graph.check_vertices_conneted(v, visited[i]))
                    connect_to_visited.push(v);
            }
            if(connect_to_visited.length>0){
                queue = connect_to_visited;
                break;
            }
            else
                visited.splice(i, 1);
        }   
        if(queue.length == 0)
            break;
    }
    */  
    v_group_b = graph.vertices.filter(v => !v_group_a.includes(v)); 
    return [v_group_a, v_group_b];
  }

}

export { GraphPartition, GgpGraphPartition }


