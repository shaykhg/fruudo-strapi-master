'use strict';

/**
 * Premisescharacteristics.js controller
 *
 * @description: A set of functions called "actions" for managing `Premisescharacteristics`.
 */

module.exports = {

  /**
   * Retrieve premisescharacteristics records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.premisescharacteristics.search(ctx.query);
    } else {
      return strapi.services.premisescharacteristics.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a premisescharacteristics record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.premisescharacteristics.fetch(ctx.params);
  },

  /**
   * Count premisescharacteristics records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.premisescharacteristics.count(ctx.query);
  },

  /**
   * Create a/an premisescharacteristics record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.premisescharacteristics.add(ctx.request.body);
  },

  /**
   * Update a/an premisescharacteristics record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.premisescharacteristics.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an premisescharacteristics record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.premisescharacteristics.remove(ctx.params);
  }
};
