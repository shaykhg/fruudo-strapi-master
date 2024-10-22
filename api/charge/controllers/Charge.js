'use strict';

/**
 * Charge.js controller
 *
 * @description: A set of functions called "actions" for managing `Charge`.
 */

module.exports = {

  /**
   * Retrieve charge records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.charge.search(ctx.query);
    } else {
      return strapi.services.charge.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a charge record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.charge.fetch(ctx.params);
  },

  /**
   * Count charge records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.charge.count(ctx.query);
  },

  /**
   * Create a/an charge record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.charge.add(ctx.request.body);
  },

  /**
   * Update a/an charge record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.charge.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an charge record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.charge.remove(ctx.params);
  }
};
