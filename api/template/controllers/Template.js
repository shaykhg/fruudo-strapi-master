'use strict';

/**
 * Template.js controller
 *
 * @description: A set of functions called "actions" for managing `Template`.
 */

module.exports = {

  /**
   * Retrieve template records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.template.search(ctx.query);
    } else {
      return strapi.services.template.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a template record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.template.fetch(ctx.params);
  },

  /**
   * Count template records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.template.count(ctx.query);
  },

  /**
   * Create a/an template record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.template.add(ctx.request.body);
  },

  /**
   * Update a/an template record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.template.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an template record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.template.remove(ctx.params);
  }
};
