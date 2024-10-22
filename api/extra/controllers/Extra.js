'use strict';

/**
 * Extra.js controller
 *
 * @description: A set of functions called "actions" for managing `Extra`.
 */

module.exports = {

  /**
   * Retrieve extra records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.extra.search(ctx.query);
    } else {
      return strapi.services.extra.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a extra record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.extra.fetch(ctx.params);
  },

  /**
   * Count extra records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.extra.count(ctx.query);
  },

  /**
   * Create a/an extra record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.extra.add(ctx.request.body);
  },

  /**
   * Update a/an extra record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.extra.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an extra record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.extra.remove(ctx.params);
  }
};
