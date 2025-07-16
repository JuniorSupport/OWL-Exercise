from odoo import api, fields,models

class AllList(models.Model):
    _name='app_owl.all_list'
    _description='project using owl'

    name=fields.Char(string="Task Name")
    completed=fields.Boolean()
    color=fields.Char(default="#991d38")


