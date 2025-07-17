from odoo import fields,models

class Contact(models.Model):
    
    _name='app_owl.contact'
    _description='contact crud using owl'

    name=fields.Char(string="Name", required=True)
    email=fields.Char(string="Email")
    phone=fields.Char(string ="Phone")