import { registry } from '@web/core/registry';
const{ Component, useState, onWillStart, useRef} = owl;
import { useService } from "@web/core/utils/hooks";


export class ContactList extends Component{

    setup(){
        this.state=useState({
            contact:{name:'',email:'',phone:''},
            contactList:[],
            isEdit:false,
            activeId:false
        });

        this.orm=useService("orm");
        this.model="app_owl.contact";

        onWillStart(async ()=>{
            await this.getAllContacts();
        })
    }

    async getAllContacts(){
        this.state.contactList=await this.orm.searchRead(this.model,[],["name","email","phone"]);
        console.log(this.state.contactList)
    }

    resetForm(){
        this.state.contact={name:'',email:'',phone:''};
    }

    async addContact(){
        this.resetForm();
        this.state.activeId=false;
        this.state.isEdit=false;
    }
    async editContact(contact){
        this.state.contact={...contact}
        this.state.isEdit=true;
        this.state.activeId=contact.id;
    }

    async saveChanges(){
        if(!this.state.isEdit){
            await this.orm.create(this.model,[this.state.contact]);
            this.resetForm();
        }else{
            await this.orm.write(this.model,[this.state.activeId],this.state.contact)
        }
        await this.getAllContacts();
    }

    async deleteContact(contact) {
        await this.orm.unlink(this.model, [contact.id]);
        await this.getAllContacts(); 
    }
}
ContactList.template='app_owl.contact';
registry.category('actions').add('app_owl.action_contact_list',ContactList)