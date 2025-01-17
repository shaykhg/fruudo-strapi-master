'use strict';

/**
 * Orderstatus.js controller
 *
 * @description: A set of functions called "actions" for managing `Orderstatus`.
 */

module.exports = {

  /**
   * Retrieve orderstatus records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.orderstatus.search(ctx.query);
    } else {
      return strapi.services.orderstatus.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a orderstatus record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.orderstatus.fetch(ctx.params);
  },

  /**
   * Count orderstatus records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.orderstatus.count(ctx.query);
  },

  /**
   * Create a/an orderstatus record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.orderstatus.add(ctx.request.body);
  },

  /**
   * Update a/an orderstatus record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.orderstatus.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an orderstatus record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.orderstatus.remove(ctx.params);
  }
};
