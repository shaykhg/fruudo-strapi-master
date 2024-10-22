'use strict';

/**
 * Foodtype.js controller
 *
 * @description: A set of functions called "actions" for managing `Foodtype`.
 */

module.exports = {

  /**
   * Retrieve foodtype records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.foodtype.search(ctx.query);
    } else {
      return strapi.services.foodtype.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a foodtype record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.foodtype.fetch(ctx.params);
  },

  /**
   * Count foodtype records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.foodtype.count(ctx.query);
  },

  /**
   * Create a/an foodtype record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.foodtype.add(ctx.request.body);
  },

  /**
   * Update a/an foodtype record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.foodtype.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an foodtype record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.foodtype.remove(ctx.params);
  }
};
