'use strict';

/**
 * Premises.js controller
 *
 * @description: A set of functions called "actions" for managing `Premises`.
 */

module.exports = {

  /**
   * Retrieve premises records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.premises.search(ctx.query);
    } else {
      return strapi.services.premises.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a premises record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.premises.fetch(ctx.params);
  },

  /**
   * Count premises records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.premises.count(ctx.query);
  },

  /**
   * Create a/an premises record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.premises.add(ctx.request.body);
  },

  /**
   * Update a/an premises record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.premises.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an premises record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.premises.remove(ctx.params);
  }
};
