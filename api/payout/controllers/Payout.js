'use strict';

/**
 * Payout.js controller
 *
 * @description: A set of functions called "actions" for managing `Payout`.
 */

module.exports = {

  /**
   * Retrieve payout records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.payout.search(ctx.query);
    } else {
      return strapi.services.payout.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a payout record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.payout.fetch(ctx.params);
  },

  /**
   * Count payout records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.payout.count(ctx.query);
  },

  /**
   * Create a/an payout record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.payout.add(ctx.request.body);
  },

  /**
   * Update a/an payout record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.payout.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an payout record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.payout.remove(ctx.params);
  }
};
