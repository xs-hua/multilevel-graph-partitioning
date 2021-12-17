

class Edge {

    /**
     * @param {Vertex} sour_vertex
     * @param {Vertex} dest_vertex
     * @param {Object} edge_property
     */
     constructor(sour_vertex_id, dest_vertex_id, edge_property, is_multi_edge=false){
        this.sour_vertex_id = sour_vertex_id;
        this.dest_vertex_id = dest_vertex_id;
        this.property = edge_property;
        this.is_multi_edge = is_multi_edge;
    }

}

export {Edge} 