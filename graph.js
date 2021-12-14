

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

}


export {Graph}