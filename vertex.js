
class Vertex {

    /**
     * 
     * @param {Number} vertex_id 
     * @param {Map} vertex_property 
     */
    constructor(vertex_id, vertex_property={}){
        this.property = vertex_property;
        this.id = vertex_id;

        //set is_multi_vertex flag as false
        this.is_multi_vertex = false;
    }
}

class MultiVertex extends Vertex {

    constructor(vertex_id, vertex_property={}, sub_vertices=[]){
        super(vertex_id, vertex_property);
        this.sub_vertices = sub_vertices;

        //set is_multi_vertex flag as true
        this.is_multi_vertex = true;
    }

    //add vertex into sub-vertices list
    add_sub_vertex(vertex){
        this.sub_vertices.push(vertex);
    }

    //find vertex in sub-vertices list by its id
    get_sub_vertex_by_id(id){
        return this.sub_vertices.find( vertex => vertex.id == id);
    }


}





export {Vertex, MultiVertex}