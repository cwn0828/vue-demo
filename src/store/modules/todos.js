const state = {
    todos: []
};
const getters = {
    getAllTodos: state => state.todos
};
const mutations = {
    setTodos: (state, todos) => state.todos = todos,
    // unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id != id),
    updatedTodo: (state, updateTodo) => {
        const index = state.todos.findIndex(todo => todo.id == updateTodo.id);
        console.log(index);
        if (index != -1) {
            state.todos.splice(index, 1, updateTodo);
        }
    }
};
const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        commit("setTodos", response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post("https://jsonplaceholder.typicode.com/todos", {
            title,
            completed: false
        });
        commit("newTodo", response.data);
    },
    // 删除
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit("removeTodo", id);
    },
    async filterTodos({ commit }, count) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${count}`);
        commit("setTodos", response.data);
    },
    // 更新
    async updateTodo({ commit }, todo) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
        commit("updatedTodo", response.data);
    },
};

export default {
    state, getters, mutations, actions
}