/** @odoo-module **/

import { registry } from '@web/core/registry';
const{ Component, useState, onWillStart, useRef} = owl;
import { useService } from "@web/core/utils/hooks";

export class OwlAppList extends Component{

    setup(){
        this.state=useState({
            task:{name:"",color:"#991d38",completed:false},
            taskList:[],
            isEdit:false,
            activeId:false

        })
        this.orm = useService("orm")
        this.model = "app_owl.all_list"
        this.searchInput = useRef("search-input")

        onWillStart(async ()=>{
            await this.getAllTasks()
        })
    }
    async getAllTasks(){
        this.state.taskList = await this.orm.searchRead(this.model, [], ["name", "color", "completed"])
    }

    addTask(){
        this.resetForm()
        this.state.activeId = false
        this.state.isEdit = false
    }

    editTask(task){
        this.state.activeId = task.id
        this.state.isEdit = true
        this.state.task = {...task}
    }

    async saveTask(){

        if (!this.state.isEdit){
            await this.orm.create(this.model, [this.state.task])
            this.resetForm()
        } else {
            await this.orm.write(this.model, [this.state.activeId], this.state.task)
        }

        await this.getAllTasks()
    }

    resetForm(){
        this.state.task = {name:"", color:"#991d38", completed:false}
    }

    async deleteTask(task){
        await this.orm.unlink(this.model, [task.id])
        await this.getAllTasks()
    }

    async searchTasks(){
        const text = this.searchInput.el.value
        this.state.taskList = await this.orm.searchRead(this.model, [['name','ilike',text]], ["name", "color", "completed"])
    }

    async toggleTask(e, task){
        const isCompleted=e.target.checked;
        const color=isCompleted? "#288a47":"#991d38"
       
            await this.orm.write(this.model, [task.id], {completed:isCompleted,color});
        
        await this.getAllTasks()
    }

    async updateColor(e, task){
        await this.orm.write(this.model, [task.id], {color: e.target.value})
        await this.getAllTasks()
    }

}
    OwlAppList.template = 'app_owl.app_list'
    registry.category('actions').add('app_owl.action_app_owl_all_list_js', OwlAppList);

