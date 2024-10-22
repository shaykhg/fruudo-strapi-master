'use strict';

/**
 * Rule.js controller
 *
 * @description: A set of functions called "actions" for managing `Rule`.
 */

module.exports = {

  /**
   * Retrieve rule records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.rule.search(ctx.query);
    } else {
      return strapi.services.rule.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a rule record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.rule.fetch(ctx.params);
  },

  /**
   * Count rule records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.rule.count(ctx.query);
  },

  /**
   * Create a/an rule record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.rule.add(ctx.request.body);
  },

  /**
   * Update a/an rule record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.rule.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an rule record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.rule.remove(ctx.params);
  }
};
