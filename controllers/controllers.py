# -*- coding: utf-8 -*-
# from odoo import http


# class AppOwl(http.Controller):
#     @http.route('/app_owl/app_owl', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/app_owl/app_owl/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('app_owl.listing', {
#             'root': '/app_owl/app_owl',
#             'objects': http.request.env['app_owl.app_owl'].search([]),
#         })

#     @http.route('/app_owl/app_owl/objects/<model("app_owl.app_owl"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('app_owl.object', {
#             'object': obj
#         })

