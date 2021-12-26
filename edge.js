
class Edge {

  /**
   * @param { Number } sour_vertex_id
   * @param { Number } dest_vertex_id
   * @param { Object } edge_property
   * @param { Boolean } is_multi_edge
   */
  constructor(sour_vertex_id, dest_vertex_id, edge_property, is_multi_edge = false) {
    this.sour_vertex_id = sour_vertex_id;
    this.dest_vertex_id = dest_vertex_id;
    this.property = edge_property;
    
    //is_multi_edge flag indicates whether this edge is merged from multiple edges
    this.is_multi_edge = is_multi_edge;
  }
}

export { Edge } 