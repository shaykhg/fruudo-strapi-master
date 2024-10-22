'use strict';

/**
 * Cancellationpolicies.js controller
 *
 * @description: A set of functions called "actions" for managing `Cancellationpolicies`.
 */

module.exports = {

  /**
   * Retrieve cancellationpolicies records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.cancellationpolicies.search(ctx.query);
    } else {
      return strapi.services.cancellationpolicies.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a cancellationpolicies record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.cancellationpolicies.fetch(ctx.params);
  },

  /**
   * Count cancellationpolicies records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.cancellationpolicies.count(ctx.query);
  },

  /**
   * Create a/an cancellationpolicies record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.cancellationpolicies.add(ctx.request.body);
  },

  /**
   * Update a/an cancellationpolicies record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.cancellationpolicies.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an cancellationpolicies record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.cancellationpolicies.remove(ctx.params);
  }
};
