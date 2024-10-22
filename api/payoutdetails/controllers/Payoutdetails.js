'use strict';

/**
 * Payoutdetails.js controller
 *
 * @description: A set of functions called "actions" for managing `Payoutdetails`.
 */

module.exports = {

  /**
   * Retrieve payoutdetails records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.payoutdetails.search(ctx.query);
    } else {
      return strapi.services.payoutdetails.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a payoutdetails record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.payoutdetails.fetch(ctx.params);
  },

  /**
   * Count payoutdetails records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.payoutdetails.count(ctx.query);
  },

  /**
   * Create a/an payoutdetails record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.payoutdetails.add(ctx.request.body);
  },

  /**
   * Update a/an payoutdetails record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.payoutdetails.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an payoutdetails record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.payoutdetails.remove(ctx.params);
  }
};
