
class Graph {

    /**
     * 
     * @param {Array} vertices 
     * @param {Array} edges 
     */
     constructor(vertices, edges){
        this.vertices = vertices;
        this.edges = edges;
    }

    static get_vertex_by_id(vertices, id){
        let v = vertices.find( vertex => vertex.id == id);
        if(!v)
            throw Error("vertex with id %d not found.", id);
        else
            return v;
    }

    static find_connect_edges(v_a, v_b, edges) {

      let connect_edges = [];
      let v_a_id = v_a.map(v => v.id);
      let v_b_id = v_b.map(v => v.id);

      for (let e of edges) {
        if (v_a_id.includes(e.sour_vertex_id) && v_b_id.includes(e.dest_vertex_id)){
          connect_edges.push(e);
        }else if (v_a_id.includes(e.dest_vertex_id) && v_b_id.includes(e.sour_vertex_id)){
          connect_edges.push(e);
        }
      }
      return connect_edges;
    }

    /**
     * 
     * @param {*} new_vertex 
     */
     add_vertex(new_vertex){
        this.vertices.push(new_vertex);
    }

    /**
     * 
     * @param {Vertex} new_vertex 
     */
     update_vertex(new_vertex){
        this.vertices.map(
            vertex => vertex.compare_vertex_property(new_vertex) ? vertex:new_vertex
        );
    }

    //get specific vertex by vertex-id
    get_vertex_by_id(id){
        return this.vertices.find( vertex => vertex.id == id);
    }

    //count sum of edges that connects two vertices
    count_vertices_connected(vertex_x, vertex_y){
        let nr = 0;
        for(let edge of this.edges){
            if(
                (vertex_x.id==edge.sour_vertex_id && vertex_y.id==edge.dest_vertex_id) || 
                (vertex_y.id==edge.sour_vertex_id && vertex_x.id==edge.dest_vertex_id) 
            )
                nr+=1;
        }
        return nr;
    }


    //caculate edge cut value of vertex
    get_vertex_d_value(vertex){
        
        let d_value = 0;

        for(let edge of this.edges){
            let other_vertex;
            if(edge.sour_vertex_id == vertex.id)
                other_vertex = this.get_vertex_by_id(edge.dest_vertex_id);
            else if(edge.dest_vertex_id == vertex.id)
                other_vertex = this.get_vertex_by_id(edge.sour_vertex_id);

            if(!other_vertex)
                continue;
            else{
                if(vertex.label != other_vertex.label)
                    d_value += 1;
                else
                    d_value -= 1;
            }
        }
        return d_value;
    }

    /**
     * 
     * @param {*} vertex_x 
     * @param {*} vertex_y 
     * @returns 
     */
     check_vertices_conneted(vertex_x, vertex_y){
        let is_connected = false;
        
        for(let i=0; i<this.edges.length; i++){
            if(
                (vertex_x.id==this.edges[i].sour_vertex_id && vertex_y.id==this.edges[i].dest_vertex_id) || 
                (vertex_y.id==this.edges[i].sour_vertex_id && vertex_x.id==this.edges[i].dest_vertex_id)
            ){
                is_connected=true;
            }
        }
        return is_connected;
    }



    match_sub_vertices(vertex_a, vertex_b){
        if(this.check_vertices_conneted(vertex_a, vertex_b)){
            return true;
        }else{
            for(let s_v of vertex_a.sub_vertices){
                if(this.check_vertices_conneted(s_v, vertex_b)){
                    return true;
                }else{
                    for(let v of vertex_b.sub_vertices){
                        if(this.check_vertices_conneted(s_v, v))
                            return true;
                    }
                    return false;
                }
            }
    }
    }

    find_sour_v_edges(vertices){

        let e_list = [];
        let vid_list = vertices.map(v => v.id);
        
        for(let e of this.edges){
            if(vid_list.includes(e.sour_vertex_id))
                e_list.push(e);
        }

        return e_list;
    }



}


export {Graph}