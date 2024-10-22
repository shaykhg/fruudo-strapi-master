'use strict';

/**
 * Cuisine.js controller
 *
 * @description: A set of functions called "actions" for managing `Cuisine`.
 */

module.exports = {

  /**
   * Retrieve cuisine records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.cuisine.search(ctx.query);
    } else {
      return strapi.services.cuisine.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a cuisine record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.cuisine.fetch(ctx.params);
  },

  /**
   * Count cuisine records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.cuisine.count(ctx.query);
  },

  /**
   * Create a/an cuisine record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.cuisine.add(ctx.request.body);
  },

  /**
   * Update a/an cuisine record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.cuisine.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an cuisine record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.cuisine.remove(ctx.params);
  }
};
