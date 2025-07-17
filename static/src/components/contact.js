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
        console.log(this.state.ContactList)
    }
}
ContactList.template='app_owl.contact';
registry.category('actions').add('app_owl.action_contact_list',ContactList)