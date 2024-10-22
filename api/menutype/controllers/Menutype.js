'use strict';

/**
 * Menutype.js controller
 *
 * @description: A set of functions called "actions" for managing `Menutype`.
 */

module.exports = {

  /**
   * Retrieve menutype records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.menutype.search(ctx.query);
    } else {
      return strapi.services.menutype.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a menutype record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.menutype.fetch(ctx.params);
  },

  /**
   * Count menutype records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.menutype.count(ctx.query);
  },

  /**
   * Create a/an menutype record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.menutype.add(ctx.request.body);
  },

  /**
   * Update a/an menutype record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.menutype.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an menutype record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.menutype.remove(ctx.params);
  }
};
