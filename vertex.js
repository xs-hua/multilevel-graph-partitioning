import { Graph } from './graph.js';

class Vertex {

  /**
   * 
   * @param { Number } vertex_id 
   * @param { Object } vertex_property 
   * @param { Boolean } is_multi_vertex
   * @param { Array } sub_vertices
   * @param { Array } edges
   */
  constructor(vertex_id, vertex_property = {}, is_multi_vertex = false, sub_vertices = [], edges = []) {
    this.property = vertex_property;
    this.id = vertex_id;  
    //set is_multi_vertex flag as false
    this.is_multi_vertex = is_multi_vertex;
    this.sub_vertices = sub_vertices;
    this.edges = edges;
  }  
  add_sub_vertex(v) {
    this.sub_vertices.push(v);
  }
}

export { Vertex }