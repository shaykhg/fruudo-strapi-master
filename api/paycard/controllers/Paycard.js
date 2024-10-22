'use strict';

/**
 * Paycard.js controller
 *
 * @description: A set of functions called "actions" for managing `Paycard`.
 */

module.exports = {

  /**
   * Retrieve paycard records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.paycard.search(ctx.query);
    } else {
      return strapi.services.paycard.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a paycard record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.paycard.fetch(ctx.params);
  },

  /**
   * Count paycard records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.paycard.count(ctx.query);
  },

  /**
   * Create a/an paycard record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.paycard.add(ctx.request.body);
  },

  /**
   * Update a/an paycard record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.paycard.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an paycard record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.paycard.remove(ctx.params);
  }
};
