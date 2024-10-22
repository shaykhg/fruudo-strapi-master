'use strict';

/**
 * Premisesreview.js controller
 *
 * @description: A set of functions called "actions" for managing `Premisesreview`.
 */

module.exports = {

  /**
   * Retrieve premisesreview records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.premisesreview.search(ctx.query);
    } else {
      return strapi.services.premisesreview.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a premisesreview record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.premisesreview.fetch(ctx.params);
  },

  /**
   * Count premisesreview records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.premisesreview.count(ctx.query);
  },

  /**
   * Create a/an premisesreview record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.premisesreview.add(ctx.request.body);
  },

  /**
   * Update a/an premisesreview record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.premisesreview.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an premisesreview record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.premisesreview.remove(ctx.params);
  }
};
