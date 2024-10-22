'use strict';

/**
 * Customerreview.js controller
 *
 * @description: A set of functions called "actions" for managing `Customerreview`.
 */

module.exports = {

  /**
   * Retrieve customerreview records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.customerreview.search(ctx.query);
    } else {
      return strapi.services.customerreview.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a customerreview record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.customerreview.fetch(ctx.params);
  },

  /**
   * Count customerreview records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.customerreview.count(ctx.query);
  },

  /**
   * Create a/an customerreview record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.customerreview.add(ctx.request.body);
  },

  /**
   * Update a/an customerreview record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.customerreview.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an customerreview record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.customerreview.remove(ctx.params);
  }
};
